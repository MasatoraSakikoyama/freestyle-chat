import template from './message.html';

export default {
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
};
