import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupStarships } from "../../../helpers/setup-starships-component-data-helper";

module('Integration | Component | starships-component', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let starshipsData = setupStarships();

    starshipsData.setupArenaService(this);
    starshipsData.setupData(this);
  });

  test('it will render with the proper values inside the template', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{starships-component leftOpponent=leftOpponent rightOpponent=rightOpponent}}`);

    var cards = this.element.querySelectorAll('.card');
    var leftOpponent = cards[0];
    var rightOpponent = cards[1];

    var results = {
      leftOpponent: {
        name: leftOpponent.querySelector('.card-title').textContent,
        crew: leftOpponent.querySelector('.list-group .list-group-item:nth-of-type(1)').textContent,
        passengers: leftOpponent.querySelector('.list-group .list-group-item:nth-of-type(2)').textContent
      },
      rightOpponent: {
        name: rightOpponent.querySelector('.card-title').textContent,
        crew: rightOpponent.querySelector('.list-group .list-group-item:nth-of-type(1)').textContent,
        passengers: rightOpponent.querySelector('.list-group .list-group-item:nth-of-type(2)').textContent
      }
    };

    assert.equal(results.leftOpponent.name, 'Name: Some name', `name should be 'Some name' but it was ${results.leftOpponent.name}`);
    assert.equal(results.leftOpponent.crew, 'crew: 11', `crew size should 11 but it was ${results.leftOpponent.crew}`);
    assert.equal(results.leftOpponent.passengers, 'passengers: 22', `there should be 22 passengers but they were ${results.leftOpponent.passengers}`);

    assert.equal(results.rightOpponent.name, 'Name: Some other name', `name should be 'Some name' but it was ${results.rightOpponent.name}`);
    assert.equal(results.rightOpponent.crew, 'crew: 13', `crew size should 11 but it was ${results.rightOpponent.crew}`);
    assert.equal(results.rightOpponent.passengers, 'passengers: 24', `there should be 22 passengers but they were ${results.rightOpponent.passengers}`);
  });
});
