/* globals */
import { MENU, IS_OPEN, CHANGE_IS_OPEN, MENU_OPEN, MENU_CLOSE } from 'store/modules/menu/types';

export default {
  namespaced: true,
  state: {
    [IS_OPEN]: true,
  },
  mutations: {
    [CHANGE_IS_OPEN](state, isOpen) {
      state[IS_OPEN] = isOpen;
    },
  },
  actions: {
    [MENU_OPEN]({ commit }) {
      commit(CHANGE_IS_OPEN, true);
    },
    [MENU_CLOSE]({ commit }) {
      commit(CHANGE_IS_OPEN, false);
    },
  },
}
