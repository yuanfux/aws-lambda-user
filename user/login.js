'use strict';

const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const utils = require('./utils');
const errorResponse = utils.errorResponse;
const validatePassword = utils.validatePassword;

const TABLE_NAME = process.env.DYNAMODB_TABLE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports.login = (event, context, callback) => {
  const { username, password } = event.queryStringParameters;
  if (
    typeof username === 'string' &&
    typeof password === 'string' &&
    username.length > 0 &&
    password.length > 0
  ) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        username
      },
    };

    // fetch todo from the database
    dynamoDb.get(params, (error, data) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, errorResponse(
          'Cannot login!'
        ));
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          username,
          // return jwt
          token: jwt.sign({
            username
          }, PRIVATE_KEY)
        })
      };
      callback(null, response);
    });
  } else {
    callback(null, errorResponse(
      'Params are invalid!',
      422
    ));
  }
};
