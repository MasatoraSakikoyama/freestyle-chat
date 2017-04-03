/* globals window, Vue, axios */
import AppRouter from './router/router';
import CSRFConfig from './config/csrf.config';

import template from './app.html';
import {} from './app.css';

import AppComponents from './components/components';

Vue.use(AppRouter);
const router = new AppRouter();
window.application = new Vue({
  el: '#app',
  router,
  template,
  data: {
    router,
  },
  components: {
    'app-components': AppComponents,
  },
  created() {
    axios.interceptors.request.use(CSRFConfig);
  },
});
