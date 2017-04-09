/* globals window, WebSocket, Vue, axios */
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
      room: {},
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
      this.room = {};
      this.wsFlush();
      this.openRoom(this.selectedRoom);
    },
  },
  methods: {
    openRoom(roomId) {
      if (roomId) {
        axios.get(`/api/room/${roomId}`)
          .then((response) => {
            this.room = response.data;
            this.room.messages = this.room.messages.map((message) => {
              const m = message;
              const date = new Date(m.modified_at);
              m.modified_at = date.toLocaleString();
              return m;
            });
            this.connectWS();
          })
          .catch(() => {
            this.$emit('error', {
              title: 'Room',
              message: 'Fail get Room',
            });
          });
      }
    },
    closeRoom() {
      this.room = {};
      this.wsFlush();
      this.$emit('deselect-room', this.selectedRoom);
    },
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
    wsFlush() {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
    },
    connectWS() {
      this.ws = new WebSocket(`ws://${window.location.host}/api/chat/${this.selectedRoom}`);
      this.ws.onmessage = (event) => {
        JSON.parse(event.data).forEach((message) => {
          // if (this.messages.length >= 10) {
          //   this.messages.shift();
          // }
          const m = message;
          const date = new Date(m.modified_at);
          m.modified_at = date.toLocaleString();
          this.room.messages.push(m);
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
