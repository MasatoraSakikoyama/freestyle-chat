/* globals Vue, Vuex */
import template from 'components/contents/chat/form/form.html';
import 'components/contents/chat/form/form.css';
import factory from 'components/common/input/component.factory';
import {
  MESSAGES,
  POST_MESSAGES,
  PUT_MESSAGES,
  DELETE_MESSAGES,
} from 'store/modules/messages/types';

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
    ...Vuex.mapActions(MESSAGES, {
      post: POST_MESSAGES,
      put: PUT_MESSAGES,
      delete: DELETE_MESSAGES,
    }),
    sendMessage() {
      if (!this.model.isValid) {
        return;
      }
      this.post(this.model.value)
        .then(() => {
          this.model.value = null;
        });
    },
  },
});
