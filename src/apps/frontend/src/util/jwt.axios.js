/* globals Vue, axios */
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
const jwtAxios = axios.create();

function getTokenSetPromise(method, url, payload) {
    if ([POST, PUT, DELETE].indexOf(method) === -1) {
        throw 'Invalid method';
    }
    const evalTarget = `jwtAxios.${method}(url${payload ? ', payload)' : ')'}`;
    return new Promise((resolve, reject) => {
        axios.get('/api/session/token')
            .then(response => {
                jwtAxios.defaults.headers.common.Authorization = response.data.token;
                resolve(eval(evalTarget));
            })
            .catch(error => {
                reject(error);
            });
    });
}

function postFunc(url, payload) {
    return getTokenSetPromise(POST, url, payload);
}

function putFunc(url, payload) {
    return getTokenSetPromise(PUT, url, payload);
}

function deleteFunc(url) {
    return getTokenSetPromise(DELETE, url);
}

export default {
    post: postFunc,
    put: putFunc,
    delete: deleteFunc,
}
