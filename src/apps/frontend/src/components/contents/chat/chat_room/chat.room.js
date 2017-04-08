/* globals window, WebSocket, Vue */
import template from './chat.room.html';
import {} from './chat.room.css';

import Form from './form/form';
import Message from './message/message';

export default Vue.extend({
  template,
  props: {
    selectedRoom: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      messages: [],
      ws: {},
      sendSuccess: false,
    };
  },
  components: {
    'chat-room-form': Form,
    'chat-room-message': Message,
  },
  watch: {
    selectedRoom() {
      this.messages = [];
      this.wsFlush();
      if (this.selectedRoom) {
        this.connectWS();
      }
    },
  },
  methods: {
    sendMessage(message) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.$emit('error', {
          title: 'Message',
          message: 'Chat Room is not open',
        });
      } else {
        this.ws.send(JSON.stringify({
          method: 'POST',
          content: message,
        }));
        this.sendSuccess = true;
      }
    },
    closeRoom() {
      this.messages = [];
      this.wsFlush();
      this.$emit('deselect-room', this.selectedRoom);
    },
    wsFlush() {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
    },
    connectWS() {
      this.ws = new WebSocket(`ws://${window.location.host}/api/chat/${this.selectedRoom}`);
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({ method: 'GET' }));
      };
      this.ws.onmessage = (event) => {
        JSON.parse(event.data).forEach((data) => {
          // if (this.messages.length >= 10) {
          //   this.messages.shift();
          // }
          this.messages.push(data);
        });
      };
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.onopen();
      }
    },
    resetFlag() {
      this.sendSuccess = false;
    },
  },
});
