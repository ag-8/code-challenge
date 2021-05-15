import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import {ServerTable, ClientTable} from 'vue-tables-2';

Vue.use(ClientTable, {}, false, 'bulma', 'default');
Vue.use(ServerTable, {}, false, 'bulma', 'default');


axios.defaults.baseURL = 'https://api.github.com/';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

require('@/assets/main.scss');


new Vue({
  render: h => h(App),
}).$mount('#app')
