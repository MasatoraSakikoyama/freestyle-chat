/* globals window, WebSocket */
import { INFO } from 'store/modules/info/types';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { WS, CHANGE_WS, CONNECT_WS, DISCONNECT_WS, SEND } from 'store/modules/websocket/types';
import { MESSAGES, ADD_MESSAGE } from 'store/modules/messages/types';

export default {
  namespaced: true,
  state: {
    [WS]: {},
  },
  mutations: {
    [CHANGE_WS](state, ws) {
      state[WS] = ws;
    },
  },
  actions: {
    [CONNECT_WS]({ dispatch, commit }, payload) {
      const ws = new WebSocket(`ws://${window.location.host}/api/chat/${payload.roomId}`);

      ws.onopen = () => {
        dispatch(`${INFO}/${OPEN_MODAL}`, {
          title: 'Room',
          message: `Chat room ${payload.roomId} is open`,
        }, { root: true });
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        message.modified_at = new Date(message.modified_at).toLocaleString();
        dispatch(`${MESSAGES}/${ADD_MESSAGE}`, message, { root: true });
      };

      ws.onerror = () => {
        dispatch(`${ERROR}/${OPEN_MODAL}`, {
          title: 'Room',
          message: `Chat room ${payload.roomId} is error`,
        }, { root: true });
      };

      ws.oncloase = () => {
        dispatch(`${INFO}/${OPEN_MODAL}`, {
          title: 'Room',
          message: `Chat room ${payload.roomId} is cloase`,
        }, { root: true });
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
      commit(CHANGE_WS, {});
    },
    [SEND]({ dispatch, state }, payload) {
      const ws = state[WS];
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        dispatch(`${ERROR}/${OPEN_MODAL}`, {
          title: 'Message',
          message: 'Websocket is not ready',
        }, { root: true });
      } else {
        ws.send(JSON.stringify(payload));
      }
    },
  },
};
