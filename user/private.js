'use strict';

module.exports.private = (event, context, callback) => {
  // get authorizer principalId
  const username = event.requestContext.authorizer.principalId;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${username}! You are allowed to read this message.`
    })
  }
  return callback(null, response);
};
