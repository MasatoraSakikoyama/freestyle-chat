/* globals window, WebSocket */
import { INFO } from 'store/modules/info/types';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { WS, CHANGE_WS, CONNECT_WS, DISCONNECT_WS, SEND } from 'store/modules/websocket/types';

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
      //ws.onmessage = (event) => {
      //  console.log('##########');
      //  return JSON.parse(event.data).map((message) => {
      //    const date = new Date(message.modified_at);
      //    message.modified_at = date.toLocaleString();
//    //      dispatch(`${MESSAGES}/${UPDATE_MESSAGES}`, message, { root: true });
      //    return message
      //  });
      //};
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
          message: 'Fail send message',
        }, { root: true });
      } else {
        return ws.send(JSON.stringify({
          method: payload.method,
          content: payload.message,
        }))
          .then((event) => {
            console.log('$$$$$$$$$$');
            return JSON.parse(event.data).map((message) => {
              const date = new Date(message.modified_at);
              message.modified_at = date.toLocaleString();
              return message
            });
          })
          .catch(() => {
            dispatch(`${ERROR}/${OPEN_MODAL}`, {
              title: 'Message',
              message: 'Fail get message',
            }, { root: true });
          });
      }
    },
  },
};
