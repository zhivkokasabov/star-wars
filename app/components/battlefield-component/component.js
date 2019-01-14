import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  action: 'people',

  arenaResults: inject('arena-results'),

  activeActionTemplate: computed('action', function() {
    return `${this.get('action')}-component`;
  }),

  pickOpponent(data) {
    const length = data.length,
          random = Math.floor((Math.random() * length)),
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
