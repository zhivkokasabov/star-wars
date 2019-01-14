import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | battlefield-component', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let component = this.owner.factoryFor('component:battlefield-component').create();
    assert.ok(component);
  });
});
