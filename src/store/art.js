import api from "@/service/art";

// -- Mutations --
const SET_ARTISTS = 'SET_ARTISTS';

// -- Actions --
export const LOAD_ARTISTS = 'LOAD_ARTISTS';
export const SUBMIT_ARTIST = 'SUBMIT_TICKET';
export const DELETE_ARTIST = 'DELETE_ARTIST';

const state = {
    artists: [],
};

const getters = {
};

const mutations = {
    [SET_ARTISTS]: (state, data) => {
        state.artists = data;
    },
};

const actions = {
    [LOAD_ARTISTS]: ({commit}) => {
        return api.getArtists().then(
            response => {
                const {data} = response;
                console.log(`store::art load => ${JSON.stringify(data)}`);
                commit(SET_ARTISTS, data);
                return data.length;
            }
        );
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

