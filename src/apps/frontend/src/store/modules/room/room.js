/* globals axios */
import {
  ROOM,
  CHANGE_ROOM,
  GET_ROOM,
  CLEAR_ROOM,
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
  },
  actions: {
    [GET_ROOM]({ dispatch, commit, state }, payload) {
      axios.get(`/api/room/${payload.roomId}`)
        .then((response) => {
          commit(CHANGE_ROOM, response.data);
        })
        .catch(() => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Room',
            message: 'Fail get data',
          }, { root: true });
        });
    },
    [CLEAR_ROOM]({ commit }) {
      commit(CHANGE_ROOM, {});
    },
  },
};
