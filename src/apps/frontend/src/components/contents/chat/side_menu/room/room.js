import template from './room.html';
import style from './room.css';

export default {
    template: template,
    props: {
        selectedRoom: {
            type: String,
            default: ''
        },
        room: {
            typr: Object,
            default: {}
        }
    },
    computed: {
        isSelected() {
            return (this.selectedRoom === this.room.room_id)
        }
    },
    methods: {
        openRoom() {
            this.$emit('open-room', this.room.room_id);
        },
        deleteRoom() {
            axios.delete(`/api/room/${this.room.room_id}`)
                .then(response => {
                    this.$emit('delete-room', this.room.room_id);
                })
                .catch(error => {
                    alert('Delete fail');
                });
        }
    }
}
