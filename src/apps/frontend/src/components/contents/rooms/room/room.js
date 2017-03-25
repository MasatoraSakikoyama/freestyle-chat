import template from './room.html';

export default {
    template: template,
    props: ['roomId'],
    data() {
        return {
            messages: [],
            ws: null,
            message: ''
        }
    },
    methods: {
        wsFlush() {
            if (this.ws && this.ws.readyState == WebSocket.OPEN) {
                this.messages = [];
                this.ws.close();
                this.ws = null;
                this.$emit('close-room');
            }
        },
        connectWS() {
            this.ws = new WebSocket(`ws://${window.location.host}/api/chat/${this.roomId}`);
            this.ws.onopen = event => {
                this.ws.send(JSON.stringify({method: 'GET'}));
            }
            this.ws.onmessage = event => {
                JSON.parse(event.data).forEach(data => {
                    this.messages.push(data);
                });
            }
            this.ws.onclose = event => {
            }
            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.onopen();
            }
        },
        sendMessage() {
            if (!this.message) {
                alert('Message must not be empty');
                return
            }
            if (!this.ws || this.ws.readyState != WebSocket.OPEN) {
                alert('Chat channel is not open');
                return
            }
            this.ws.send(JSON.stringify({
                method: 'POST',
                content: this.message
            }));
            this.message = null;
        },
        closeRoom() {
            this.wsFlush();
        }
    },
    created() {
        this.$watch('roomId', () => {
            if (!this.roomId) {
                return
            }
            this.wsFlush();
            this.connectWS();
        }, {immediate: true});
    }
}
