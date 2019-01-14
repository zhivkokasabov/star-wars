import DS from 'ember-data';

export default DS.Model.extend({
  height: DS.attr('number'),
  mass: DS.attr('number'),
  name: DS.attr('string')
});
