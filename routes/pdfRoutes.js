const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const Mailer = require('../services/Mailer');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const axios = require('axios');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'eu-west-3'
});


const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

const User = mongoose.model('user');
const Token = mongoose.model('token');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

module.exports = app => {
  app.post('/api/pdf', async (req, res, next) => {
      //res.send('PDF');
      let { emailRequestAccess, emailRequest, businessName, businessName2, name, name2, lastName, lastName2, nif, nif2, type, phone, phone2, population, population2, populationId } = req.body;
      if (type) {
        type = 'Persona jurídica';
      } else {
        type = 'Persona física';
      }

      const email = emailRequest ? emailRequest : emailRequestAccess;
      const business = businessName ? businessName : businessName2;
      name = name ? name : name2;
      lastName = lastName ? lastName : lastName2;
      nif = nif ? nif : nif2;
      phone = phone ? phone : phone2;
      population = population ? population : population2;

      var documentDefinition = {
        content: [
           { text: 'FICHA DE CLIENTE', style: 'header' },
           '',
           '',
           { text: ['Empresa: ', { text: `${business}.`, style: 'anotherStyle'}] },
           { text: ['Administrador: ', { text: `${name} ${lastName}.`, style: 'anotherStyle'}] },
           { text: ['Email: ', { text: `${emailRequestAccess}.`, style: 'anotherStyle'}] },
           { text: ['Población: ', { text: `${population}.`, style: 'anotherStyle'}] },
           { text: ['NIF/CIF: ', { text: `${nif}.`, style: 'anotherStyle'}] },
           { text: ['Teléfono: ', { text: `${phone}.`, style: 'anotherStyle'}] },
           { text: ['Tipo de personalidad: ', { text: `${type}.`, style: 'anotherStyle'}] }
         ],
         styles: {
           header: {
             fontSize: 22,
             bold: true,
             alignment: 'center'
           },
           anotherStyle: {
             italics: true,
             alignment: 'left',
             fontSize: 17
           }
         },
          pageMargins: [8.5, 8.5, 8.5, 8.5]
      };

      try {
        const pdfDoc = pdfMake.createPdf(documentDefinition);
        pdfDoc.getBase64(async (data) => {
          // res.writeHead(200,
          // {
          //     'Content-Type': 'application/pdf',
          //     'Content-Disposition':'attachment;filename="filename.pdf"'
          // });

          const existUser =  await User.findOne({ email : email.toLowerCase() });
          if (existUser) {
            const token = new Token({ _userId: existUser._id, token: crypto.randomBytes(16).toString('hex') });

            token.save((err) => {
              const host = req.get('host');
              const linkFirmaDigital = "http://" + host + "/solicitud/firmar/" + existUser._id + '/' + token.token;

              const download = Buffer.from(data.toString('utf-8'), 'base64');

              const extension = '.pdf';
              const key = `pdfs/${uuid()}` + extension;

              s3.getSignedUrl(
                'putObject',
                {
                  Bucket: keys.bucket,
                  ContentType: 'application/pdf',
                  Key: key
                },
                async (err, url) => {
                  const putPdf = await axios.put(url, download, {
                    headers: {
                      'Content-Type': 'application/pdf '
                    }
                  })

                  if (putPdf.statusText === 'OK') {
                    const urlPath = url.split('.com/')[1].split('?Content-Type')[0];

                    const updateUser = User.updateOne({
                      email: email
                    }, {
                      pdf: urlPath
                    }).then((request, resp) => {
                      const mailOptions={
                         from: 'informacion@iasegestion.com',
                         to: email,
                         subject: 'Solicitud Acceso (Firma digital)',
                         text: 'Necesitmaos verificar que eres Administrador de ' + business + ' Firma digitalmente el PDF que está adjunto a este email y envíanoslo adjuntandolo en este link.',
                         html: '<div><p>Necesitmaos verificar si eres Administrador de ' + business + '.</p><p>Firme digitalmente el PDF adjunto.</p><p>Abra el siguiente link: <a href="' + linkFirmaDigital + '">Adjuntar Firma Digital</a></p><p>Adjunte el PDF Firmado Digitalmente.</p></div>',
                         fileName: urlSlug(business + ' ' + email),
                         attachment: download
                      };

                      const mail = Mailer.newMail(mailOptions, req);
                      res.send('OK');
                    });
                  } else {
                    res.send('ERROR')
                  }
                }
              );
          });
        };
      });
    } catch (e) {
      res.send(e);
    }
  })
}
