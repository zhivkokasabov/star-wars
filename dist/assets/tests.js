'use strict';

define("star-wars/tests/helpers/arena-service-helper", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.mockArenaService = mockArenaService;

  function mockArenaService() {
    return Ember.Service.extend({
      BulgariaScore: 0,
      EnglandScore: 0,

      incrementEnglandScore() {
        this.EnglandScore++;
      },

      incrementBulgariaScore() {
        this.BulgariaScore++;
      }

    });
  }
});
define("star-wars/tests/helpers/setup-people-component-data-helper", ["exports", "star-wars/tests/helpers/arena-service-helper"], function (_exports, _arenaServiceHelper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupPeople = setupPeople;
  var arenaStub = (0, _arenaServiceHelper.mockArenaService)();

  function setupPeople() {
    return {
      setupData: function (context, left, right) {
        let leftOpponent = {
          id: 1,
          name: 'Some name',
          height: 170,
          mass: 22
        };
        let rightOpponent = {
          id: 2,
          name: 'Some other name',
          height: 171,
          mass: 24
        };
        Object.assign(leftOpponent, left);
        Object.assign(rightOpponent, right);
        context.setProperties({
          leftOpponent: Ember.Object.create(leftOpponent),
          rightOpponent: Ember.Object.create(rightOpponent)
        });
      },
      setupArenaService: function (context) {
        context.owner.register('service:arena-results-service', arenaStub);
      }
    };
  }
});
define("star-wars/tests/helpers/setup-starships-component-data-helper", ["exports", "star-wars/tests/helpers/arena-service-helper"], function (_exports, _arenaServiceHelper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupStarships = setupStarships;
  var arenaStub = (0, _arenaServiceHelper.mockArenaService)();

  function setupStarships() {
    return {
      setupData: function (context, left, right) {
        let leftOpponent = {
          id: 1,
          name: 'Some name',
          crew: 11,
          passengers: 22
        };
        let rightOpponent = {
          id: 2,
          name: 'Some other name',
          crew: 13,
          passengers: 24
        };
        Object.assign(leftOpponent, left);
        Object.assign(rightOpponent, right);
        context.setProperties({
          leftOpponent: Ember.Object.create(leftOpponent),
          rightOpponent: Ember.Object.create(rightOpponent)
        });
      },
      setupArenaService: function (context) {
        context.owner.register('service:arena-results-service', arenaStub);
      }
    };
  }
});
define("star-wars/tests/integration/components/people-component/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "star-wars/tests/helpers/setup-people-component-data-helper"], function (_qunit, _emberQunit, _testHelpers, _setupPeopleComponentDataHelper) {
  "use strict";

  (0, _qunit.module)('Integration | Component | people-component', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      let peopleData = (0, _setupPeopleComponentDataHelper.setupPeople)();
      peopleData.setupArenaService(this);
      peopleData.setupData(this);
    });
    (0, _qunit.test)('it will render with the proper values inside the template', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hPzz7Woi",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"people-component\",null,[[\"leftOpponent\",\"rightOpponent\"],[[23,[\"leftOpponent\"]],[23,[\"rightOpponent\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
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
});
define("star-wars/tests/integration/components/starship-component/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "star-wars/tests/helpers/setup-starships-component-data-helper"], function (_qunit, _emberQunit, _testHelpers, _setupStarshipsComponentDataHelper) {
  "use strict";

  (0, _qunit.module)('Integration | Component | starships-component', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      let starshipsData = (0, _setupStarshipsComponentDataHelper.setupStarships)();
      starshipsData.setupArenaService(this);
      starshipsData.setupData(this);
    });
    (0, _qunit.test)('it will render with the proper values inside the template', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kMCSjxDd",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"starships-component\",null,[[\"leftOpponent\",\"rightOpponent\"],[[23,[\"leftOpponent\"]],[23,[\"rightOpponent\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
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
});
define("star-wars/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('adapters/people.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/people.js should pass ESLint\n\n');
  });
  QUnit.test('adapters/starship.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/starship.js should pass ESLint\n\n');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/battlefield-component/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/battlefield-component/component.js should pass ESLint\n\n');
  });
  QUnit.test('components/people-component/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/people-component/component.js should pass ESLint\n\n');
  });
  QUnit.test('components/starships-component/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/starships-component/component.js should pass ESLint\n\n');
  });
  QUnit.test('models/people.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/people.js should pass ESLint\n\n');
  });
  QUnit.test('models/starship.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/starship.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/star-wars.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/star-wars.js should pass ESLint\n\n');
  });
  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });
  QUnit.test('services/arena-results.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/arena-results.js should pass ESLint\n\n');
  });
});
define("star-wars/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('star-wars/components/battlefield-component/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'star-wars/components/battlefield-component/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('star-wars/components/people-component/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'star-wars/components/people-component/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('star-wars/components/starships-component/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'star-wars/components/starships-component/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('star-wars/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'star-wars/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('star-wars/templates/star-wars.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'star-wars/templates/star-wars.hbs should pass TemplateLint.\n\n');
  });
});
define("star-wars/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('helpers/arena-service-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/arena-service-helper.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/setup-people-component-data-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/setup-people-component-data-helper.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/setup-starships-component-data-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/setup-starships-component-data-helper.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/people-component/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/people-component/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/starship-component/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/starship-component/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/starship-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/starship-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/components/battlefield-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/battlefield-component-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/components/people-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/people-component-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/components/starships-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/starships-component-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/starship-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/starship-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/star-wars-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/star-wars-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/serializers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/serializers/people-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/people-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/serializers/starships-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/starships-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/arena-results-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/arena-results-test.js should pass ESLint\n\n');
  });
});
define("star-wars/tests/test-helper", ["star-wars/app", "star-wars/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("star-wars/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("star-wars/tests/unit/adapters/starship-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | starship', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:starship');
      assert.ok(adapter);
    });
  });
});
define("star-wars/tests/unit/components/battlefield-component-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Component | battlefield-component', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let component = this.owner.factoryFor('component:battlefield-component').create();
      assert.ok(component);
    });
  });
});
define("star-wars/tests/unit/components/people-component-test", ["qunit", "ember-qunit", "star-wars/tests/helpers/setup-people-component-data-helper"], function (_qunit, _emberQunit, _setupPeopleComponentDataHelper) {
  "use strict";

  (0, _qunit.module)('Unit | Component | people-component', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      let peopleData = (0, _setupPeopleComponentDataHelper.setupPeople)();
      peopleData.setupData(this);
      peopleData.setupArenaService(this);
    });
    (0, _qunit.test)('if setBattleResults will set the proper values', function (assert) {
      let component = this.owner.factoryFor('component:people-component').create();
      let peopleData = (0, _setupPeopleComponentDataHelper.setupPeople)();
      let results = {
        BulgariaScoreInitialValue: component.get('arenaResults.BulgariaScore'),
        EnglandScoreInitialValue: component.get('arenaResults.EnglandScore'),
        resultAfterFirstCall: {},
        // left opponent with higher score
        resultAfterSecondCall: {},
        // right opponent with higher score
        resultAfterThirdCall: {},
        // equal score
        noOpponentResult: null
      };
      peopleData.setupData(component, {
        mass: 140
      }, {
        mass: 130
      });
      component.setBattleResult();
      results.resultAfterFirstCall.leftOpponent = component.get('arenaResults.EnglandScore');
      results.resultAfterFirstCall.rightOpponent = component.get('arenaResults.BulgariaScore');
      peopleData.setupData(component, {
        mass: 140
      }, {
        mass: 150
      });
      component.setBattleResult();
      results.resultAfterSecondCall.leftOpponent = component.get('arenaResults.EnglandScore');
      results.resultAfterSecondCall.rightOpponent = component.get('arenaResults.BulgariaScore');
      peopleData.setupData(component, {
        mass: 140
      }, {
        mass: 140
      });
      component.setBattleResult();
      results.resultAfterThirdCall.leftOpponent = component.get('arenaResults.EnglandScore');
      results.resultAfterThirdCall.rightOpponent = component.get('arenaResults.BulgariaScore');
      component.set('leftOpponent', null);
      results.noOpponentResult = component.setBattleResult();
      assert.equal(results.BulgariaScoreInitialValue, 0, `The initial value of BulgariaScore should be 0 but it was ${results.BulgariaScoreInitialValue}`);
      assert.equal(results.EnglandScoreInitialValue, 0, `The initial value of EnglandScore should be 0 but it was ${results.EnglandScoreInitialValue}`);
      assert.equal(results.resultAfterFirstCall.leftOpponent, 1, `The value of EnglandScore after the first call should be 1 but it was ${results.resultAfterFirstCall.leftOpponent}`);
      assert.equal(results.resultAfterFirstCall.rightOpponent, 0, `The value of BulgariaScore after the first call should be 0 but it was ${results.resultAfterFirstCall.rightOpponent}`);
      assert.equal(results.resultAfterSecondCall.leftOpponent, 1, `The value of EnglandScore after the second call should be 1 but it was ${results.resultAfterSecondCall.leftOpponent}`);
      assert.equal(results.resultAfterSecondCall.rightOpponent, 1, `The value of BulgariaScore after the second call should be 1 but it was ${results.resultAfterSecondCall.rightOpponent}`);
      assert.equal(results.resultAfterThirdCall.leftOpponent, 2, `The value of EnglandScore after the third call should be 2 but it was ${results.resultAfterThirdCall.leftOpponent}`);
      assert.equal(results.resultAfterThirdCall.rightOpponent, 2, `The value of BulgariaScore after the third call should be 2 but it was ${results.resultAfterThirdCall.rightOpponent}`);
      assert.notOk(results.noOpponentResult, `setBattleResults() should return false if there is no data instead it returned ${results.noOpponentResult}`);
    });
  });
});
define("star-wars/tests/unit/components/starships-component-test", ["qunit", "ember-qunit", "star-wars/tests/helpers/setup-starships-component-data-helper"], function (_qunit, _emberQunit, _setupStarshipsComponentDataHelper) {
  "use strict";

  (0, _qunit.module)('Unit | Component | starships-component', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      let starshipsData = (0, _setupStarshipsComponentDataHelper.setupStarships)();
      starshipsData.setupData(this);
      starshipsData.setupArenaService(this);
    });
    (0, _qunit.test)('if setBattleResults will set the proper values', function (assert) {
      let component = this.owner.factoryFor('component:starships-component').create();
      let starshipsData = (0, _setupStarshipsComponentDataHelper.setupStarships)();
      let results = {
        BulgariaScoreInitialValue: component.get('arenaResults.BulgariaScore'),
        EnglandScoreInitialValue: component.get('arenaResults.EnglandScore'),
        resultAfterFirstCall: {},
        // left opponent with higher score
        resultAfterSecondCall: {},
        // right opponent with higher score
        resultAfterThirdCall: {},
        // equal score
        noOpponentResult: null
      };
      starshipsData.setupData(component, {
        crew: 140
      }, {
        crew: 130
      });
      component.setBattleResult();
      results.resultAfterFirstCall.leftOpponent = component.get('arenaResults.EnglandScore');
      results.resultAfterFirstCall.rightOpponent = component.get('arenaResults.BulgariaScore');
      starshipsData.setupData(component, {
        crew: 140
      }, {
        crew: 150
      });
      component.setBattleResult();
      results.resultAfterSecondCall.leftOpponent = component.get('arenaResults.EnglandScore');
      results.resultAfterSecondCall.rightOpponent = component.get('arenaResults.BulgariaScore');
      starshipsData.setupData(component, {
        crew: 140
      }, {
        crew: 140
      });
      component.setBattleResult();
      results.resultAfterThirdCall.leftOpponent = component.get('arenaResults.EnglandScore');
      results.resultAfterThirdCall.rightOpponent = component.get('arenaResults.BulgariaScore');
      component.set('leftOpponent', null);
      results.noOpponentResult = component.setBattleResult();
      assert.equal(results.BulgariaScoreInitialValue, 0, `The initial value of BulgariaScore should be 0 but it was ${results.BulgariaScoreInitialValue}`);
      assert.equal(results.EnglandScoreInitialValue, 0, `The initial value of EnglandScore should be 0 but it was ${results.EnglandScoreInitialValue}`);
      assert.equal(results.resultAfterFirstCall.leftOpponent, 1, `The value of EnglandScore after the first call should be 1 but it was ${results.resultAfterFirstCall.leftOpponent}`);
      assert.equal(results.resultAfterFirstCall.rightOpponent, 0, `The value of BulgariaScore after the first call should be 0 but it was ${results.resultAfterFirstCall.rightOpponent}`);
      assert.equal(results.resultAfterSecondCall.leftOpponent, 1, `The value of EnglandScore after the second call should be 1 but it was ${results.resultAfterSecondCall.leftOpponent}`);
      assert.equal(results.resultAfterSecondCall.rightOpponent, 1, `The value of BulgariaScore after the second call should be 1 but it was ${results.resultAfterSecondCall.rightOpponent}`);
      assert.equal(results.resultAfterThirdCall.leftOpponent, 2, `The value of EnglandScore after the third call should be 2 but it was ${results.resultAfterThirdCall.leftOpponent}`);
      assert.equal(results.resultAfterThirdCall.rightOpponent, 2, `The value of BulgariaScore after the third call should be 2 but it was ${results.resultAfterThirdCall.rightOpponent}`);
      assert.notOk(results.noOpponentResult, `setBattleResults() should return false if there is no data instead it returned ${results.noOpponentResult}`);
    });
  });
});
define("star-wars/tests/unit/models/starship-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | starship', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('starship', {});
      assert.ok(model);
    });
  });
});
define("star-wars/tests/unit/routes/star-wars-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | star-wars', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:star-wars');
      assert.ok(route);
    });
  });
});
define("star-wars/tests/unit/serializers/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor('application');
      assert.ok(serializer);
    });
  });
});
define("star-wars/tests/unit/serializers/people-test", ["ember-qunit", "pretender"], function (_emberQunit, _pretender) {
  "use strict";

  var server,
      response = {
    results: [{
      name: "Tubby",
      url: 'https://swapi.co/people/1'
    }, {
      name: "Spot",
      url: 'https://swapi.co/people/12'
    }, {
      name: "Chestnut",
      url: 'https://swapi.co/people/23'
    }]
  };
  (0, _emberQunit.moduleForModel)('people', 'Unit | Serializer | people', {
    needs: ['serializer:application'],

    beforeEach() {
      server = new _pretender.default(function () {
        this.get('people', function () {
          return [200, {
            "Content-Type": "application/json"
          }, JSON.stringify(response)];
        });
      });
    },

    afterEach() {
      server.shutdown();
    }

  });
  (0, _emberQunit.test)('it serializes array responses', function (assert) {
    return this.store().findAll('people').then(people => {
      assert.equal(people.get('length'), 3);
      assert.equal(people.objectAt(0).get('id'), 1, `object id should be 1 but it was ${people.objectAt(0).get('id')}`);
      assert.equal(people.objectAt(1).get('id'), 12, `object id should be 12 but it was ${people.objectAt(0).get('id')}`);
      assert.equal(people.objectAt(2).get('id'), 23, `object id should be 23 but it was ${people.objectAt(0).get('id')}`);
    });
  });
});
define("star-wars/tests/unit/serializers/starships-test", ["ember-qunit", "pretender"], function (_emberQunit, _pretender) {
  "use strict";

  var server,
      response = {
    results: [{
      name: "Tubby",
      url: 'https://swapi.co/starships/11'
    }, {
      name: "Spot",
      url: 'https://swapi.co/starships/32'
    }, {
      name: "Chestnut",
      url: 'https://swapi.co/starships/43'
    }]
  };
  (0, _emberQunit.moduleForModel)('starship', 'Unit | Serializer | starship', {
    needs: ['serializer:application'],

    beforeEach() {
      server = new _pretender.default(function () {
        this.get('starships', function () {
          return [200, {
            "Content-Type": "application/json"
          }, JSON.stringify(response)];
        });
      });
    },

    afterEach() {
      server.shutdown();
    }

  });
  (0, _emberQunit.test)('it serializes array responses', function (assert) {
    return this.store().findAll('starship').then(starships => {
      assert.equal(starships.get('length'), 3);
      assert.equal(starships.objectAt(0).get('id'), 11, `object id should be 1 but it was ${starships.objectAt(0).get('id')}`);
      assert.equal(starships.objectAt(1).get('id'), 32, `object id should be 12 but it was ${starships.objectAt(0).get('id')}`);
      assert.equal(starships.objectAt(2).get('id'), 43, `object id should be 23 but it was ${starships.objectAt(0).get('id')}`);
    });
  });
});
define("star-wars/tests/unit/services/arena-results-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | arena-results', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it can increment Bulgaria score', function (assert) {
      const originalValue = 46;
      const expectedResult = originalValue + 1;
      let service = this.owner.lookup('service:arena-results');
      service.BulgariaScore = originalValue;
      service.incrementBulgariaScore();
      assert.equal(service.BulgariaScore, expectedResult, `BulgariaScore should be ${expectedResult} but it was ${service.BulgariaScore}`);
    });
    (0, _qunit.test)('it can increment England score', function (assert) {
      const originalValue = 32;
      const expectedResult = originalValue + 1;
      let service = this.owner.lookup('service:arena-results');
      service.EnglandScore = originalValue;
      service.incrementEnglandScore();
      assert.equal(service.EnglandScore, expectedResult, `BulgarianScore should be ${service.EnglandScore} but it was ${service.EnglandScore}`);
    });
  });
});
define('star-wars/config/environment', [], function() {
  var prefix = 'star-wars';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('star-wars/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
