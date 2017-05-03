/* globals window, WebSocket, Vue, Vuex, axios */
import template from 'components/contents/chat/chat_room/chat.room.html';
import 'components/contents/chat/chat_room/chat.room.css';
import Form from 'components/contents/chat/chat_room/form/form';
import Message from 'components/contents/chat/chat_room/message/message';
import { ROOM, ROOM_ID, GET_ROOM, CLEAR_ROOM } from 'store/modules/room/types';
import { WS, CONNECT_WS, DISCONNECT_WS } from 'store/modules/websocket/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(ROOM, {
      room: ROOM,
      roomId: ROOM_ID,
    }),
  },
  watch: {
    roomId() {
      this.closeRoom();
      this.openRoom();
    },
  },
  components: {
    'chat-room-form': Form,
    'chat-room-message': Message,
  },
  methods: {
    ...Vuex.mapActions(ROOM, {
      getRoom: GET_ROOM,
      clearRoom: CLEAR_ROOM,
    }),
    ...Vuex.mapActions(WS, {
      connectWS: CONNECT_WS,
      disconnectWS: DISCONNECT_WS,
    }),
    openRoom() {
      this.getRoom();
      this.connectWS();
    },
    closeRoom() {
      this.clearRoom();
      this.disconnectWS();
    },
  },
});
