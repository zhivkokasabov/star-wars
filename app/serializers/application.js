import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, modelName, payload, id, requestType) {
    payload = payload.results;

    this.extendPayload(payload, modelName);

    return this._super(store, modelName, payload, id, requestType);
  },

  getId(entity) {
    return entity.url.match(/\d+/)[0];
  },

  extendPayload(payload, modelName) {
    payload.forEach((entity) => {
      entity.id = this.getId(entity);
      entity.type = modelName;
    });
  }
});
