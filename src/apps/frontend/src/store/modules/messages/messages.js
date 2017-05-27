/* globals axios */
import {
  MESSAGES,
  CHANGE_MESSAGES,
  PUSH_MESSAGE,
  ADD_MESSAGE,
  GET_MESSAGES,
  CLEAR_MESSAGES,
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
    [ADD_MESSAGE]({ commit }, message) {
      commit(PUSH_MESSAGE, message);
    },
    [GET_MESSAGES]({ dispatch, commit }, payload) {
      axios.get(`/api/messages/${payload.roomId}`)
        .then((response) => {
          const messages = response.data.map((message) => {
            message.created_at = new Date(message.created_at).toLocaleString();
            message.modified_at = new Date(message.modified_at).toLocaleString();
            return message;
          });
          commit(CHANGE_MESSAGES, messages);
        })
        .catch((event) => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Messages',
            message: 'Fail get data',
          }, { root: true });
        });
    },
    [CLEAR_MESSAGES]({ commit }) {
      commit(CHANGE_MESSAGES, []);
    },
  },
};
