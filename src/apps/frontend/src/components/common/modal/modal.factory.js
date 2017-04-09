/* globals Vue */
import info from './templates/info.html';
import error from './templates/error.html';
import {} from './modal.css';

const templates = { info, error };

export default (modalType) => {
  const template = templates[modalType];
  return  Vue.extend({
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
};
