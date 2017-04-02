/* globals Vue */
import template from './chat.html';
import {} from './chat.css';

import SideMenu from './side_menu/side.menu';
import ChatRoom from './chat_room/chat.room';

export default Vue.extend({
  template,
  props: {
    router: {
      type: Object,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedRoom: '',
    };
  },
  components: {
    'side-menu': SideMenu,
    'chat-room': ChatRoom,
  },
  methods: {
    selectRoom(roomId) {
      this.selectedRoom = roomId;
    },
    deselectRoom(roomId) {
      if (this.selectedRoom === roomId) {
        this.selectedRoom = '';
      }
    },
  },
});
