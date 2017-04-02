import template from './form.html';

export default {
  template,
  data() {
    return {
      message: '',
    };
  },
  methods: {
    sendMessage() {
      if (!this.message) {
        throw new Error('Message must not be empty');
      }
      this.$emit('send-message', this.message);
      this.$nextTick(() => {
        this.message = '';
      });
    },
    closeRoom() {
      this.$emit('close-room');
    },
  },
};
