/* globals Vue */
import template from './contents.html';

export default Vue.extend({
  template,
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    login() {
      this.$emit('login');
    },
    error(event) {
      this.$emit('error', event);
    },
  },
});
