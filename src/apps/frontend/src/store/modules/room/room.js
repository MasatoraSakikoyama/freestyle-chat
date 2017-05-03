/* globals axios */
import {
  ROOM,
  ROOM_ID,
  CHANGE_ROOM,
  CHANGE_ROOM_ID,
  PUSH_MESSAGE,
  SELECT_ROOM_ID,
  DESELECT_ROOM_ID,
  GET_ROOM,
  CLEAR_ROOM,
  UPDATE_MESSAGES,
} from 'store/modules/room/types';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';

export default {
  namespaced: true,
  state: {
    [ROOM]: null,
    [ROOM_ID]: null,
  },
  mutations: {
    [CHANGE_ROOM](state, room) {
      state[ROOM] = room;
    },
    [CHANGE_ROOM_ID](state, roomId) {
      state[ROOM_ID] = roomId;
    },
    [PUSH_MESSAGE](state, message) {
      // const messages = root[ROOM].messages;
      // if (messages.length >= 10) {
      //   messages.shift();
      // }
      state[ROOM].messages.push(message);
    },
  },
  actions: {
    [SELECT_ROOM_ID]({ commit, state }, roomId) {
      if (state[ROOM_ID] !== roomId) {
        commit(CHANGE_ROOM_ID, roomId);
      }
    },
    [DESELECT_ROOM_ID]({ commit }) {
      commit(CHANGE_ROOM_ID, null);
    },
    [GET_ROOM]({ dispatch, commit, state }) {
      const roomId = state[ROOM_ID];
      if (!roomId) {
        return;
      }
      axios.get(`/api/room/${roomId}`)
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
            message: 'Fail connect',
          }, { root: true });
        });
    },
    [CLEAR_ROOM]({ commit }) {
      commit(CHANGE_ROOM, null);
    },
    [UPDATE_MESSAGES]({ commit, state }, message) {
      commit(PUSH_MESSAGE, message);
    },
  },
};
