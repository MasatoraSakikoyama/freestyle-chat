/* globals axios */
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { IS_LOGIN, CHANGE_LOGIN_STATE, LOGIN_CHECK, LOGIN, LOGOUT } from 'store/modules/session/types';

export default {
  namespaced: true,
  state: {
    [IS_LOGIN]: false,
  },
  mutations: {
    [CHANGE_LOGIN_STATE](state, isLogin) {
      state[IS_LOGIN] = isLogin;
    },
  },
  actions: {
    [LOGIN_CHECK]({ dispatch, commit }) {
      axios.get('/api/session/login')
        .then((response) => {
          commit(CHANGE_LOGIN_STATE, response.data.isLogin);
        })
        .catch(() => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Login Check',
            message: 'Fail get login info',
          }, { root: true });
        });
    },
    [LOGIN]({ dispatch, commit }, payload) {
      axios.post('/api/session/login', {
        user_id: payload.userId,
        password: payload.password,
      })
      .then(() => {
        commit(CHANGE_LOGIN_STATE, true);
        payload.router.push({ name: payload.path });
      })
      .catch((error) => {
        dispatch(`${ERROR}/${OPEN_MODAL}`, {
          title: 'Login',
          message: error.response ? error.response.data.message : 'Fail login',
        }, { root: true });
      });
    },
    [LOGOUT]({ dispatch, commit }, payload) {
      axios.post('/api/session/logout')
        .then(() => {
          commit(CHANGE_LOGIN_STATE, false);
          payload.router.push({ name: payload.path });
        })
        .catch(() => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Logout',
            message: 'Fail logout',
          }, { root: true });
        });
    },
  },
};
