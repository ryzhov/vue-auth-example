/* global console */

import auth from '@/service/auth';

export const REGISTER = 'register';
export const LOGOUT = 'logout';
export const LOGIN = 'login';
export const SET_AUTH = 'set_auth';
export const CLEAR_AUTH = 'clear_auth';


const state = {
    token: null,
    user: null,
};

const getters = {
    isAuthenticated: state => null !== state.token && null !== state.user,
    user: state => state.user,
    token: state => state.token,
};

const mutations = {
    [SET_AUTH]: (state, {token, user}) => {
        state.token = token;
        state.user = user;
    },

    [CLEAR_AUTH]: state => {
        state.token = null;
        state.user = null;
    }
};

const actions = {
    [REGISTER]: ({commit, getters}, user) => {
        return !getters.isAuthenticated ?
            auth.register(user).then(response => {
                const {data} = response;
                console.log(`store::auth register => ${JSON.stringify(data)}`);
                commit(SET_AUTH, data);
                return data.user
            }).catch(error => {
                const {message, violations} = error.response.data;

                console.log(`store::auth register => ${error}, message => ${message}`);
                return Promise.reject(violations || []);
            }) :
            Promise.reject([{property_path: 'email', message: `user: ${getters.user.email} already authenticated`}])
        ;
    },
    [LOGOUT]: ({commit, getters}) => {
        return getters.isAuthenticated ?
            auth.logout(getters.token).then(response => {
                const {data} = response;
                console.log(`store::auth logout => ${JSON.stringify(data)}`);
                return data.user;
            }).catch(error => {
                const {message, violations} = error.response.data;

                console.log(`store::auth logout => ${error}, message => ${message}`);
                return Promise.reject(violations || []);
            }).finally(() => {
                console.log('store::auth logout => clear auth data');
                commit(CLEAR_AUTH);
            }) :
            Promise.reject([{property_path: 'email', message: 'authenticated token not found'}])
        ;
    },
    [LOGIN]: ({commit, getters}, user) => {
        return !getters.isAuthenticated ?
            auth.login(user).then(response => {
                const {data} = response;

                console.log(`store::auth login => ${JSON.stringify(data)}`);
                commit(SET_AUTH, data);
                return  data.user
            }).catch(error => {
                const {message} = error.response.data;

                console.log(`store::auth login => ${error}, message => ${message}`);
                return Promise.reject([{property_path: 'email', message}]);
            }) :
            Promise.reject([{property_path: 'email', message: `user: ${getters.user.email} already authenticated`}])
        ;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
