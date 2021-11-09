import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

export default new Vuex.Store({
    state: {
        users: [],
    },
    mutations: {
        fetchUsers(state, res){
            state.users = res.data
        },
    },
    actions: {
        async fetchUsers({ commit }){
            const res = await axios.get(api_endpoint + '/api/users', /*header*/);
            commit('fetchUsers', res);
        },
    },
    getters: {
        users: (state) => state.users,
    },
    modules: {
    }
})