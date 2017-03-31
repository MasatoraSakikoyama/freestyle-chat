import template from './form.html';

export default {
    template: template,
    data() {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage() {
            if (!this.message) {
                alert('Message must not be empty');
                return
            }
            this.$emit('send-message', this.message);
            this.$nextTick(() => {
                this.message = '';
            });
        },
        closeRoom() {
            this.$emit('close-room');
        }
    }
}
