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
    [LOGIN]({ dispatch, commit }, user) {
      axios.post('/api/session/login', {
        user_id: user.userId,
        password: user.password,
      })
      .then(() => {
        commit(CHANGE_LOGIN_STATE, true);
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
          commit(CHANGE_LOGIN_STATE, false);
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
