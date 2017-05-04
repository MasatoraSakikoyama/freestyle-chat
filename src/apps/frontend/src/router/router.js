/* globals Vue */
import VueRouter from 'vue-router';
import Home from 'components/contents/home/home';
import Chat from 'components/contents/chat/chat';
import Login from 'components/contents/login/login';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
  },

];

export default class AppRouter extends VueRouter {
  constructor() {
    Vue.use(VueRouter);
    super({
      history: true,
      saveScrollPosition: true,
      routes,
    });
  }
}
