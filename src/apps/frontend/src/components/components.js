/* globals window, Vue, axios */
import template from './components.html';

import AppHeader from './header/header';
import AppContents from './contents/contents';
import AppFooter from './footer/footer';
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
      showModal: false,
      modalMessage: '',
    };
  },
  components: {
    'app-header': AppHeader,
    'app-contents': AppContents,
    'app-footer': AppFooter,
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
    error(event) {
      this.modalMessage = event.message;
      this.showModal = true;
    },
  },
  created() {
    this.$on('error', this.error);
    axios.get('/api/session/login')
      .then((response) => {
        this.isLogin = response.data.isLogin;
      })
      .catch(() => {
        this.$emit('error', new Error('Fail get Login info'));
      });
  },
});
