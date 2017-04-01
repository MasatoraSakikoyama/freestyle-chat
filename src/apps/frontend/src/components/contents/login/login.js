import template from './login.html';

export default {
    template: template,
    data() {
        return {
            userId: '',
            password: ''
        }
    },
    methods: {
        loginExecute(event) {
            if (!this.userId || !this.password) {
                alert('User Id or Password must not be empty');
                return
            }
            axios.post('/api/session/login', {
                    user_id: this.userId,
                    password: this.password
                })
                .then(response => {
                    this.$emit('change-view', {
                        name: 'login',
                        data: response.data
                    });
                })
                .catch(error => {
                    alert(error.response.data.message);
            });
        }
    }
}
