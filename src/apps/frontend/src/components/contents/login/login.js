import template from './login.html';

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
    data() {
        return {
            userId: '',
            password: ''
        }
    },
    methods: {
        login(event) {
            if (!this.userId || !this.password) {
                alert('User Id or Password must not be empty');
                return
            }
            axios.post('/api/session/login', {
                    user_id: this.userId,
                    password: this.password
                })
                .then(response => {
                    this.$emit('login');
                    this.router.push({name: 'home'});
                })
                .catch(error => {
                    alert(error.response.data.message);
            });
        }
    },
    created() {
        if (this.isLogin) {
            this.$destroy();
        }
    }
}
