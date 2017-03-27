import router from './router/router.js';
import CSRFConfig from './config/csrf.config.js';

import template from './app.html';

import header from './components/header/header.js';
import contents from './components/contents/contents.js';
import footer from './components/footer/footer.js';

new Vue({
    el: '#app',
    router: router,
    template: template,
    components: {
        'app-header': header,
        'app-contents': contents,
        'app-footer': footer
    },
    created() {
        axios.interceptors.request.use(CSRFConfig);
    }
});
