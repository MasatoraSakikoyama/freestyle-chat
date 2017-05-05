/* globals Vue, Vuex */
import template from 'components/components.html';
import 'components/components.css';
import Header from 'components/header/header';
import Menu from 'components/menu/menu';
import Contents from 'components/contents/contents';
import Footer from 'components/footer/footer';
import modalFactory from 'components/modal/modal.factory';
import { SESSION, IS_LOGIN } from 'store/modules/session/types';
import * as info from 'store/modules/info/types';
import * as error from 'store/modules/error/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
  },
  components: {
    'app-header': Header,
    'app-menu': Menu,
    'app-contents': Contents,
    'app-footer': Footer,
    'info-modal': modalFactory(info.INFO, info),
    'error-modal': modalFactory(error.ERROR, error),
  },
});
