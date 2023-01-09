import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/auth.module';


//設置index.js 把auth.module導入此處的Vuex 倉庫
//這樣在引入store這個資料夾時 同時也引入這個倉庫的資訊
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    }
});