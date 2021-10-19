import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

export default new Vuex.Store({
    state: {
        posts: [],
        paginate: null
    },
    mutations: {
        fetchPost(state, res) {
            // console.log(res)
            if (res.data.current_page == 1) {
                state.posts = [];
            }
            // console.log(state.posts)
            state.posts.push(...res.data.data);
            state.paginate = res.data
            // console.log(state.posts)
        },
        newPost(state, res) {
            state.posts.unshift(res.data);
        },
        editPost(state, res) {
            state.posts = res.data;
        },
        deletePost(state, res) {
            state.posts = res.data;
        }
    },
    actions: {
        async fetchPost({ commit }, page) {
            const res = await axios.get(api_endpoint + '/api/posts?page=' + page, /*header*/);
            commit('fetchPost', res);
        },
        async newPost({ commit }, payload) {
            const res = await axios.post(api_endpoint + '/api/posts', payload, /*header*/);
            // console.log(res)
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
        async fetchPostByCategory({ commit }, { category_id, page }) {
            const res = await axios.get(api_endpoint + `/api/posts-by-cate-id/${category_id}?page=` + page, /*header*/);
            commit('fetchPost', res);
            return res;
        },
    },
    getters: {
        posts: (state) => state.posts,
        paginate: (state) => state.paginate,
    },
    modules: {
    }
})
