import VueRouter from 'vue-router';

import rooms from '../components/contents/rooms/rooms.js';
import login from '../components/contents/login/login.js';

const routes = [
    { path: '/', component: rooms },
    { path: '/login', component: login }
]

Vue.use(VueRouter);
export default new VueRouter({
    history: true,
    saveScrollPosition: true,
    routes: routes
});

