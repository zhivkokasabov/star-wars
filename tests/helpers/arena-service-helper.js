import Service from '@ember/service';

export function mockArenaService() {
  return Service.extend({
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
