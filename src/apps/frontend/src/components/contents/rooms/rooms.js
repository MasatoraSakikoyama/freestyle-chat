import template from './rooms.html';
import room from './room/room.js';

export default {
    template: template,
    props: [],
    data() {
        return {
            rooms: [],
            title: '',
            roomId: ''
        }
    },
    methods: {
        getRooms() {
            axios.get('/api/rooms')
                .then(response => {
                    this.rooms = response.data;
                })
                .catch(error => {
                    alert(error.response.data);
                });
        },
        createRoom() {
            if (!this.title) {
                alert('Title must not be empty');
                return;
            }
            axios.post('/api/room/create', {
                    title: this.title,
                    password: null,
                    is_private: false,
                    is_anonymous: true
                })
                .then(response => {
                    this.title = null;
                    this.getRooms();
                })
                .catch(error => {
                    alert(error.response.data.message);
                });
        },
        deleteRoom(roomId) {
            axios.delete(`/api/room/${roomId}`)
                .then(response => {
                    this.getRooms();
                })
                .catch(error => {
                    alert('Delete fail');
                });
        },
        openRoom(roomId) {
            this.roomId = roomId;
        },
        closeRoom() {
            this.roomId = '';
        }
    },
    created() {
        this.getRooms();
    },
    components: {
        'room': room
    }
}
