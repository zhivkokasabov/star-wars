import { mockArenaService } from './arena-service-helper';
import EmberObject from '@ember/object';

var arenaStub = mockArenaService();

export function setupPeople() {
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
        leftOpponent:
          EmberObject.create(leftOpponent),
        rightOpponent:
          EmberObject.create(rightOpponent)
      });
    },
    setupArenaService: function (context) {
      context.owner.register('service:arena-results-service', arenaStub);
    }
  }
}
