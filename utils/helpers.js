const bcrypt = require("bcryptjs");
const sendgrid = require("@sendgrid/mail");
// const keys = require('../config/keys');
sendgrid.setApiKey(process.env.sendGridApi);

// const axios = require('axios');
const Helpers = {};

Helpers.HashValue = function HashValue(value) {
  return bcrypt.hashSync(value, 12);
};

Helpers.UnHashValue = function UnHashValue(plain, hashedValue) {
  return bcrypt.compareSync(plain, hashedValue);
};

Helpers.sendMail = (to, from, subject, template) => {
  const mail = { to, from, subject, html: template };
  console.log(mail);
  sendgrid.send(mail);
};

//   Helpers.SendRequest = (method, url, data, headers) => {
//     return axios({ method, url, data, headers });
//   };

module.exports = Helpers;
