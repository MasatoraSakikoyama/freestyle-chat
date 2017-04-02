import template from './chat.html';
import {} from './chat.css';

import sideMenu from './side_menu/side.menu';
import chatRoom from './chat_room/chat.room';

export default {
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
    'side-menu': sideMenu,
    'chat-room': chatRoom,
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
};
