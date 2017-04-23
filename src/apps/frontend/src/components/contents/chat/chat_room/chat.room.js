/* globals window, WebSocket, Vue, axios */
import template from './chat.room.html';
import {} from './chat.room.css';
import Form from './form/form';
import Message from './message/message';
import { ERROR, OPEN_MODAL } from '../../../../store/modules/error/types';
import { ROOM, ROOM_ID } from '../../../../store/modules/room/types';

export default Vue.extend({
  template,
  data() {
    return {
      room: {},
      ws: {},
      sendSuccess: false,
    };
  },
  computed: {
    ...Vuex.mapState(ROOM, {
      roomId: ROOM_ID,
    }),
  },
  watch: {
    roomId() {
      this.room = {};
      this.wsFlush();
      this.connectRoom(this.roomId);
    },
  },
  components: {
    'chat-room-form': Form,
    'chat-room-message': Message,
  },
  methods: {
    ...Vuex.mapActions(ERROR, {
      openModal: OPEN_MODAL,
    }),
    connectRoom(roomId) {
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
            this.openModal({
              title: 'Room',
              message: 'Fail connect',
            });
          });
      }
    },
    disconnectRoom() {
      this.room = {};
      this.wsFlush();
    },
    sendMessage(message) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.openModal({
          title: 'Message',
          message: 'Chat room is not open',
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
      this.ws = new WebSocket(`ws://${window.location.host}/api/chat/${this.roomId}`);
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
