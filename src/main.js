import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import axios from 'axios';
axios.defaults.baseURL = "https://plumsailtestapi.azurewebsites.net"; //"http://localhost:5000/"; //

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
