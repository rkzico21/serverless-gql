'use strict';

require('dotenv/config');


const { graphql } = require('graphql');
const schema = require('../../schemas/schema');

module.exports.handler = async (event, context) => {
    const val = JSON.parse(event.body);
    console.log(val);
    const stories = await graphql(schema, val.query, event.body.query, context, val.variables);
    return {
    statusCode: 200,
    body: JSON.stringify({
       stories
    }),
  };

};