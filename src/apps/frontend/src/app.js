import router from './router/router.js';
import CSRFConfig from './config/csrf.config.js';

import template from './app.html';
import style from './app.css';

import header from './components/header/header.js';
import contents from './components/contents/contents.js';
import footer from './components/footer/footer.js';

new Vue({
    el: '#app',
    router: router,
    template: template,
    data: {
        router: router,
        isLogin: false
    },
    components: {
        'app-header': header,
        'app-contents': contents,
        'app-footer': footer
    },
    methods: {
        login() {
            this.isLogin = true;
        },
        logout() {
            this.isLogin = false;
        }
    },
    created() {
        axios.interceptors.request.use(CSRFConfig);
        axios.get('/api/session/login')
            .then(response => {
                this.isLogin = response.data.isLogin;
            })
            .catch(error => {
                alert('Fail get Login info');
            });
    }
});
