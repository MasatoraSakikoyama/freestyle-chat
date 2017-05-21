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
      get: GET_MESSAGES,
      clear: CLEAR_MESSAGES,
    }),
  },
  created() {
    this.get();
  },
  destroyed() {
    this.clear();
  },
});
