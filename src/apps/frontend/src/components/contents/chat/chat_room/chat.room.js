import template from './chat.room.html';
import style from './chat.room.css';

import form from './form/form.js';
import message from './message/message.js';

const MESSAGE_SIZE = 10;

export default {
    template: template,
    props: ['selectedRoom'],
    data() {
        return {
            messages: [],
            ws: {}
        }
    },
    components: {
        'chat-room-form': form,
        'chat-room-message': message
    },
    watch: {
        selectedRoom() {
            this.messages = [];
            this._wsFlush();
            if (this.selectedRoom) {
                this._connectWS();
            }
        }
    },
    methods: {
        sendMessage(message) {
            if (!this.ws || this.ws.readyState != WebSocket.OPEN) {
                alert('Chat channel is not open');
                return
            }
            this.ws.send(JSON.stringify({
                method: 'POST',
                content: message
            }));
        },
        closeRoom() {
            this.messages = [];
            this._wsFlush();
            this.$emit('deselect-room', this.selectedRoom);
        },
        _wsFlush() {
            if (this.ws && this.ws.readyState == WebSocket.OPEN) {
                this.ws.close();
            }
        },
        _connectWS() {
            this.ws = new WebSocket(`ws://${window.location.host}/api/chat/${this.selectedRoom}`);
            this.ws.onopen = event => {
                this.ws.send(JSON.stringify({method: 'GET'}));
            }
            this.ws.onmessage = event => {
                JSON.parse(event.data).forEach(data => {
                    if (this.messages.length >= MESSAGE_SIZE) {
                        this.messages.shift();
                    }
                    this.messages.push(data);
                });
            }
            this.ws.onclose = event => {
            }
            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.onopen();
            }
        }
    }
}
