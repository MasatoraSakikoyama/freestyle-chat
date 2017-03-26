import template from './contents.html';
import login from './login/login.js';
import rooms from './rooms/rooms.js';

export default {
    template: template,
    props: [],
    data() {
        return {
            currentView: 'rooms'
        }
    },
    methods: {
        onChangeView(data) {
            let view = 'rooms';
            alert(data.data.message);
            this.currentView = view;
        }
    },
    components: {
        'login': login,
        'rooms': rooms
    }
}
