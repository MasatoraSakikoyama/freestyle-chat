/* globals axios */
import {
  MESSAGES,
  CHANGE_MESSAGES,
  PUSH_MESSAGE,
  ADD_MESSAGE,
  GET_MESSAGES,
  CLEAR_MESSAGES,
} from 'store/modules/messages/types';
import { WS, SEND } from 'store/modules/websocket/types';

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
    [ADD_MESSAGE]({ commit }, message) {
      commit(PUSH_MESSAGE, message);
    },
    [GET_MESSAGES]({ dispatch, commit }) {
      const payload = {
        method: 'GET',
        content: null,
      }
      dispatch(`${WS}/${SEND}`, payload, { root: true })
        .then((messages) => {
          commit(CHANGE_MESSAGES, messages);
        });
    },
    [CLEAR_MESSAGES]({ commit }) {
      commit(CHANGE_MESSAGES, []);
    },
  },
};
