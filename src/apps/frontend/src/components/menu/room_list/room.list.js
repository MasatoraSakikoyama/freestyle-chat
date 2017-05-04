/* globals Vue, Vuex */
import jwt from 'utils/jwt.axios';
import template from 'components/menu/room_list/room.list.html';
import 'components/menu/room_list/room.list.css';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { SESSION, IS_LOGIN } from 'store/modules/session/types';
import { ROOM, CLEAR_ROOM } from 'store/modules/room/types';

export default Vue.extend({
  template,
  props: {
    room: {
      typr: Object,
      default: {},
    },
  },
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
    ...Vuex.mapState(ROOM, {
      selectedRoom: ROOM,
    }),
    isSelected() {
      return (this.selectedRoom.room_id === this.room.room_id);
    },
  },
  methods: {
    ...Vuex.mapActions(ERROR, {
      openModal: OPEN_MODAL,
    }),
    ...Vuex.mapActions(ROOM, {
      clearRoom: CLEAR_ROOM,
    }),
    onDeleteRoom() {
      jwt.delete(`/api/room/${this.room.room_id}`)
        .then(() => {
          this.$emit('delete-room', this.room.room_id);
          if (this.isSelected) {
            this.clearRoom({ roomId: this.room.room_id });
            this.$router.push({ name: 'home' });
          }
        })
        .catch(() => {
          this.openModal({
            title: 'Room',
            message: 'Fail delete',
          });
        });
    },
  },
});
