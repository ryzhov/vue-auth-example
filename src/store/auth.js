import auth from '@/service/auth';

export const REGISTER = 'register';
export const LOGOUT = 'logout';
export const LOGIN = 'login';
export const SET_TOKEN = 'set_token';

const state = {
    token: null
};

const getters = {
    isAuthenticated: state => null !== state.token && state.token.authenticated,
    user: state => getters.isAuthenticated ? state.token.user : null
};

const mutations = {
    [SET_TOKEN]: (state, token) => {
        state.token = token;
    }
};

const actions = {
    [REGISTER]: ({commit, getters}, user) => {
        return !getters.isAuthenticated ?
            auth.register(user).then(token => (commit(SET_TOKEN, token), token.user)) :
            Promise.reject([{property_path: 'email', message: `user: ${getters.user.email} already authenticated`}])
        ;
    },
    [LOGOUT]: ({commit, getters}) => {
        return getters.isAuthenticated ?
            auth.logout(getters.user).then(user => (commit(SET_TOKEN, null), user)) :
            Promise.reject([{property_path: 'email', message: 'authenticated token not found'}])
        ;
    },
    [LOGIN]: ({commit, getters}, user) => {
        return !getters.isAuthenticated ?
            auth.login(user).then(token => (commit(SET_TOKEN, token), token.user)) :
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
