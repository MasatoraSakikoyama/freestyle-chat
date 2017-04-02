/* globals window, WebSocket */
import template from './chat.room.html';
import {} from './chat.room.css';

import chatRoomForm from './form/form';
import chatRoomMessage from './message/message';

const MESSAGE_SIZE = 10;

export default {
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
    };
  },
  components: {
    'chat-room-form': chatRoomForm,
    'chat-room-message': chatRoomMessage,
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
        throw new Error('Chat channel is not open');
      }
      this.ws.send(JSON.stringify({
        method: 'POST',
        content: message,
      }));
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
          if (this.messages.length >= MESSAGE_SIZE) {
            this.messages.shift();
          }
          this.messages.push(data);
        });
      };
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.onopen();
      }
    },
  },
};
