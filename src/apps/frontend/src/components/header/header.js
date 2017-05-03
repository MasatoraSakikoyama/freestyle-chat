/* globals Vue, Vuex */
import template from 'components/header/header.html';
import 'components/header/header.css';
import { SESSION, IS_LOGIN, LOGOUT } from 'store/modules/session/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
  },
  methods: {
    ...Vuex.mapActions(SESSION, {
      logout: LOGOUT,
    }),
    onLogout() {
      this.logout()
        .then(() => {
          this.$router.push({ name: 'login' });
        });
    },
  },
});
