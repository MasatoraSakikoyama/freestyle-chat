/* globals axios */
import {
  ROOM,
  CHANGE_ROOM,
  PUSH_MESSAGE,
  GET_ROOM,
  CLEAR_ROOM,
  UPDATE_MESSAGES,
} from 'store/modules/room/types';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';

export default {
  namespaced: true,
  state: {
    [ROOM]: {},
  },
  mutations: {
    [CHANGE_ROOM](state, room) {
      state[ROOM] = room;
    },
    [PUSH_MESSAGE](state, message) {
      state[ROOM].messages.push(message);
    },
  },
  actions: {
    [GET_ROOM]({ dispatch, commit, state }, payload) {
      axios.get(`/api/room/${payload.roomId}`)
        .then((response) => {
          const room = response.data;
          room.messages = room.messages.map((message) => {
            const date = new Date(message.modified_at);
            message.modified_at = date.toLocaleString();
            return message;
          });
          commit(CHANGE_ROOM, room);
        })
        .catch(() => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Room',
            message: 'Fail get data',
          }, { root: true });
        });
    },
    [CLEAR_ROOM]({ commit, state }, payload) {
      if (state[ROOM].room_id === payload.roomId) {
        commit(CHANGE_ROOM, {});
      }
    },
    [UPDATE_MESSAGES]({ commit, state }, message) {
      commit(PUSH_MESSAGE, message);
    },
  },
};
