import template from './side.menu.html';
import style from './side.menu.css';

import room from './room/room.js';
import form from './form/form.js';

export default {
    template: template,
    props: {
        isLogin: {
            type: Boolean,
            default: false
        },
        selectedRoom: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            rooms: []
        }
    },
    components: {
        'side-menu-room': room,
        'side-menu-form': form
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
            });
            this.$emit('deselect-room', roomId);
        },
        openRoom(roomId) {
            this.$emit('select-room', roomId);
        },
        _getRooms() {
            axios.get('/api/rooms')
                .then(response => {
                    this.rooms = response.data;
                })
                .catch(error => {
                    alert(error.response.data);
                });
        }
    },
    created() {
        this._getRooms();
    }
}
