let randToken = require("rand-token");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('vidiren-secret-key');

const tokenHelper = {};

tokenHelper.generate = (email) => {
  const token = randToken.generate(64);
  return cryptr.encrypt(email);
}

tokenHelper.decrypt = (token) => {
  return cryptr.decrypt(token);
}

module.exports = tokenHelper;