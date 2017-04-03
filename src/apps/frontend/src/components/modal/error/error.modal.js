/* globals Vue */
import template from './error.modal.html';
import {} from './error.modal.css';

export default Vue.extend({
  template,
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    modalMessage: {
      type: String,
      default: 'this is modal',
    },
  },
  methods: {
    ok() {
      this.$emit('ok');
    }
  },
});
