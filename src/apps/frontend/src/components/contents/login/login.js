/* globals Vue, Vuex */
import template from 'components/contents/login/login.html';
import inputFactory from 'components/common/input/component.factory';
import { SESSION, IS_LOGIN, LOGIN } from 'store/modules/session/types';

export default Vue.extend({
  template,
  data() {
    return {
      userId: {
        key: 'UserId',
        value: '',
        isValid: false,
        rules: [
          { name: 'NotEmpty' },
          { name: 'MaxLength', param: 255 },
        ],
      },
      password: {
        key: 'Password',
        value: '',
        isValid: false,
        rules: [
          { name: 'NotEmpty' },
        ],
      },
    };
  },
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
  },
  components: {
    'text-input': inputFactory('text'),
    'password-input': inputFactory('password'),
  },
  methods: {
    ...Vuex.mapActions(SESSION, {
      login: LOGIN,
    }),
    onLogin() {
      if (!(this.userId.isValid && this.password.isValid)) {
        return;
      }
      this.login({
        userId: this.userId.value,
        password: this.password.value,
      })
      .then(() => {
        this.$router.push({ name: 'home' });
      });
    },
  },
});
