// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 共享狀態定義
const state = {
    count: 0,
};

// 創建 actions，包含響應組件"動作"的函式。
const actions = {
    add(context, value) {
        console.log(context); // 小型的 $store
        console.log(value);
        context.commit("ADD", value);
    },
};
const mutations = {
    ADD(state, value) {
        state.count = value;
    },
};

// 創建 store ，用於管理：state、actions、mutations
const store = new Vuex.Store({
    state,
    actions,
    mutations,
});

export default store;
