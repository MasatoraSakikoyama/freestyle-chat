import CSRFConfig from './csrf.config.js';

let ws;

function getRooms() {
    $('#rooms').children().remove();
    axios.get('/api/rooms')
        .then(response => {
            response.data.forEach(d => {
                $('#rooms').append(
                    $(`<li>
                           <label id="${d.room_id}-open" data-room-id=${d.room_id}>ID: ${d.room_id}, Title: ${d.title}</label>
                           <button id="${d.room_id}-delete" type="button" data-room-id=${d.room_id}>Delete Room</button>
                       </li>`)
                );
                $(`#${d.room_id}-open`).on('click', openRoom);
                $(`#${d.room_id}-delete`).on('click', deleteRoom);

            });
        })
        .catch(error => {
            alert(error.response.data);
        });
}

function executeLogin(event) {
    const userId = $('#user-id').val();
    const password = $('#password').val();
    if (!userId || !password) {
        alert('User Id or Password must not be empty');
        return
    }
    const flush = () => {
        $('#user-id').val(null);
        $('#password').val(null);
    }
    axios.post('/api/session/login', {
            user_id: userId,
            password: password
        })
        .then(response => {
            alert(response.data.message);
            flush();
        })
        .catch(error => {
            alert(error.response.data.messae);
            flush();
        });
}

function createRoom(event) {
    const title = $('#room-title').val();
    if (!title) {
        alert('Title must not be empty');
        return;
    }
    axios.post('/api/room/create', {
            title: title,
            password: null,
            is_private: false,
            is_anonymous: true
        })
        .then(response => {
            alert('Room create');
            getRooms();
        })
        .catch(error => {
            alert(error.response.data.message);
        });
}

function deleteRoom(event) {
    const roomId = event.target.dataset.roomId;
    axios.delete(`/api/room/${roomId}`)
        .then(response => {
            alert(`${roomId} is Delete`);
            getRooms();
        })
        .catch(error => {
            alert('Delete fail');
        });
}

function openRoom(event) {
    wsFlush();
    const roomId = event.target.dataset.roomId;
    ws = new WebSocket(`ws://${window.location.host}/api/chat/${roomId}`);
    ws.onopen = event => {
        $(`#${roomId}-open`).attr('style', 'background-color: gray;');
        ws.send(JSON.stringify({method: 'GET'}));
    }
    ws.onmessage = event => {
        JSON.parse(event.data).forEach(d => {
            $('#room').append($(`<li>user: ${d.modified_by}, content: ${d.content}, date: ${d.modified_at}</li>`));
        });
        const children = $('#room')[0].children;
        while (children.length > 10) {
            children[0].remove();
        }
    }
    ws.onclose = event => {
        $(`#${roomId}-open`).removeAttr('style');
    }
    if (ws.readyState == WebSocket.OPEN) {
        ws.onopen();
    }
}

function wsFlush() {
    if (ws && ws.readyState == WebSocket.OPEN) {
        ws.close();
        $('#room').children().remove();
    }
}

function createMessage(event) {
    const text = $('#message').val();
    if (!text) {
        alert('Message must not be empty');
        return
    }
    if (!ws || ws.readyState != WebSocket.OPEN) {
        alert('Chat channel is not open');
        return
    }
    ws.send(JSON.stringify({
        method: 'POST',
        content: text
    }));
}

function closeRoom(event) {
    wsFlush();
}

$(document).ready(() => {
    axios.interceptors.request.use(CSRFConfig);
    getRooms();
    $('#login-execute').on('click', executeLogin);
    $('#room-create').on('click', createRoom);
    $('#message-create').on('click', createMessage);
    $('#room-close').on('click', closeRoom);
});
