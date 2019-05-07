import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import art from './art';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {auth, art},
    strict: debug
});
