/* globals Vue */
import template from 'components/contents/chat/message/message.html';
import 'components/contents/chat/message/message.css';
import { ROOM } from 'store/modules/room/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(ROOM, {
      room: ROOM,
    }),
  },
});
