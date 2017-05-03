/* globals window, WebSocket */
import { INFO } from 'store/modules/info/types';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { ROOM, ROOM_ID, UPDATE_MESSAGES } from 'store/modules/room/types';
import { WS, CHANGE_WS, CONNECT_WS, DISCONNECT_WS, SEND } from 'store/modules/websocket/types';

export default {
  namespaced: true,
  state: {
    [WS]: null,
  },
  mutations: {
    [CHANGE_WS](state, ws) {
      state[WS] = ws;
    },
  },
  actions: {
    [CONNECT_WS]({ dispatch, commit, rootState }) {
      const roomId = rootState[ROOM][ROOM_ID];
      if (!roomId) {
        return;
      }
      const ws = new WebSocket(`ws://${window.location.host}/api/chat/${roomId}`);
      ws.onopen = () => {
        dispatch(`${INFO}/${OPEN_MODAL}`, {
          title: 'Message',
          message: `Chat room ${roomId} is open`,
        }, { root: true });
      };
      ws.onmessage = (event) => {
        JSON.parse(event.data).forEach((message) => {
          const date = new Date(message.modified_at);
          message.modified_at = date.toLocaleString();
          dispatch(`${ROOM}/${UPDATE_MESSAGES}`, message, { root: true });
        });
      };
      if (ws.readyState === WebSocket.OPEN) {
        ws.onopen();
      }
      commit(CHANGE_WS, ws);
    },
    [DISCONNECT_WS]({ commit, state }) {
      const ws = state[WS];
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      commit(CHANGE_WS, null);
    },
    [SEND]({ dispatch, state }, message) {
      const ws = state[WS];
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        dispatch(`${ERROR}/${OPEN_MODAL}`, {
          title: 'Message',
          message: 'Chat room is not open',
        }, { root: true });
      } else {
        ws.send(JSON.stringify({
          method: 'POST',
          content: message,
        }));
      }
    },
  },
};
