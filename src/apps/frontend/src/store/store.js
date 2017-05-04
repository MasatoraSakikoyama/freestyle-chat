/* globals Vue, Vuex */
import createLogger from 'vuex/dist/logger';
import info from 'store/modules/info/info';
import error from 'store/modules/error/error';
import session from 'store/modules/session/session';
import menu from 'store/modules/menu/menu';
import room from 'store/modules/room/room';
import websocket from 'store/modules/websocket/websocket';

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
        menu,
        room,
        websocket,
      },
      strict: debug,
      plugins: debug ? [createLogger()] : [],
    });
  }
}
