import template from './header.html';
import style from './header.css';

export default {
    template: template,
    props: {
        router: {
            type: Object,
            required: true
        },
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        logout() {
            axios.post('/api/session/logout')
                .then(response => {
                    this.$emit('logout');
                    this.router.push({name: 'login'});
                })
                .catch(error => {
                    alert('Logout fail');
                });
        }
    }
}
