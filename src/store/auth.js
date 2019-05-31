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
    [REGISTER]: ({commit}, user) => {
        return auth.register(user).then(response => {
            const {data} = response;
            console.log(`store::auth register => ${JSON.stringify(data)}`);
            commit(SET_AUTH, data);
            return data.user;
        }).catch(error => {
            const {message, violations} = error.response ? error.response.data: error;
            return Promise.reject({violations: violations || [], message});
        });
    },
    [LOGOUT]: ({commit}) => {
        return auth.logout().then(response => {
                const {data} = response;
                console.log(`store::auth logout => ${JSON.stringify(data)}`);
                return data.user;
            }).catch(error => {
                const {message} = error.response ? error.response.data : error;
                return Promise.reject(message);
            }).finally(() => {
                console.log('store::auth logout => clear auth data');
                commit(CLEAR_AUTH);
            })
        ;
    },
    [LOGIN]: ({commit}, user) => {
        return auth.login(user).then(response => {
            const {data} = response;
            console.log(`store::auth login => ${JSON.stringify(data)}`);
            commit(SET_AUTH, data);
            return  data.user;
        }).catch(error => {
            const {message} = error.response ? error.response.data : error;
            return Promise.reject([{propertyPath: 'email', message}]);
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
