'use strict';

    const {
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
        GraphQLBoolean
    } = require('graphql');

   const query = require('./query');
   const mutation = require('./mutation');
   

   const schema = new GraphQLSchema({
        query: query,
        mutation: mutation
    });

    module.exports = schema;