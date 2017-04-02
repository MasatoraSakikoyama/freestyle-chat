/* globals axios */
const jwtAxios = axios.create();
const METHODS = {
  POST: jwtAxios.post,
  PUT: jwtAxios.put,
  DELETE: jwtAxios.delete,
};

function getTokenSetPromise(method, url, payload) {
  if (['POST', 'PUT', 'DELETE'].indexOf(method) === -1) {
    throw new Error('Invalid method');
  }
  return new Promise((resolve, reject) => {
    axios.get('/api/session/token')
      .then((response) => {
        jwtAxios.defaults.headers.common.Authorization = response.data.token;
        resolve(METHODS[method](url, payload));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function postFunc(url, payload) {
  return getTokenSetPromise('POST', url, payload);
}

function putFunc(url, payload) {
  return getTokenSetPromise('PUT', url, payload);
}

function deleteFunc(url) {
  return getTokenSetPromise('DELETE', url);
}

export default {
  post: postFunc,
  put: putFunc,
  delete: deleteFunc,
};
