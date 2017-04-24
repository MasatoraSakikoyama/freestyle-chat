/* globals axios */
import { SHOW_MODAL, MODAL, CHANGE_SHOW_MODAL, CHANGE_MODAL, OPEN_MODAL, OK } from './types';

export default {
  namespaced: true,
  state: {
    [SHOW_MODAL]: false,
    [MODAL]: {
      title: 'title',
      message: 'message',
    },
  },
  mutations: {
    [CHANGE_SHOW_MODAL](state, showModal) {
      state[SHOW_MODAL] = showModal;
    },
    [CHANGE_MODAL](state, modal) {
      state[MODAL] = modal;
    },
  },
  actions: {
    [OPEN_MODAL]({ commit }, modal) {
      commit(CHANGE_MODAL, modal);
      commit(CHANGE_SHOW_MODAL, true);
    },
    [OK]({ commit }) {
      commit(CHANGE_SHOW_MODAL, false);
    },
  },
};
