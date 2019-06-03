/* global console */

import auth from '@/service/auth';
import jwtDecode from 'jwt-decode';

export const REGISTER = 'register';
export const LOGOUT = 'logout';
export const LOGIN = 'login';
export const ME = 'me';
export const SET_AUTH = 'set_auth';
export const CLEAR_AUTH = 'clear_auth';


const state = {
    token: null,
    payload: null,
};

const getters = {
    isAuthenticated: state => null !== state.token,
    payload: state => state.payload,
    token: state => state.token,
    username: state => null !== state.payload ? state.payload.username : null,
};

const mutations = {
    [SET_AUTH]: (state, {token, payload}) => {
        state.token = token;
        state.payload = payload;
    },

    [CLEAR_AUTH]: state => {
        state.token = null;
        state.payload = null;
    }
};

const actions = {
    [REGISTER]: ({commit}, user) => {
        return auth.register(user).then(response => {
            const {data: {token}} = response;
            const payload = jwtDecode(token);
            console.log(`store::auth::register token payload => ${JSON.stringify(payload)}`);
            commit(SET_AUTH, {token, payload});
            return payload;
        }).catch(error => {
            const {message, violations} = error.response ? error.response.data : error;
            return Promise.reject({violations: violations || [], message});
        });
    },
    [LOGOUT]: ({commit}) => {
        return auth.logout().then(response => {
            const {data: {username}} = response;
            console.log(`store::auth::logout => ${username}`);
            return username;
        }).catch(error => {
            const {message} = error.response ? error.response.data : error;
            return Promise.reject(message);
        }).finally(() => {
            console.log('store::auth::logout => clear auth data');
            commit(CLEAR_AUTH);
        })
            ;
    },
    [LOGIN]: ({commit}, user) => {
        return auth.login(user).then(response => {
            const {data: {token}} = response;
            const payload = jwtDecode(token);
            console.log(`store::auth::login token payload => ${JSON.stringify(payload)}`);
            commit(SET_AUTH, {token, payload});
            return payload;
        }).catch(error => {
            const {message} = error.response ? error.response.data : error;
            return Promise.reject({message});
        });
    },
    [ME]: ({commit}) => {
        return auth.me().then(response => {
            const {data: {token}} = response;
            const payload = jwtDecode(token);
            console.log(`store::auth::me token payload => ${JSON.stringify(payload)}`);
            commit(SET_AUTH, {token, payload});
            return payload;
        }).catch(error => {
            const {message} = error.response ? error.response.data : error;
            return Promise.reject({message});
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
