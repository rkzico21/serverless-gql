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

    const {storyType, itemType} = require('../types/types');
    const storyService = require('../services/story.service');
    const itemService = require('../services/item.service');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        story: {
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) }
            },
            type: storyType,
            resolve: (parent, args) => storyService.updateStory(args)
        },
        removeStory: {
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            type: GraphQLBoolean,
            resolve: (parent, args) => storyService.deleteStory(args.id)
        },

        /*addItemToStory: {
            args: {
                itemid: { type: new GraphQLNonNull(GraphQLString)},
                storyid: { type: new GraphQLNonNull(GraphQLString)}
            },

            type: storyType,
            resolve: (parent, args) => storyService.addItemToStory(args.itemid, args.storyid) 
        },*/ 

        item: {
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) }
            },
            type: itemType,
            resolve: (parent, args) => itemService.put(args)
        }
    }
});

module.exports = mutation;