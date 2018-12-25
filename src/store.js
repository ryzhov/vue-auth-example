import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: []
    },

    getters: {
        users: state => state.users,
        usersCount: state => state.users.length
    },

    mutations: {
        pushUser(state, user) {
            state.users.push(user);
        }
    },

    actions: {
    }
})
