import auth from '@/service/auth';

export const REGISTER = 'register';
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
        return !getters.isAuthenticated ? auth.register(user)
            .then(token => {
                commit(SET_TOKEN, token);
            })
            : Promise.reject('user already authenticated')
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