/* globals Vue, axios */
import template from './login.html';

export default Vue.extend({
  template,
  props: {
    router: {
      type: Object,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userId: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (!this.userId || !this.password) {
        throw new Error('User Id or Password must not be empty');
      }
      axios.post('/api/session/login', {
        user_id: this.userId,
        password: this.password,
      })
      .then(() => {
        this.$emit('login');
        this.router.push({ name: 'home' });
      })
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
    },
  },
  created() {
    if (this.isLogin) {
      this.$destroy();
    }
  },
});
