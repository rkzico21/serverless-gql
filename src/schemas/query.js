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

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        
        items: {
            type: new GraphQLList(itemType),
            resolve: (parent, args) => itemService.getItems()
        },
        stories: {
            type: new GraphQLList(storyType),
            resolve: (parent, args) => storyService.getStories()
        },
        story: {
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            type: storyType,
            resolve: (parent, args) => storyService.getStory(args.id)
        },

        hello: {
            type: GraphQLString,
            resolve: (args) => { return 'world' }
        
    }
}
});

module.exports = query;