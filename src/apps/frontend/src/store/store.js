/* globals Vue, Vuex */
import createLogger from 'vuex/dist/logger';
import info from './modules/info/info';
import error from './modules/error/error';
import session from './modules/session/session';
import room from './modules/room/room';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default class AppStore extends Vuex.Store {
  constructor() {
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
      },
      strict: debug,
      plugins: debug ? [createLogger()] : [],
    });
  }
}
