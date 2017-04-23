/* globals Vue */
import template from './form.html';
import factory from '../../../../common/input/component.factory';
import { ROOM, ROOM_ID, DESELECT_ROOM } from '../../../../../store/modules/room/types';


export default Vue.extend({
  template,
  props: {
    sendSuccess: {
      type: Boolean,
      required: true,
    },
  },
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
  computed: {
    ...Vuex.mapState(ROOM, {
      roomId: ROOM_ID,
    }),
  },
  components: {
    'textarea-input': factory('textarea'),
  },
  methods: {
    ...Vuex.mapActions(ROOM, {
      deselectRoom: DESELECT_ROOM,
    }),
    sendMessage() {
      if (!this.model.isValid) {
        return;
      }
      this.$emit('send-message', this.model.value);
      this.$nextTick(() => {
        if (this.sendSuccess) {
          this.model.value = null;
          this.$emit('reset-flag');
        }
      });
    },
    closeRoom() {
      this.$emit('close-room');
      this.deselectRoom(this.roomId);
    },
  },
});
