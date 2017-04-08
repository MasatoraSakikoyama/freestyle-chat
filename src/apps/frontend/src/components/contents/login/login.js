/* globals Vue, axios */
import template from './login.html';

import factory from '../../common/input/component.factory';

export default Vue.extend({
  template,
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userId: {
        key: 'UserId',
        value: '',
        isValid: false,
        rules: [
          { name: 'NotEmpty', },
          { name: 'MaxLength', param: 255, },
        ],
      },
      password: {
        key: 'Password',
        value: '',
        isValid: false,
        rules: [
          { name: 'NotEmpty', },
        ],
      },
    };
  },
  computed: {
    isValid() {
      return (this.userId.isValid && this.password.isValid);
    },
  },
  components: {
    'text-input': factory('text'),
    'password-input': factory('password'),
  },
  methods: {
    login() {
      if (!this.isValid) {
        return;
      }
      axios.post('/api/session/login', {
        user_id: this.userId.value,
        password: this.password.value,
      })
      .then(() => {
        this.$emit('login');
      })
      .catch((error) => {
        this.$emit('error', {
          title: 'Login',
          message: error.response.data.message,
        });
      });
    },
  },
  created() {
    if (this.isLogin) {
      this.$destroy();
    }
  },
});
