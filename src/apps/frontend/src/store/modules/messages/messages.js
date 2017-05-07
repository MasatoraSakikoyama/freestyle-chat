/* globals axios */
import {
  MESSAGES,
  CHANGE_MESSAGES,
  PUSH_MESSAGE,
  GET_MESSAGES,
  CLEAR_MESSAGES,
  UPDATE_MESSAGES,
} from 'store/modules/messages/types';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';

export default {
  namespaced: true,
  state: {
    [MESSAGES]: [],
  },
  mutations: {
    [CHANGE_MESSAGES](state, messages) {
      state[MESSAGES] = messages;
    },
    [PUSH_MESSAGE](state, message) {
      state[MESSAGES].push(message);
    },
  },
  actions: {
    [GET_MESSAGES]({ dispatch, commit, state }, payload) {
      // wsで取得
      commit(CHANGE_MESSAGES, []);
    },
    [CLEAR_MESSAGES]({ commit }) {
      commit(CHANGE_MESSAGES, []);
    },
    [UPDATE_MESSAGES]({ commit, state }, message) {
      commit(PUSH_MESSAGE, message);
    },
  },
};
