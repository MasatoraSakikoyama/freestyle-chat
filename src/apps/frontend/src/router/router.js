import VueRouter from 'vue-router';

import chat from '../components/contents/chat/chat.js';
import login from '../components/contents/login/login.js';

const routes = [
    { path: '/', component: chat },
    { path: '/login', component: login }
]

Vue.use(VueRouter);
export default new VueRouter({
    history: true,
    saveScrollPosition: true,
    routes: routes
});

