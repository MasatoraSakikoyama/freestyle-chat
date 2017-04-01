const jwt = axios.create();

function _post(url, payload) {
    return new Promise((resolve, reject) => {
        axios.get('/api/session/token')
            .then(response => {
                jwt.defaults.headers.common['Authorization'] = response.data.token;
                resolve(jwt.post(url, payload));
            })
            .catch(error => {
                reject(error);
            });
    });
}

function _put(url, payload) {
    return new Promise((resolve, reject) => {
        axios.get('/api/session/token')
            .then(response => {
                jwt.defaults.headers.common['Authorization'] = response.data.token;
                resolve(jwt.put(url, payload));
            })
            .catch(error => {
                reject(error);
            });
    });
}

function _delete(url) {
    return new Promise((resolve, reject) => {
        axios.get('/api/session/token')
            .then(response => {
                jwt.defaults.headers.common['Authorization'] = response.data.token;
                resolve(jwt.delete(url));
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default {
    post: _post,
    put: _put,
    delete: _delete
}
