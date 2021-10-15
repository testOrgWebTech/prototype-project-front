import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

export default new Vuex.Store({
    state: {
        categories: []
    },
    mutations: {
        fetchCategory(state, res) {
            state.categories = res.data;
        },

    },
    actions: {
        async fetchCategory({ commit }) {
            const res = await axios.get(api_endpoint + '/api/categories', /*header*/);
            commit('fetchCategory', res);
        },
    },
    getters: {
        categories: (state) => state.categories,
    },
    modules: {
    }
})
