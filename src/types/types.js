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
  
    const itemType = new GraphQLObjectType({
        name: 'Item',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString)},
            title: { type: new GraphQLNonNull(GraphQLString) }
        }
    });

    const storyType = new GraphQLObjectType({
        name: 'Story',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString)},
            title: { type: new GraphQLNonNull(GraphQLString) },
            items : {
                type: new GraphQLList(itemType)
            }
        }
    });
    
    module.exports = { storyType, itemType} ;