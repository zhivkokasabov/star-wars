import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupPeople } from "../../../helpers/setup-people-component-data-helper";

module('Integration | Component | people-component', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let peopleData = setupPeople();

    peopleData.setupArenaService(this);
    peopleData.setupData(this);
  });

  test('it will render with the proper values inside the template', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{people-component leftOpponent=leftOpponent rightOpponent=rightOpponent}}`);

    var cards = this.element.querySelectorAll('.card');
    var leftOpponent = cards[0];
    var rightOpponent = cards[1];

    var results = {
      leftOpponent: {
        name: leftOpponent.querySelector('.card-title').textContent,
        height: leftOpponent.querySelector('.list-group .list-group-item:nth-of-type(1)').textContent,
        mass: leftOpponent.querySelector('.list-group .list-group-item:nth-of-type(2)').textContent
      },
      rightOpponent: {
        name: rightOpponent.querySelector('.card-title').textContent,
        height: rightOpponent.querySelector('.list-group .list-group-item:nth-of-type(1)').textContent,
        mass: rightOpponent.querySelector('.list-group .list-group-item:nth-of-type(2)').textContent
      }
    };

    assert.equal(results.leftOpponent.name, 'Name: Some name', `name should be 'Some name' but it was ${results.leftOpponent.name}`);
    assert.equal(results.leftOpponent.height, 'height: 170', `height should be 170 but it was ${results.leftOpponent.height}`);
    assert.equal(results.leftOpponent.mass, 'mass: 22', `mass should be 22 but it was ${results.leftOpponent.passengers}`);

    assert.equal(results.rightOpponent.name, 'Name: Some other name', `name should be 'Some name' but it was ${results.rightOpponent.name}`);
    assert.equal(results.rightOpponent.height, 'height: 171', `height should be 171 but it was ${results.rightOpponent.height}`);
    assert.equal(results.rightOpponent.mass, 'mass: 24', `mass should be 24 but it was ${results.rightOpponent.passengers}`);
  });
});
