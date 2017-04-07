/* globals window, Vue, axios */
import template from './components.html';

import AppHeader from './header/header';
import AppContents from './contents/contents';
import AppFooter from './footer/footer';
import InfoModal from './modal/information/info.modal';
import ErrorModal from './modal/error/error.modal';

export default Vue.extend({
  template,
  props: {
    router: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLogin: false,
      showInfoModal: false,
      showErrorModal: false,
      modal: {},
    };
  },
  components: {
    'app-header': AppHeader,
    'app-contents': AppContents,
    'app-footer': AppFooter,
    'info-modal': InfoModal,
    'error-modal': ErrorModal,
  },
  methods: {
    login() {
      this.isLogin = true;
      this.router.push({ name: 'home' });
    },
    logout() {
      this.isLogin = false;
      this.router.push({ name: 'login' });
    },
    ok() {
      this.showModal = false;
    },
    info(event) {
      this.modal = event;
      this.showInfoModal = true;
    },
    error(event) {
      this.modal = event;
      this.showErrorModal = true;
    },
  },
  created() {
    this.$on('error', this.error);
    axios.get('/api/session/login')
      .then((response) => {
        this.isLogin = response.data.isLogin;
      })
      .catch(() => {
        this.$emit('error', {
          title: 'Login',
          message: 'Fail get Login info',
        });
      });
  },
});
