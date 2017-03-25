export default config => {
    const getCookie = name => {
        const cookie = document.cookie;
        if (cookie && cookie != '') {
            return cookie.split(';')
                    .filter((ck) => ck.trim().substring(0, name.length + 1) == (name + '='))
                    .map((ck) => decodeURIComponent(ck.substring(name.length + 1)));
        } else {
            return null;
        }
    }

    const sameOrigin = url => {
        const sr_origin = '//' + document.location.host;
        const origin = document.location.protocol + sr_origin;
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
                (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
                !(/^(\/\/|http:|https:).*/.test(url));
    }

    const safeMethod = method => {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(config.method) && sameOrigin(config.url)) {
        config.headers['X-CSRFToken'] =  getCookie('csrftoken');
    }

    return config;
}
