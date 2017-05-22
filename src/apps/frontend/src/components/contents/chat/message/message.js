/* globals Vue, Vuex */
import template from 'components/contents/chat/message/message.html';
import 'components/contents/chat/message/message.css';
import {
  MESSAGES,
  GET_MESSAGES,
  CLEAR_MESSAGES,
} from 'store/modules/messages/types';

export default Vue.extend({
  template,
  computed: {
    ...Vuex.mapState(MESSAGES, {
      messages: MESSAGES,
    }),
  },
  methods: {
    ...Vuex.mapActions(MESSAGES, {
      getMessages: GET_MESSAGES,
      clearMessages: CLEAR_MESSAGES,
    }),
  },
  created() {
    this.getMessages();
  },
  destroyed() {
    this.clearMessages();
  },
});
