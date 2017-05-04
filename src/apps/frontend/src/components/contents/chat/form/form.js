/* globals Vue, Vuex */
import template from 'components/contents/chat/form/form.html';
import factory from 'components/common/input/component.factory';
import { ROOM, DESELECT_ROOM_ID } from 'store/modules/room/types';
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
    ...Vuex.mapActions(ROOM, {
      deselectRoomId: DESELECT_ROOM_ID,
    }),
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
    closeRoom() {
      // chat.room.jsでwatchしているのでroomもWSも自動的に初期化される
      this.deselectRoomId();
    },
  },
});
