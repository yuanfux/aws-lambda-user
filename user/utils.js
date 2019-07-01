'use strict';

var crypto = require('crypto');

module.exports.errorResponse = (body, code, headers) => {
  return {
    statusCode: code || 500,
    headers: headers || { 'Content-Type': 'text/plain' },
    body
  }
};

module.exports.genHashedPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return {
    salt,
    hashedPassword
  }
}

module.exports.validatePassword = (password, salt, hashedPassword) => {
  return hashedPassword === crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
};

// https://aws.amazon.com/cn/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/
module.exports.generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
