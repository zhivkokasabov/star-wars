import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupPeople } from "../../helpers/setup-people-component-data-helper";


module('Unit | Component | people-component', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    let peopleData = setupPeople();

    peopleData.setupData((this));
    peopleData.setupArenaService(this);
  });

  test('if setBattleResults will set the proper values', function(assert) {
    let component = this.owner.factoryFor('component:people-component').create();
    let peopleData = setupPeople();
    let results = {
      BulgariaScoreInitialValue: component.get('arenaResults.BulgariaScore'),
      EnglandScoreInitialValue: component.get('arenaResults.EnglandScore'),
      resultAfterFirstCall: {}, // left opponent with higher score
      resultAfterSecondCall: {}, // right opponent with higher score
      resultAfterThirdCall: {}, // equal score
      noOpponentResult: null
    };

    peopleData.setupData(component, { mass: 140 }, { mass: 130 });
    component.setBattleResult();
    results.resultAfterFirstCall.leftOpponent = component.get('arenaResults.EnglandScore');
    results.resultAfterFirstCall.rightOpponent = component.get('arenaResults.BulgariaScore');

    peopleData.setupData(component, { mass: 140 }, { mass: 150 });
    component.setBattleResult();
    results.resultAfterSecondCall.leftOpponent = component.get('arenaResults.EnglandScore');
    results.resultAfterSecondCall.rightOpponent = component.get('arenaResults.BulgariaScore');

    peopleData.setupData(component, { mass: 140 }, { mass: 140 });
    component.setBattleResult();
    results.resultAfterThirdCall.leftOpponent = component.get('arenaResults.EnglandScore');
    results.resultAfterThirdCall.rightOpponent = component.get('arenaResults.BulgariaScore');

    component.set('leftOpponent', null);
    results.noOpponentResult = component.setBattleResult();

    assert.equal(
      results.BulgariaScoreInitialValue,
      0,
      `The initial value of BulgariaScore should be 0 but it was ${results.BulgariaScoreInitialValue}`
    );
    assert.equal(
      results.EnglandScoreInitialValue,
      0,
      `The initial value of EnglandScore should be 0 but it was ${results.EnglandScoreInitialValue}`
    );

    assert.equal(
      results.resultAfterFirstCall.leftOpponent,
      1,
      `The value of EnglandScore after the first call should be 1 but it was ${results.resultAfterFirstCall.leftOpponent}`
    );
    assert.equal(
      results.resultAfterFirstCall.rightOpponent,
      0,
      `The value of BulgariaScore after the first call should be 0 but it was ${results.resultAfterFirstCall.rightOpponent}`
    );

    assert.equal(
      results.resultAfterSecondCall.leftOpponent,
      1,
      `The value of EnglandScore after the second call should be 1 but it was ${results.resultAfterSecondCall.leftOpponent}`
    );
    assert.equal(
      results.resultAfterSecondCall.rightOpponent,
      1,
      `The value of BulgariaScore after the second call should be 1 but it was ${results.resultAfterSecondCall.rightOpponent}`
    );

    assert.equal(
      results.resultAfterThirdCall.leftOpponent,
      2,
      `The value of EnglandScore after the third call should be 2 but it was ${results.resultAfterThirdCall.leftOpponent}`
    );
    assert.equal(
      results.resultAfterThirdCall.rightOpponent,
      2,
      `The value of BulgariaScore after the third call should be 2 but it was ${results.resultAfterThirdCall.rightOpponent}`
    );

    assert.notOk(
      results.noOpponentResult,
      `setBattleResults() should return false if there is no data instead it returned ${results.noOpponentResult}`
    );
  });
});
