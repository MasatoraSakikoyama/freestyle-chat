/* globals Vue */
import template from './chat.html';
import './chat.css';
import SideMenu from './side_menu/side.menu';
import ChatRoom from './chat_room/chat.room';

export default Vue.extend({
  template,
  components: {
    'side-menu': SideMenu,
    'chat-room': ChatRoom,
  },
});
