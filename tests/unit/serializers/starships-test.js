import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

var server,
  response = {
    results: [
      { name: "Tubby", url: 'https://swapi.co/starships/11' },
      { name: "Spot", url: 'https://swapi.co/starships/32' },
      { name: "Chestnut", url: 'https://swapi.co/starships/43' }
    ]
  };

moduleForModel('starship', 'Unit | Serializer | starship', {
  needs: ['serializer:application'],

  beforeEach() {
    server = new Pretender(function() {
      this.get('starships', function() {
        return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      });
    });
  },

  afterEach() {
    server.shutdown();
  }
});

test('it serializes array responses', function(assert) {
  return this.store().findAll('starship').then((starships) => {
    assert.equal(starships.get('length'), 3);
    assert.equal(starships.objectAt(0).get('id'), 11, `object id should be 1 but it was ${starships.objectAt(0).get('id')}`);
    assert.equal(starships.objectAt(1).get('id'), 32, `object id should be 12 but it was ${starships.objectAt(0).get('id')}`);
    assert.equal(starships.objectAt(2).get('id'), 43, `object id should be 23 but it was ${starships.objectAt(0).get('id')}`);
  });
});
