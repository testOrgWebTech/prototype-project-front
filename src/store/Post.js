import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

export default new Vuex.Store({
    state: {
        posts: []
    },
    mutations: {
        fetchPost(state, res) {
            state.posts = res.data;
        },
        newPost(state, res) {
            state.posts.push(res.data);        
        },
        editPost(state, res) {
            state.posts = res.data;
        },
        deletePost(state, res) {
            state.posts = res.data;
        }
    },
    actions: {
        async fetchPost({ commit }) {
            const res = await axios.get(api_endpoint + '/api/posts', /*header*/);
            commit('fetchPost', res);
        },
        async newPost({ commit }, payload) {
            const res = await axios.post(api_endpoint + '/api/posts', payload, /*header*/);
            console.log(res)
            commit('newPost', res);
            return res;
        },
        async editPost({ commit }, payload) {
            const res = await axios.put(api_endpoint + '/api/posts/' + payload.id, payload, /*header*/);
            commit('editPost', res);
        },
        async deletePost({ commit }, id) {
            const res = await axios.delete(api_endpoint + '/api/posts/' + id, /*header*/);
            commit('deletePost', res);
        },
        async getOne(id) {
            const res = await axios.post(api_endpoint + '/api/posts/', id, /*header*/);
            return res;
        },
        async fetchPostByCategory(cate_id) {
            const res = await axios.post(api_endpoint + '/api/posts-by-cate-id/' + cate_id, /*header*/);
            console.log(res)
            return res;
        },
    },
    getters: {
        posts: (state) => state.posts,
    },
    modules: {
    }
})
