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
    /*const addProduct = require('./resolvers/create');
    const viewProduct = require('./resolvers/view');
    const listProducts = require('./resolvers/list');
    const removeProduct = require('./resolvers/remove');*/

   const { StoryRepository } = require('../repositories/story.repository');
   const { withProcessEnv } = require('../dynamodb.factory');    
   const docClient = withProcessEnv(process.env)();
   const repository = new StoryRepository(docClient);

   
    const storyType = new GraphQLObjectType({
        name: 'Story',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString)},
            title: { type: new GraphQLNonNull(GraphQLString) }
        }
    });


    const schema = new GraphQLSchema({
        
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                stories: {
                    type: new GraphQLList(storyType),
                    resolve: (parent, args) => repository.list()
                },
                story: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: storyType,
                    resolve: (parent, args) => repository.get(args.id)
                },

                hello: {
                    type: GraphQLString,
                    resolve: (args) => { return 'world' }
                
            }
        }
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                story: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) },
                        title: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: storyType,
                    resolve: (parent, args) => repository.put(args)
                },
                removeStory: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString)}
                    },
                    type: GraphQLBoolean,
                    resolve: (parent, args) => repository.delete(args.id)
                },
            }
        })
    });

    module.exports = schema;