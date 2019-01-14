import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

var server,
    response = {
      results: [
        { name: "Tubby", url: 'https://swapi.co/people/1' },
        { name: "Spot", url: 'https://swapi.co/people/12' },
        { name: "Chestnut", url: 'https://swapi.co/people/23' }
      ]
    };

moduleForModel('people', 'Unit | Serializer | people', {
  needs: ['serializer:application'],

  beforeEach() {
    server = new Pretender(function() {
      this.get('people', function() {
        return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      });
    });
  },

  afterEach() {
    server.shutdown();
  }
});

test('it serializes array responses', function(assert) {
  return this.store().findAll('people').then((people) => {
    assert.equal(people.get('length'), 3);
    assert.equal(people.objectAt(0).get('id'), 1, `object id should be 1 but it was ${people.objectAt(0).get('id')}`);
    assert.equal(people.objectAt(1).get('id'), 12, `object id should be 12 but it was ${people.objectAt(0).get('id')}`);
    assert.equal(people.objectAt(2).get('id'), 23, `object id should be 23 but it was ${people.objectAt(0).get('id')}`);
  });
});
