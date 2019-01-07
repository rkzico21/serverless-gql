const { StoryRepository } = require('../repositories/story.repository');
const { ItemRepository } = require('../repositories/item.repository');
const { withProcessEnv } = require('../dynamodb.factory');    
const docClient = withProcessEnv(process.env)();
const repository = new StoryRepository(docClient);
const itemRepository = new ItemRepository(docClient);
const itemType = require('../types/types');

const getStories = async () => {
    stories = await repository.list();
    console.log(stories);
    /*items = await itemRepository.list();
    storiesWithItem = [];
    stories.forEach(element => {
        storiesWithItem.push(
            {
                id: element.id,
                title: element.title,
                items: items
            }
        ) 
    });*/

    return stories;
};

const getStory= async (id) => {
    story = await repository.get(id);
    
    return story;
};


const updateStory = async (story) => {
   story = await repository.put(story);  
   return story;
};

const deleteStory = async(id) => {
    await  repository.delete(id);
    return true;
}

const addItemToStory = async(itemId, storyId) => {
   
   story = await repository.get(storyId);
   item =  await itemRepository.get(itemId);
   
   if(!story.items || story.items === undefined) {
       story.items = [];
   } 
   
   //TODO: check item id. It is actually upto the domain to ensure this
   story.items.push(itemId); 
   if(!item.stories || item.stories === undefined) {
        item.stories = [];
    } 
    
    //TODO: check item id. It is actually upto the domain to ensure this
    item.stories.push(storyId); 
    editedStory = await repository.put(story);

    await itemRepository.put(item);

    return story;
};

const  storyService = {
    getStories : getStories,
    getStory : getStory,
    updateStory : updateStory,
    deleteStory : deleteStory,
    addItemToStory: addItemToStory
}

module.exports = storyService;

