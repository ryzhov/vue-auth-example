import Vue from 'vue'
import logger from 'vuejs-logger';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.sass';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : false,
  separator: ':',
  showConsoleColors: true
};

Vue.use(logger, options);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
