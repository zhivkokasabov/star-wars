'use strict';



;define("star-wars/adapters/application", ["exports", "ember-data", "star-wars/config/environment"], function (_exports, _emberData, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.RESTAdapter.extend({
    host: _environment.default.apiBaseUrl,
    namespace: _environment.default.apiNamespace
  });

  _exports.default = _default;
});
;define("star-wars/adapters/people", ["exports", "star-wars/adapters/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _application.default.extend({});

  _exports.default = _default;
});
;define("star-wars/adapters/starship", ["exports", "star-wars/adapters/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _application.default.extend({});

  _exports.default = _default;
});
;define("star-wars/app", ["exports", "star-wars/resolver", "ember-load-initializers", "star-wars/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("star-wars/components/battlefield-component/component", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    action: 'people',
    arenaResults: Ember.inject.service('arena-results'),
    activeActionTemplate: Ember.computed('action', function () {
      return `${this.get('action')}-component`;
    }),

    pickOpponent(data) {
      const length = data.length,
            random = Math.floor(Math.random() * length),
            result = data[random];
      data.splice(random, 1);
      return result;
    },

    pickRandomOpponents() {
      const action = this.get('action'),
            data = this.get(action).toArray(),
            leftOpponent = this.pickOpponent(data),
            rightOpponent = this.pickOpponent(data);
      return {
        leftOpponent,
        rightOpponent
      };
    },

    actions: {
      switchBattleType(battleType) {
        this.set('leftOpponent', null);
        this.set('rightOpponent', null);
        this.set('action', battleType);
      },

      brawl() {
        const opponents = this.pickRandomOpponents();
        this.set('leftOpponent', opponents.leftOpponent);
        this.set('rightOpponent', opponents.rightOpponent);
      }

    }
  });

  _exports.default = _default;
});
;define("star-wars/components/battlefield-component/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "MCWK6spJ",
    "block": "{\"symbols\":[],\"statements\":[[7,\"select\"],[11,\"class\",\"form-control form-control-lg mb-3\"],[12,\"onChange\",[27,\"action\",[[22,0,[]],\"switchBattleType\"],[[\"value\"],[\"target.value\"]]]],[9],[0,\"\\n  \"],[7,\"option\"],[11,\"value\",\"people\"],[9],[0,\"People\"],[10],[0,\"\\n  \"],[7,\"option\"],[11,\"value\",\"starships\"],[9],[0,\"Starships\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row mb-3 justify-content-center\"],[9],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"btn btn-dark\"],[12,\"onClick\",[27,\"action\",[[22,0,[]],\"brawl\"],null]],[11,\"type\",\"button\"],[9],[0,\"Brawl\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"row mb-3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-6 text-right\"],[9],[0,\"\\n    \"],[7,\"label\"],[9],[0,\"England:\"],[10],[0,\"\\n    \"],[7,\"span\"],[9],[1,[23,[\"arenaResults\",\"EnglandScore\"]],false],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-6\"],[9],[0,\"\\n    \"],[7,\"span\"],[9],[1,[23,[\"arenaResults\",\"BulgariaScore\"]],false],[10],[0,\"\\n    \"],[7,\"label\"],[9],[0,\":Bulgaria\"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"leftOpponent\"]]],null,{\"statements\":[[0,\"  \"],[1,[27,\"component\",[[23,[\"activeActionTemplate\"]]],[[\"leftOpponent\",\"rightOpponent\"],[[23,[\"leftOpponent\"]],[23,[\"rightOpponent\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"row px-3\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"card col\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n        \"],[7,\"h5\"],[11,\"class\",\"card-title m-0\"],[9],[0,\"The arena is ready for brawling\"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}",
    "meta": {
      "moduleName": "star-wars/components/battlefield-component/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("star-wars/components/people-component/component", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    arenaResults: Ember.inject.service('arena-results'),

    setBattleResult() {
      const leftOpponent = this.get('leftOpponent');
      const rightOpponent = this.get('rightOpponent');

      if (Object.prototype.toString.call(leftOpponent) !== '[object Object]') return false;

      if (leftOpponent.mass > rightOpponent.mass) {
        this.arenaResults.incrementEnglandScore();
      } else if (leftOpponent.mass === rightOpponent.mass) {
        this.arenaResults.incrementEnglandScore();
        this.arenaResults.incrementBulgariaScore();
      } else {
        this.arenaResults.incrementBulgariaScore();
      }
    },

    didRender() {
      this.setBattleResult();
    }

  });

  _exports.default = _default;
});
;define("star-wars/components/people-component/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "PW/Svbfb",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"row px-3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"card col-sm mr-sm-1 mb-3 mb-sm-0\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n      \"],[7,\"h5\"],[11,\"class\",\"card-title\"],[9],[0,\"Name: \"],[1,[23,[\"leftOpponent\",\"name\"]],false],[10],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"list-group list-group-flush\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"height: \"],[1,[23,[\"leftOpponent\",\"height\"]],false],[10],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"mass: \"],[1,[23,[\"leftOpponent\",\"mass\"]],false],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"card col-sm ml-sm-1\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n      \"],[7,\"h5\"],[11,\"class\",\"card-title\"],[9],[0,\"Name: \"],[1,[23,[\"rightOpponent\",\"name\"]],false],[10],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"list-group list-group-flush\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"height: \"],[1,[23,[\"rightOpponent\",\"height\"]],false],[10],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"mass: \"],[1,[23,[\"rightOpponent\",\"mass\"]],false],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "star-wars/components/people-component/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("star-wars/components/starships-component/component", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    arenaResults: Ember.inject.service('arena-results'),

    setBattleResult() {
      const leftOpponent = this.get('leftOpponent');
      const rightOpponent = this.get('rightOpponent');
      if (Object.prototype.toString.call(leftOpponent) !== '[object Object]') return false;

      if (leftOpponent.crew > rightOpponent.crew) {
        this.arenaResults.incrementEnglandScore();
      } else if (leftOpponent.crew === rightOpponent.crew) {
        this.arenaResults.incrementEnglandScore();
        this.arenaResults.incrementBulgariaScore();
      } else {
        this.arenaResults.incrementBulgariaScore();
      }
    },

    didRender() {
      this.setBattleResult();
    }

  });

  _exports.default = _default;
});
;define("star-wars/components/starships-component/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "yI0QcvG3",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"row px-3\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"card col-sm mr-sm-1 mb-3 mb-sm-0\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n      \"],[7,\"h5\"],[11,\"class\",\"card-title\"],[9],[0,\"Name: \"],[1,[23,[\"leftOpponent\",\"name\"]],false],[10],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"list-group list-group-flush\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"crew: \"],[1,[23,[\"leftOpponent\",\"crew\"]],false],[10],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"passengers: \"],[1,[23,[\"leftOpponent\",\"passengers\"]],false],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"card col-sm ml-sm-1\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"card-body\"],[9],[0,\"\\n      \"],[7,\"h5\"],[11,\"class\",\"card-title\"],[9],[0,\"Name: \"],[1,[23,[\"rightOpponent\",\"name\"]],false],[10],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"list-group list-group-flush\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"crew: \"],[1,[23,[\"rightOpponent\",\"crew\"]],false],[10],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"list-group-item\"],[9],[0,\"passengers: \"],[1,[23,[\"rightOpponent\",\"passengers\"]],false],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "star-wars/components/starships-component/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("star-wars/helpers/app-version", ["exports", "star-wars/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("star-wars/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("star-wars/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("star-wars/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "star-wars/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("star-wars/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("star-wars/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*

    This code initializes Ember-Data onto an Ember application.

    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.

    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.

    For example, imagine an Ember.js application with the following classes:

    ```app/services/store.js
    import DS from 'ember-data';

    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```

    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';

    export default Controller.extend({
      // ...
    });

    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.

    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("star-wars/initializers/export-application-global", ["exports", "star-wars/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("star-wars/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("star-wars/models/people", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.Model.extend({
    height: _emberData.default.attr('number'),
    mass: _emberData.default.attr('number'),
    name: _emberData.default.attr('string')
  });

  _exports.default = _default;
});
;define("star-wars/models/starship", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    crew: _emberData.default.attr('number'),
    passengers: _emberData.default.attr('number')
  });

  _exports.default = _default;
});
;define("star-wars/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("star-wars/router", ["exports", "star-wars/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('star-wars', {
      path: '/'
    });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("star-wars/routes/star-wars", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return Ember.RSVP.hash({
        people: this.store.findAll('people'),
        starships: this.store.findAll('starship')
      });
    },

    setupController(controller, model) {
      controller.setProperties(model);
    }

  });

  _exports.default = _default;
});
;define("star-wars/serializers/application", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.JSONSerializer.extend({
    normalizeResponse(store, modelName, payload, id, requestType) {
      payload = payload.results;
      this.extendPayload(payload, modelName);
      return this._super(store, modelName, payload, id, requestType);
    },

    getId(entity) {
      return entity.url.match(/\d+/)[0];
    },

    extendPayload(payload, modelName) {
      payload.forEach(entity => {
        entity.id = this.getId(entity);
        entity.type = modelName;
      });
    }

  });

  _exports.default = _default;
});
;define("star-wars/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("star-wars/services/arena-results", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    EnglandScore: 0,
    BulgariaScore: 0,

    incrementBulgariaScore() {
      this.incrementProperty('BulgariaScore');
    },

    incrementEnglandScore() {
      this.incrementProperty('EnglandScore');
    }

  });

  _exports.default = _default;
});
;define("star-wars/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "AxRwf7zs",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "star-wars/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("star-wars/templates/star-wars", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Jds8LQkJ",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"pt-3\"],[9],[0,\"\\n  \"],[4,\"battlefield-component\",null,[[\"people\",\"starships\"],[[23,[\"people\"]],[23,[\"starships\"]]]],{\"statements\":[],\"parameters\":[]},null],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "star-wars/templates/star-wars.hbs"
    }
  });

  _exports.default = _default;
});
;

;define('star-wars/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("star-wars/app")["default"].create({"name":"star-wars","version":"0.0.0+1788ffa9"});
          }

//# sourceMappingURL=star-wars.map
