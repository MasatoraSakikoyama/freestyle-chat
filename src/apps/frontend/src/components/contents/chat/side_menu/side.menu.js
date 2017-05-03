/* globals Vue, Vuex, axios */
import template from 'components/contents/chat/side_menu/side.menu.html';
import 'components/contents/chat/side_menu/side.menu.css';
import RoomList from 'components/contents/chat/side_menu/room_list/room.list';
import Form from 'components/contents/chat/side_menu/form/form';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { SESSION, IS_LOGIN } from 'store/modules/session/types';

export default Vue.extend({
  template,
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
    ...Vuex.mapActions(ERROR, {
      openModal: OPEN_MODAL,
    }),
    createRoom(room) {
      this.rooms.push(room);
    },
    deleteRoom(roomId) {
      this.rooms.some((v, i) => {
        if (v.room_id === roomId) {
          this.rooms.splice(i, 1);
          return true;
        }
        return false;
      });
    },
    getRooms() {
      axios.get('/api/rooms')
        .then((response) => {
          this.rooms = response.data;
        })
        .catch((error) => {
          this.openModal({
            title: 'Room',
            message: error.response.data,
          });
        });
    },
  },
  created() {
    this.getRooms();
  },
});
