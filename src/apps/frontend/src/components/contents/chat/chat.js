/* globals Vue */
import template from 'components/contents/chat/chat.html';
import 'components/contents/chat/chat.css';
import SideMenu from 'components/contents/chat/side_menu/side.menu';
import ChatRoom from 'components/contents/chat/chat_room/chat.room';

export default Vue.extend({
  template,
  components: {
    'side-menu': SideMenu,
    'chat-room': ChatRoom,
  },
});
