class ItemRepository {
    get _baseParams() {
      return {
        TableName: 'item'
      };
    }
  
    constructor(documentClient) {
      this._documentClient = documentClient;
    }
  
    async list() {
      const params = this._createParamObject();
      return this._documentClient.scan(params).promise()
        .then(r => r.Items);
    }

    async get(id) {
      const params = this._createParamObject({ Key: { id } });
      return this._documentClient.get(params).promise()
          .then(r=>r.Item);;
    }
  
    async put(story) {
      const params = this._createParamObject({ Item: story });
      await this._documentClient.put(params).promise();
  
      return story;
    }
  
    async delete(id) {
      const params = this._createParamObject({ Key: { id } });
      await this._documentClient.delete(params).promise();
  
      return id;
    }
  
    _createParamObject(additionalArgs = {}) {
      return Object.assign({}, this._baseParams, additionalArgs);
    }
  }
  
  exports.ItemRepository = ItemRepository;
  