import Vue from 'vue';
import Router from 'vue-router';
import Home from './HomePage/home.vue';




Vue.use(Router);
/**
 * 統一由這兩修改
 */
class DomainName {
    /**
     * vue-router內轉跳用網址
     */
    static getUrl() {
        let def = '/keepGoingVue/';
        return def;
    }

    /**
     * axios轉跳用網址
     */
    getUrl() {
        let def = '/keepGoingVue/';
        return def;
    }
}

export default new DomainName();

let domainName = DomainName.getUrl();

export const router = new Router({

    mode: 'history',
    routes: [
        {
            path: domainName + 'ProjectHome',
            name: 'HomePage',
            component: Home
        },
        {
            path: domainName + 'ErrorPage',
            name: 'ErrorPage',
            component: () => import('./ErrorPage/ErrorPage.vue')
        },
        {
            path: domainName + 'UpsertProductPage',
            name: 'UpsertProductPage',
            component: () => import('./components/CommonComponents/upsertProductPage')
        }
    ]
});

