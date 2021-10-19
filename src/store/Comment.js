import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

export default new Vuex.Store({
    state: {
        comments: []
    },
    mutations: {
        fetchComment(state, res) {
            state.comments = res.data;
        },
        newComment(state, res) {
            state.comments.push(res.data);
        },
        getCommentsByPostId(state, res) {
            state.comments = res.data;
        },
        deleteComment(state, res) {
            state.comments = res.data;
        }
    },
    actions: {
        async fetchComment({ commit }) {
            const res = await axios.get(api_endpoint + '/api/comments', /*header*/);
            commit('fetchComment', res);
        },
        async newComment({ commit }, payload) {
            const res = await axios.post(api_endpoint + '/api/comments', payload, /*header*/);
            commit('newComment', res);
        },
        async getCommentsByPostId({ commit }, post_id) {
            const res = await axios.post(api_endpoint + '/api/comments-by-post-id/' + post_id, /*header*/);
            commit('getCommentsByPostId', res);
        },
        async deleteComment({ commit }, id) {
            const res = await axios.delete(api_endpoint + '/api/comments/'+id)
            commit('deleteComment', res)
        }
    },
    getters: {
        comments: (state) => state.comments,
    },
    modules: {
    }
})
