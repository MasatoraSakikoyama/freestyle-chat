/* globals Vue, axios */
import template from './header.html';
import {} from './header.css';

export default Vue.extend({
  template,
  props: {
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
        })
        .catch(() => {
          this.$emit('error', new Error('Logout fail'));
        });
    },
  },
});
