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
        newCategory(state, res) {
            state.categories.unshift(res.data);
        },
        deleteCategory(state, res) {
            state.categories = res.data;
        }
    },
    actions: {
        async fetchCategory({ commit }) {
            const res = await axios.get(api_endpoint + '/api/categories', /*header*/);
            commit('fetchCategory', res);
        },
        async AddNewCategory({ commit }, payload){
            const res = await axios.post(api_endpoint + '/api/categories', payload, /*header*/);
            commit('newCategory', res);
            return res;
        },
        async deleteCategory({ commit }, id) {
            const res = await axios.delete(api_endpoint + '/api/categories/' + id, /*header*/);
            commit('deleteCategory', res);
        },
    },
    getters: {
        categories: (state) => state.categories,
    },
    modules: {
    }
})
