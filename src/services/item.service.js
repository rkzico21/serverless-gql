const { ItemRepository } = require('../repositories/item.repository');
const { withProcessEnv } = require('../dynamodb.factory');    
const docClient = withProcessEnv(process.env)();
const repository = new ItemRepository(docClient);

const getItems = async () => {
    items = await itemRepository.list();
    return items;
};

const getItem= async (id) => {
    item = await repository.get(id);
    return story;
};

const updateItem = async (item) => {
   story = await repository.put(item);  
   return story;
};

const deleteItem = async(id) => {
    await  repository.delete(id);
    return true;
};

const  itemService = {
    getItems : getItems,
    getItem : getItem,
    updateItem : updateItem,
    deleteItem : deleteItem
}

module.exports = itemService;

