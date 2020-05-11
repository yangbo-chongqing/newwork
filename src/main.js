// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'
import { Base64 } from 'js-base64';
import ElementUI from 'element-ui';
import 'animate.css'
import './assets/css/icon.css'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
import mixins from "./assets/Mixins/Mixins"
axios.defaults.baseURL = 'http://www.mlxc365.com'
window.baseUrl = 'http://www.mlxc365.com'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true //使用secion
Vue.mixin(mixins)
Vue.prototype.$axios = axios
Vue.prototype.qs = Qs.stringify
Vue.config.productionTip = false
Vue.prototype.Base64 = Base64
Vue.use(ElementUI);


router.afterEach((to, from, next) => {
    // '/organizeVote.html' || '/organizeMeet.html' || '/organizeGrade.html' || '/organizeTeach.html'
    let pathNot = {
        '/organizeVote.html': 1,
        '/organizeMeet.html': 1,
        '/organizeGrade.html': 1,
        '/organizeTeach.html': 1,
        '/organize.html': 1,
        '/forumDetails.html': 1,
        '/organizePeople.html': 1
    };
    if (!pathNot[to.path]) {
        window.scrollTo(0, 0);
    }
});
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')