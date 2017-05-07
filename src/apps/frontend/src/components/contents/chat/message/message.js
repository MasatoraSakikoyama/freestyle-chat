/* globals Vue, Vuex */
import template from 'components/contents/chat/message/message.html';
import 'components/contents/chat/message/message.css';
import { MESSAGES } from 'store/modules/messages/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(MESSAGES, {
      messages: MESSAGES,
    }),
  },
});
