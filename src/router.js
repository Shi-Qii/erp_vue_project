import Vue from 'vue';
import Router from 'vue-router';
import Home from './HomePage/home.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes:[
        {
            path:'/ProjectHome',
            name:'HomePage' ,
            component: Home
        },
        {
            path:'/ErrorPage',
            name:'ErrorPage' ,
            component:() => import('./ErrorPage/ErrorPage.vue')
        },
        {
            path:'/AddProductPage',
            name:'AddProductPage' ,
            component:() => import('./components/CommonComponents/addProductPage')
        }
    ]
});