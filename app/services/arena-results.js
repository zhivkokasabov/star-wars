import Service from '@ember/service';

export default Service.extend({
  EnglandScore: 0,

  BulgariaScore: 0,

  incrementBulgariaScore() {
    this.incrementProperty('BulgariaScore');
  },

  incrementEnglandScore() {
    this.incrementProperty('EnglandScore');
  }
});
