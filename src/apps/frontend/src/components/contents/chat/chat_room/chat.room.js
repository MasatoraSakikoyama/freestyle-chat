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
      if (this.selectedRoom) {
        this.openRoom();
      }
    },
  },
  methods: {
    openRoom(roomId) {
      axios.get(`/api/room/${this.selectedRoom}`)
        .then((response) => {
          this.room = response.data;
          this.connectWS();
        })
        .catch(() => {
          this.$emit('error', {
            title: 'Room',
            message: 'Fail get Room',
          });
        });
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
        JSON.parse(event.data).forEach((data) => {
          // if (this.messages.length >= 10) {
          //   this.messages.shift();
          // }
          this.room.messages.push(data);
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
