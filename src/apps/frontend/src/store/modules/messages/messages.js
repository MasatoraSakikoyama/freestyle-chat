/* globals axios */
import {
  MESSAGES,
  CHANGE_MESSAGES,
  PUSH_MESSAGE,
  GET_MESSAGES,
  POST_MESSAGES,
  UPDATE_MESSAGES,
  DELETE_MESSAGES,
  CLEAR_MESSAGES,
} from 'store/modules/messages/types';
import { WS, SEND } from 'store/modules/websocket/types';
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
    [GET_MESSAGES]({ dispatch, commit }) {
      const payload = {
        message: null,
        method: 'GET',
      }
      const messages = dispatch(`${WS}/${SEND}`, payload, { root: true });
      commit(CHANGE_MESSAGES, messages);
    },
    [POST_MESSAGES]({ dispatch, commit }, message) {
      const payload = {
        message: message,
        method: 'POST',
      }
      const messages = dispatch(`${WS}/${SEND}`, payload, { root: true });
      commit(PUSH_MESSAGE, messages[0]);
    },
    [UPDATE_MESSAGES]({ dispatch, commit }, message) {
      const payload = {
        message: message,
        method: 'PUT',
      }
      const messages = dispatch(`${WS}/${SEND}`, payload, { root: true });
      commit(PUSH_MESSAGE, messages[0]);
    },
    [DELETE_MESSAGES]({ dispatch, commit }, message) {
      const payload = {
        message: message,
        method: 'DELETE',
      }
      const messages = dispatch(`${WS}/${SEND}`, payload, { root: true });
      commit(PUSH_MESSAGES, messages[0]);
    },
    [CLEAR_MESSAGES]({ commit }) {
      commit(CHANGE_MESSAGES, []);
    },
  },
};
