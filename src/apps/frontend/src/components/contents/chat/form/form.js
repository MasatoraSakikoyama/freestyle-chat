/* globals Vue, Vuex */
import template from 'components/contents/chat/form/form.html';
import 'components/contents/chat/form/form.css';
import factory from 'components/common/input/component.factory';
import { WS, SEND } from 'store/modules/websocket/types';

export default Vue.extend({
  template,
  data() {
    return {
      model: {
        key: 'Message',
        value: null,
        isValid: false,
        rules: [
          { name: 'NotEmpty' },
          { name: 'MaxLength', param: 1024 },
        ],
      },
    };
  },
  components: {
    'textarea-input': factory('textarea'),
  },
  methods: {
    ...Vuex.mapActions(WS, {
      send: SEND,
    }),
    sendMessage() {
      if (!this.model.isValid) {
        return;
      }
      this.send(this.model.value)
        .then(() => {
          this.model.value = null;
        });
    },
  },
});
