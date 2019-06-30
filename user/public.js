'use strict';

module.exports.public = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Anyone can read this message.'
    })
  }

  return callback(null, response);
};
