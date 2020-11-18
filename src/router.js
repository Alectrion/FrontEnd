import Vue from 'vue'
import Router from 'vue-router';
import Welcome from './components/Welcome.vue';
import Login from './components/Login.vue';
import CreateAccount from './components/CreateAccount.vue';
import Home from './components/Home.vue';
import MyAccount from './components/MyAccount.vue';
import AddEstablishment from './components/More/AddEstablishment.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '*', redirect: '/welcome'},
        { path: '/', redirect: '/welcome'},
        { path: '/welcome', name: 'welcome', component: Welcome},
        { path: '/login', name: 'login', component: Login},
        { path: '/createaccount', name: 'createaccount', component: CreateAccount},
        { path: '/addestablishment', name: 'addestablishment', component: AddEstablishment},
        { path: '/home', name: 'home', meta:{ requiresAuth: true}, component: Home},
        { path: '/myaccount', name: 'myaccount', meta:{ requiresAuth: true}, component: MyAccount}
      ]
})