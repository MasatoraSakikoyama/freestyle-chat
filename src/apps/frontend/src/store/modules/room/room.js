/* globals axios */
import { ROOM_ID, CHANGE_ROOM_ID, SELECT_ROOM, DESELECT_ROOM } from './types';

export default {
  namespaced: true,
  state: {
    [ROOM_ID]: null,
  },
  mutations: {
    [CHANGE_ROOM_ID](state, payload) {
      state[ROOM_ID] = payload.roomId;
    },
  },
  actions: {
    [SELECT_ROOM]({ commit, state }, roomId) {
      if (state[ROOM_ID] !== roomId) {
        commit(CHANGE_ROOM_ID, { roomId });
      }
    },
    [DESELECT_ROOM]({ commit, state }, roomId) {
      if (state[ROOM_ID] === roomId) {
        commit(CHANGE_ROOM_ID, { roomId: null });
      }
    },
  },
};
