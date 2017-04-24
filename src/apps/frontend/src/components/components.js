/* globals Vue, Vuex */
import template from './components.html';
import './components.css';
import AppHeader from './header/header';
import AppContents from './contents/contents';
import AppFooter from './footer/footer';
import modalFactory from './common/modal/modal.factory';
import { SESSION, IS_LOGIN } from '../store/modules/session/types';
import * as info from '../store/modules/info/types';
import * as error from '../store/modules/error/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
  },
  components: {
    'app-header': AppHeader,
    'app-contents': AppContents,
    'app-footer': AppFooter,
    'info-modal': modalFactory(info.INFO, info),
    'error-modal': modalFactory(error.ERROR, error),
  },
});
