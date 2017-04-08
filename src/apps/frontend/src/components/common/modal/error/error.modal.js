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
    modal: {
      type: Object,
      default: {
        title: 'title',
        message: 'message',
      },
    },
  },
  methods: {
    ok() {
      this.$emit('ok');
    },
  },
});
