const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
const jwtAxios = axios.create();

function _getTokenSetPromise(method, url, payload) {
    if ([POST, PUT, DELETE].indexOf(method) === -1) {
        throw 'Invalid method';
    }
    let evalTarget = `jwtAxios.${method}(url${payload ? ', payload)' : ')'}`;
    return new Promise((resolve, reject) => {
        axios.get('/api/session/token')
            .then(response => {
                jwtAxios.defaults.headers.common['Authorization'] = response.data.token;
                resolve(eval(evalTarget));
            })
            .catch(error => {
                reject(error);
            });
    });
}

function _post(url, payload) {
    return _getTokenSetPromise(POST, url, payload);
}

function _put(url, payload) {
    return _getTokenSetPromise(PUT, url, payload);
}

function _delete(url) {
    return _getTokenSetPromise(DELETE, url);
}

export default {
    post: _post,
    put: _put,
    delete: _delete
}
