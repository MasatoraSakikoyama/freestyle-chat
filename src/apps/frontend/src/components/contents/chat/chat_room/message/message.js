/* globals Vue */
import template from 'components/contents/chat/chat_room/message/message.html';
import 'components/contents/chat/chat_room/message/message.css';

export default Vue.extend({
  template,
  props: {
    message: {
      type: Object,
      defaut: {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    number() {
      return (this.index + 1);
    },
  },
});
