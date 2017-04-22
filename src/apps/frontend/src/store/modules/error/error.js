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
  getters: {},
  mutations: {
    [CHANGE_SHOW_MODAL](state, payload) {
      state[SHOW_MODAL] = payload.showModal;
    },
    [CHANGE_MODAL](state, payload) {
      state[MODAL].title = payload.title;
      state[MODAL].message = payload.message;
    },
  },
  actions: {
    [OPEN_MODAL]({ commit }, modal) {
      commit(CHANGE_MODAL, modal);
      commit(CHANGE_SHOW_MODAL, { showModal: true });
    },
    [OK]({ commit }) {
      commit(CHANGE_SHOW_MODAL, { showModal: false });
    },
  },
};
