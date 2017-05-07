/* globals Vue, Vuex */
import infoTemplate from 'components/modal/templates/info.html';
import errorTemplate from 'components/modal/templates/error.html';
import 'components/modal/modal.css';
import * as infoTypes from 'store/modules/info/types';
import * as errorTypes from 'store/modules/error/types';

const params = {
  info: {
    template: infoTemplate,
    ...infoTypes,
  },
  error: {
    template: errorTemplate,
    ...errorTypes,
  },
};

export default (modalType) => {
  const param = params[modalType];
  return Vue.extend({
    template: param.template,
    computed: {
      ...Vuex.mapState(modalType, {
        showModal: param.SHOW_MODAL,
        modal: param.MODAL,
      }),
    },
    methods: {
      ...Vuex.mapActions(modalType, {
        ok: param.OK,
      }),
    },
  });
};
