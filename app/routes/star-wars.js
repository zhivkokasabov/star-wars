import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      people: this.store.findAll('people'),
      starships: this.store.findAll('starship')
    });
  },

  setupController(controller, model) {
    controller.setProperties(model);
  }
});
