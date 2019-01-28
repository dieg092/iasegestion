const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const crypto = require('crypto')
const keys = require('../config/keys');
const User = mongoose.model('user');
const Token = mongoose.model('token');

module.exports = {
  newMail: (mailOptions, req) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ionos.es',
      port: 587,
      secure: false,
      auth: {
        user: keys.userMail,
        pass: keys.passMail
      }}
    );

    let options = {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html
    }

    if (mailOptions.fileName) {
      options = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
        attachments: [{
              filename: mailOptions.fileName ? mailOptions.fileName : '' ,
              content: mailOptions.attachment ? mailOptions.attachment : '',
              encoding: 'base64'
          }]
      };
    }

    transporter.sendMail(options, (error, info) => {
      if (error) {
          return 'ERROR';
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return 'OK';
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
}


//   {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: account.user, // generated ethereal user
//         pass: account.pass // generated ethereal password
//     }
// }
