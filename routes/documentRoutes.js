const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');

const Document = mongoose.model('document');
const User = mongoose.model('user');

module.exports = app => {

  app.get('/api/docs', async (req, res) => {
    let query = req.query;
    const page = parseInt(req.query.page);

    if (query.name) {
      query.name = { $regex: '.*' + req.query.name + '.*' };
    }
    if (query.number) {
      query.number = { $regex: '.*' + req.query.number + '.*' };
    }
    if (query.type) {
      if (query.type !== 'Financiero') {
        query.type = { $regex: '.*' + req.query.type + '.*' };
      } else {
        query.type = { $ne: 'Impuesto' };
      }
    }

    if (query.client) {
      query.client._id = { $regex: '.*' + req.query.client + '.*' };
    }

    delete query.page;
    delete query.filter;

    await Document.paginate(query, { page: page, limit: 30, sort: {date: -1}, populate: 'client'},(err, result) => {
      res.send(result);
    });
  });

  app.get('/api/docs/:slugDocument', async (req, res) => {
    const doc = await Document.find({ slug: req.params.slugDocument }).populate('client');

    res.send(doc);
  });

  app.post('/api/docs/:slugDocument', requireLogin, async (req, res) => {
    const { name, number, pdf, type, client, namePDF } = req.body;

    const document = await Document.find({ slug: req.params.slugDocument });
    let update = {};
    update.name = name ? name : '';
    if (pdf) {
        update.pdf = pdf ? pdf : '';
        update.namePDF = namePDF ? namePDF : '';
    }
    update.type = type ? type : '';
    if (client) {
      update.client = client;
    }
    update.number = number ? number : '';
    update.slug = name ? urlSlug(name, '_') : '';

    Document.updateOne(
      {
        slug: req.params.slugDocument
      },
        update
    ).exec((err, result) => {
      if (err && err.name === 'ValidationError') {
        res.send('ERROR NAME');
      } else if (err) {
        res.send('ERROR');
      } else {
        res.send('OK');
      }
    });
  });

  app.post('/api/docs', requireLogin, async (req, res) => {
    const { name, number, pdf, type, client, namePDF } = req.body;

    let newDocument = new Document();
    newDocument.name = name;
    newDocument.type = type;
    newDocument.pdf = pdf;
    newDocument.namePDF = namePDF;
    newDocument.number = number;
    newDocument.slug = urlSlug(name, '_');
    newDocument.client = client;
    newDocument.save(async (err) => {
      if (err && err.name === 'ValidationError') {
        res.send('ERROR NAME');
      } else if (err) {
        res.send('ERROR');
      } else {
        const user = await User.find({ _id: client });
        let gender = ' un nuevo ';
        if (user) {
          if (type === 'Cuenta de explotación') {
            gender = ' una nueva '
          }
          try {
            mailOptions={
              from: 'informacion@iasegestion.com',
              to: user[0].email,
              subject: type + ' disponible',
              text: 'Tiene' + gender + type + ' a tu disposición.',
              html: '<div><p>Tiene' + gender + type + ' a su disposición.</p> <p>Abrir documento: <a href="' + keys.urlBucket + pdf + '">' + name + '</a></p><div>Recuerda que puedes encontrar todos tus documentos en <a href="www.iasegestion.com">www.iasegestion.com</a></div></div>',
            };

            Mailer.newMail(mailOptions, req);
            res.send('OK');
          } catch (e) {
            res.send('OK NO CORREO');
          }
        }
      }
    });
  });

  app.delete('/api/docs/:idDoc', requireLogin, async (req, res) => {
    Document.deleteOne(
      {
        _id: req.params.idDoc
      },
    ).exec((err, result) => {
      if (!err) {
        res.send('OK');
      } else {
        res.send('ERROR');
      }
    });
  });

  app.post('/api/sendLoopMail', requireLogin, async (req, res) => {
    const mail = `<div>
       <p>Estimado cliente:</p>
       <p>Desde IASE Gestión trabajamos con la mayor diligencia posible y siempre con la satisfacción
       de atender a nuestros clientes en el tiempo y forma previstos.</p>

       <p>Por todo ello y para cumplir correctamente con los plazos legalmente establecidos;
       es necesario que nos hagas llegar toda la documentación en la mayor brevedad posible, al
       menos 5 días antes del correspondiente plazo. Para ello te recordamos los plazos de
       presentación de los diferentes modelos de impuestos más comunes:</p>

       <h3>- Modelos RENTA (115,111,130,131) </h3>
       <p>Trimestre 1: 20/01</p>
       <p>Trimestre 2: 20/04</p>
       <p>Trimestre 3: 20/07</p>
       <p>Trimestre 4: 20/10</p>

       <h3>- Modelos IVA (303)</h3>
       <p>Trimestre 1: 30/01</p>
       <p>Trimestre 2: 20/04</p>
       <p>Trimestre 3: 20/07</p>
       <p>Trimestre 4: 20/10</p>

       <p>(Las domiciliaciones de estos modelos finalizan 5 días antes del plazo indicado).</p>

       <h3>- Declaraciones anuales (180,190,390): <span>30/01</span></h3>
       <h3>- Declaraciones con terceros e intracomunitario (347,349): <span>28/02</span></h3>
       <h3>- Declaración Renta (IRPF Mod 100): <span>desde el 01/04 al 30/06</span></h3>
       <h3>- Declaración Sociedades (IS Mod 200): <span>hasta 25/07</span></h3>
       <p></p>
       <p>Igualmente precisamos que nos indiques un email donde poder comunicarte cualquier incidencia al respecto.</p>
       <p>En caso de no disponer de la información pertinente en los plazos anteriormente mencionados
       y que de ello pudiera derivar un retraso o incumplimiento de las obligaciones tributarias
       legales, IASE Gestión no se responsabiliza de las consecuencias administrativas y o de la
       sanción/es económicas que este incumplimiento pudiera acarrear.</p>
    </div>`;

     try {
         mailOptions={
           from: 'informacion@iasegestion.com',
           to: req.body.email,
           subject: 'Documentación - Plazos de entrega',
           text: 'Test',
           html: mail,
         };

        Mailer.newMail(mailOptions, req);

        res.send('OK')
     } catch (e) {
       res.send(e)
     }
  });
}
