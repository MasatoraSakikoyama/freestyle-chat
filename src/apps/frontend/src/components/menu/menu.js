/* globals Vue, Vuex, axios */
import template from 'components/menu/menu.html';
import 'components/menu/menu.css';
import RoomList from 'components/menu/room_list/room.list';
import Form from 'components/menu/form/form';
import { ERROR, OPEN_MODAL } from 'store/modules/error/types';
import { SESSION, IS_LOGIN } from 'store/modules/session/types';
import { MENU, IS_OPEN, MENU_CLOSE } from 'store/modules/menu/types';

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
    ...Vuex.mapState(MENU, {
      isOpen: IS_OPEN,
    }),
  },
  components: {
    'room-list': RoomList,
    'menu-form': Form,
  },
  methods: {
    ...Vuex.mapActions(ERROR, {
      openModal: OPEN_MODAL,
    }),
    ...Vuex.mapActions(MENU, {
      menuClose: MENU_CLOSE,
    }),
    onClose() {
      this.menuClose();
    },
    onCreateRoom(room) {
      this.rooms.push(room);
    },
    onDeleteRoom(roomId) {
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
