import jwt from '../../../../../util/jwt.axios';

import template from './room.html';
import {} from './room.css';

export default {
  template,
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
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
          throw new Error('Fail delete');
        });
    },
  },
};
