/* globals Vue, Vuex */
import jwt from '../../../../../utils/jwt.axios';
import template from './room.list.html';
import './room.list.css';
import { ERROR, OPEN_MODAL } from '../../../../../store/modules/error/types';
import { SESSION, IS_LOGIN } from '../../../../../store/modules/session/types';
import { ROOM, ROOM_ID, SELECT_ROOM_ID, DESELECT_ROOM_ID } from '../../../../../store/modules/room/types';

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
      roomId: ROOM_ID,
    }),
    isSelected() {
      return (this.roomId === this.room.room_id);
    },
  },
  methods: {
    ...Vuex.mapActions(ERROR, {
      openModal: OPEN_MODAL,
    }),
    ...Vuex.mapActions(ROOM, {
      selectRoomId: SELECT_ROOM_ID,
      deselectRoomId: DESELECT_ROOM_ID,
    }),
    openRoom() {
      this.selectRoomId(this.room.room_id);
    },
    deleteRoom() {
      jwt.delete(`/api/room/${this.room.room_id}`)
        .then(() => {
          this.$emit('delete-room', this.room.room_id);
          this.deselectRoomId();
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
