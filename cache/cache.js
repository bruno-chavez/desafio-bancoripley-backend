"use strict";

const asyncRedis = require("async-redis");
const AWS = require('aws-sdk');

const ssm = new AWS.SSM();

async function getParameter() {

  let params = {
    Name: 'desafio-ripley-cache',
    WithDecryption: true
  };

  let request = await ssm.getParameter(params).promise();

  return request.Parameter.Value;
}

// Sets up a connection to ElastiCache once for the entire API
module.exports = (async function () {
  let host = await getParameter();
  let client = asyncRedis.createClient(6379, host);

  client.on("error", function (err) {
    console.log("Error: " + err);
  });

  return client
})();
