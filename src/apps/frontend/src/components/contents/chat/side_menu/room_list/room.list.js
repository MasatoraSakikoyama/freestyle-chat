/* globals Vue, Vuex */
import jwt from '../../../../../utils/jwt.axios';
import template from './room.list.html';
import {} from './room.list.css';
import { SESSION, IS_LOGIN } from '../../../../../store/modules/session/types';

export default Vue.extend({
  template,
  props: {
    selectedRoom: {
      type: String,
      default: '',
    },
    room: {
      typr: Object,
      default: {},
    },
  },
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
    isSelected() {
      return (this.selectedRoom === this.room.room_id);
    },
  },
  methods: {
    openRoom() {
      this.$emit('open-room', this.room.room_id);
    },
    deleteRoom() {
      jwt.delete(`/api/room/${this.room.room_id}`)
        .then(() => {
          this.$emit('delete-room', this.room.room_id);
        })
        .catch(() => {
          // this.$emit('error', {
          //   title: 'Room',
          //   message: 'Fail delete',
          // });
        });
    },
  },
});
