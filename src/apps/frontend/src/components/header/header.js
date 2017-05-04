/* globals Vue, Vuex */
import template from 'components/header/header.html';
import 'components/header/header.css';
import { SESSION, IS_LOGIN, LOGOUT } from 'store/modules/session/types';
import { MENU, IS_OPEN, MENU_OPEN, MENU_CLOSE } from 'store/modules/menu/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
    ...Vuex.mapState(MENU, {
      isOpen: IS_OPEN,
    }),
  },
  methods: {
    ...Vuex.mapActions(SESSION, {
      logout: LOGOUT,
    }),
    ...Vuex.mapActions(MENU, {
      menuOpen: MENU_OPEN,
      menuClose: MENU_CLOSE,
    }),
    onLogout() {
      this.logout({
        router: this.$router,
        path: 'login',
      });
    },
    onToggleMenu() {
      if (this.isOpen) {
        this.menuClose();
      } else {
        this.menuOpen();
      }
    },
  },
});
