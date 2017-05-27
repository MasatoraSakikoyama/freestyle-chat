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
  props: {
    roomId: {
      type: String,
      require: true,
    },
  },
  computed: {
    ...Vuex.mapState(MESSAGES, {
      messages: MESSAGES,
    }),
  },
  watch: {
    roomId() {
      this.getMessages({ roomId: this.roomId });
    },
  },
  methods: {
    ...Vuex.mapActions(MESSAGES, {
      getMessages: GET_MESSAGES,
      clearMessages: CLEAR_MESSAGES,
    }),
  },
  created() {
    this.getMessages({ roomId: this.roomId });
  },
  destroyed() {
    this.clearMessages();
  },
});
