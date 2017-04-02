/* globals axios */
import template from './header.html';
import {} from './header.css';

export default {
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
  methods: {
    logout() {
      axios.post('/api/session/logout')
        .then(() => {
          this.$emit('logout');
          this.router.push({ name: 'login' });
        })
        .catch(() => {
          throw new Error('Logout fail');
        });
    },
  },
};
