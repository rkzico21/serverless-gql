'use strict';

require('dotenv/config');


const { graphql } = require('graphql');
const schema = require('../../schemas/schema');

module.exports.handler = async (event, context) => {
    const val = JSON.parse(event.body);
    console.log(val);
    var root = {
      hello: () => {
        return 'Hello world!';
      },
    };
    const data = await graphql(schema, val.query, root, context, val.variables);
    return {
    statusCode: 200,
    body: JSON.stringify({
      "result": data
    }),
  };

};