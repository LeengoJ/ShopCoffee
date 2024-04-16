const nodemailer = require("nodemailer");
const configs = require("../configs/configs");

// async..await is not allowed in global scope, must use a wrapper

module.exports = {
  SendMail: async function (options) {
    let transporter = nodemailer.createTransport({
      host: configs.SMTP_Host,
      port: configs.SMTP_Port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: configs.SMTP_Username, // generated ethereal user
        pass: configs.SMTP_Password, // generated ethereal password
      },
    });
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: "OAuth2",
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD,
    //     clientId: process.env.OAUTH_CLIENTID,
    //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    //   },
    // });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${configs.SMTP_Name}<${configs.SMTP_Email}>`, // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: options.message, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
  },
};
