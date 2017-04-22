/* globals Vue, Vuex, axios */
import template from './side.menu.html';
import {} from './side.menu.css';
import RoomList from './room_list/room.list';
import Form from './form/form';
import { SESSION, IS_LOGIN } from '../../../../store/modules/session/types';

export default Vue.extend({
  template,
  props: {
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
  computed: {
    ...Vuex.mapState(SESSION, {
      isLogin: IS_LOGIN,
    }),
  },
  components: {
    'room-list': RoomList,
    'side-menu-form': Form,
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
          // this.$emit('error', {
          //   title: 'Room',
          //   message: error.response.data,
          // });
        });
    },
  },
  created() {
    this.getRooms();
  },
});
