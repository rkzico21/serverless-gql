'use strict';

require('dotenv/config');

const { TodolistRepository } = require('../../repositories/todolist.repository');
const { withProcessEnv } = require('../../dynamodb.factory');
const docClient = withProcessEnv(process.env)();
const repository = new TodolistRepository(docClient);

module.exports.handler = async (event, context) => {
    
    const todolist = await repository.list();
  
    return {
    statusCode: 200,
    body: JSON.stringify({
      todolist
    }),
  };

};
