import template from './form.html';

export default {
    template: template,
    data() {
        return {
            title: ''
        }
    },
    methods: {
        createRoom() {
            if (!this.title) {
                alert('Title must not be empty');
                return;
            }
            axios.post('/api/room/create', {
                    title: this.title,
                    password: null,
                    is_private: false,
                    is_anonymous: true
                })
                .then(response => {
                    this.title = '';
                    this.$emit('create-room', response.data);
                })
                .catch(error => {
                    alert(error.response.data.message);
                });
        }
    }
}
