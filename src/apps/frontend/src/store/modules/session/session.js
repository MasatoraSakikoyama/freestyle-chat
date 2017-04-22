/* globals axios */
import { IS_LOGIN, CHANGE_LOGIN_STATE, LOGIN_CHECK, LOGIN, LOGOUT } from './types';
import { ERROR, OPEN_MODAL } from '../error/types';

export default {
  namespaced: true,
  state: {
    [IS_LOGIN]: false,
  },
  mutations: {
    [CHANGE_LOGIN_STATE](state, payload) {
      state[IS_LOGIN] = payload.isLogin;
    },
  },
  actions: {
    [LOGIN_CHECK]({ commit }) {
      axios.get('/api/session/login')
        .then((response) => {
          commit(CHANGE_LOGIN_STATE, { isLogin: response.data.isLogin });
        })
        .catch((error) => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Login Check',
            message: 'Fail get login info',
          }, { root: true });
        });
    },
    [LOGIN]({ dispatch, commit }, user) {
      axios.post('/api/session/login', {
        user_id: user.userId,
        password: user.password,
      })
      .then(() => {
        commit(CHANGE_LOGIN_STATE, { isLogin: true });
      })
      .catch((error) => {
        dispatch(`${ERROR}/${OPEN_MODAL}`, {
          title: 'Login',
          message: error.response.data.message,
        }, { root: true });
      });
    },
    [LOGOUT]({ dispatch, commit }) {
      axios.post('/api/session/logout')
        .then(() => {
          commit(CHANGE_LOGIN_STATE, { isLogin: false });
        })
        .catch((error) => {
          dispatch(`${ERROR}/${OPEN_MODAL}`, {
            title: 'Logout',
            message: 'Fail logout',
          }, { root: true });
        });
    },
  },
};
