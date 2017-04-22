/* globals Vue, Vuex */
import createLogger from 'vuex/dist/logger';
import error from './modules/error/error';
import session from './modules/session/session';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default class AppStore extends Vuex.Store {
  constructor() {
    super({
      state: {
      },
      getters: {
      },
      actions: {
      },
      mutations: {
      },
      modules: {
        error,
        session,
      },
      strict: debug,
      plugins: debug ? [createLogger()] : [],
    });
  }
}
