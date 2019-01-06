'use strict';

require('dotenv/config');

const { StoryRepository } = require('../../repositories/story.repository');
const { withProcessEnv } = require('../../dynamodb.factory');
const docClient = withProcessEnv(process.env)();
const repository = new StoryRepository(docClient);


module.exports.handler = async (event, context) => {
    const { body } = event;
    const story = await repository.put(JSON.parse(body));
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            story
            }),
  };

};
