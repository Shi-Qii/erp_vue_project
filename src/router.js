import Vue from 'vue';
import Router from 'vue-router';
import Home from './HomePage/home.vue';

Vue.use(Router);

let dominName='/keepGoingVue/'
export const router = new Router({
    mode: 'history',
    routes:[
        {
            path:dominName+'ProjectHome',
            name:'HomePage' ,
            component: Home
        },
        {
            path:dominName+'ErrorPage',
            name:'ErrorPage' ,
            component:() => import('./ErrorPage/ErrorPage.vue')
        },
        {
            path:dominName+'UpsertProductPage',
            name:'UpsertProductPage' ,
            component:() => import('./components/CommonComponents/upsertProductPage')
        }
    ]
});