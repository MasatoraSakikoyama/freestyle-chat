function getCookie(name) {
    const cookie = document.cookie;
    if (cookie) {
        return cookie.split(';')
                .filter(ck => ck.trim().substring(0, name.length + 1) == (name + '='))
                .map(ck => decodeURIComponent(ck.substring(name.length + 1)));
    } else {
        return null;
    }
}

function sameOrigin(url) {
    const srOrigin = '//' + document.location.host;
    const origin = document.location.protocol + srOrigin;
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == srOrigin || url.slice(0, srOrigin.length + 1) == srOrigin + '/') ||
            !(/^(\/\/|http:|https:).*/.test(url));
}

function safeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

export default request => {
    if (!safeMethod(request.method) && sameOrigin(request.url)) {
        request.headers['X-CSRFToken'] =  getCookie('csrftoken');
    }
    return request;
}
