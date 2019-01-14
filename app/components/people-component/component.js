import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  arenaResults: inject('arena-results'),

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
