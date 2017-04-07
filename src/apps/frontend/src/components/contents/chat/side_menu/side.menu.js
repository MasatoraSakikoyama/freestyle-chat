/* globals Vue, axios */
import template from './side.menu.html';
import {} from './side.menu.css';

import SideMenuRoom from './room/room';
import SideMenuForm from './form/form';

export default Vue.extend({
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
  },
  data() {
    return {
      rooms: [],
    };
  },
  components: {
    'side-menu-room': SideMenuRoom,
    'side-menu-form': SideMenuForm,
  },
  methods: {
    createRoom(room) {
      this.rooms.push(room);
      this.$emit('select-room', room.room_id);
    },
    deleteRoom(roomId) {
      this.rooms.some((v, i) => {
        if (v.room_id === roomId) {
          this.rooms.splice(i, 1);
          return true;
        }
        return false;
      });
      this.$emit('deselect-room', roomId);
    },
    openRoom(roomId) {
      this.$emit('select-room', roomId);
    },
    getRooms() {
      axios.get('/api/rooms')
        .then((response) => {
          this.rooms = response.data;
        })
        .catch((error) => {
          this.$emit('error', {
            title: 'Room',
            message: error.response.data,
          });
        });
    },
    error(event) {
      this.$emit('error', event);
    },
  },
  created() {
    this.getRooms();
  },
});
