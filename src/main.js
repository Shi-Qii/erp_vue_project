import Vue from 'vue';
import App from './App.vue';
import store from './store';
//------------------------以下為專案配置------------
//先import 在引用
// bootstrap-vue
// https://bootstrap-vue.org/docs/components
import 'bootstrap/dist/css/bootstrap.css';
// bootstrap
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
//icon
import {faHome, faSignInAlt, faSignOutAlt, faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
//icon
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

//VueCompositionAPI
// vue2.6: vite-plugin-vue2@2.6.14 + vue-template-compiler@2.6.14 + @vue/composition-api
//vue3 寫法全局配置 [ VueCompositionAPI,{reactive, watch, ref, onMounted} ]
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

//router
import {router} from './router';
//VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


//VueCroppie
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'; // import the croppie css manually
Vue.use(VueCroppie);

//toggleButton
import ToggleButton from 'vue-js-toggle-button';
Vue.use(ToggleButton);

//Croppa
import Croppa from 'vue-croppa';
Vue.use(Croppa, {componentName: 'my-image-cropper'});
//------------------------專案配置end------------
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
