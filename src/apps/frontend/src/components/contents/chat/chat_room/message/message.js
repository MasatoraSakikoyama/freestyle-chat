/* globals Vue */
import template from './message.html';
import './message.css';

export default Vue.extend({
  template,
  props: {
    message: {
      type: Object,
      defaut: {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    number() {
      return (this.index + 1);
    },
  },
});
