import template from './app.html';
import style from './app.css';
import header from './components/header/header.js';
import contents from './components/contents/contents.js';
import footer from './components/footer/footer.js';
import CSRFConfig from './config/csrf.config.js';

window.application = new Vue({
    el: '#app',
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
