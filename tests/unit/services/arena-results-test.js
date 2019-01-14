import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | arena-results', function(hooks) {
  setupTest(hooks);

  test('it can increment Bulgaria score', function(assert) {
    const originalValue = 46;
    const expectedResult = originalValue + 1;
    let service = this.owner.lookup('service:arena-results');

    service.BulgariaScore = originalValue;
    service.incrementBulgariaScore();

    assert.equal(service.BulgariaScore, expectedResult, `BulgariaScore should be ${expectedResult} but it was ${service.BulgariaScore}`);
  });

  test('it can increment England score', function(assert) {
    const originalValue = 32;
    const expectedResult = originalValue + 1;
    let service = this.owner.lookup('service:arena-results');

    service.EnglandScore = originalValue;
    service.incrementEnglandScore();

    assert.equal(service.EnglandScore, expectedResult, `BulgarianScore should be ${service.EnglandScore} but it was ${service.EnglandScore}`);
  });
});
