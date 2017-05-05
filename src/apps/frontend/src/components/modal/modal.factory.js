/* globals Vue, Vuex */
import info from 'components/modal/templates/info.html';
import error from 'components/modal/templates/error.html';
import 'components/modal/modal.css';

const templates = { info, error };

export default (modalType, props) => {
  const template = templates[modalType];
  return Vue.extend({
    template,
    computed: {
      ...Vuex.mapState(modalType, {
        showModal: props.SHOW_MODAL,
        modal: props.MODAL,
      }),
    },
    methods: {
      ...Vuex.mapActions(modalType, {
        ok: props.OK,
      }),
    },
  });
};
