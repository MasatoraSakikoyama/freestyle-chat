/* globals window, WebSocket, Vue, Vuex, axios */
import template from 'components/contents/chat/chat.html';
import 'components/contents/chat/chat.css';
import Form from 'components/contents/chat/form/form';
import Message from 'components/contents/chat/message/message';
import { ROOM, GET_ROOM, CLEAR_ROOM } from 'store/modules/room/types';
import { WS, CONNECT_WS, DISCONNECT_WS } from 'store/modules/websocket/types';

export default Vue.extend({
  template,
  props: {
    roomId: {
      type: String,
      require: true,
    },
  },
  watch: {
    roomId() {
      this.disconnectWS();
      this.getRoom({ roomId: this.roomId });
      this.connectWS({ roomId: this.roomId });
    },
  },
  components: {
    'chat-form': Form,
    'chat-message': Message,
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
  },
  created() {
    this.getRoom({ roomId: this.roomId });
    this.connectWS({ roomId: this.roomId });
  },
  destroyed() {
    this.clearRoom({ roomId: this.roomId });
    this.disconnectWS();
  },
});
