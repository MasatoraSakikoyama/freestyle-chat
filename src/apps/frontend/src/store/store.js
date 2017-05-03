/* globals Vue, Vuex */
import createLogger from 'vuex/dist/logger';
import info from './modules/info/info';
import error from './modules/error/error';
import session from './modules/session/session';
import room from './modules/room/room';
import websocket from './modules/websocket/websocket';

export default class AppStore extends Vuex.Store {
  constructor(debug) {
    Vue.use(Vuex);
    super({
      state: {},
      getters: {},
      actions: {},
      mutations: {},
      modules: {
        info,
        error,
        session,
        room,
        websocket,
      },
      strict: debug,
      plugins: debug ? [createLogger()] : [],
    });
  }
}
