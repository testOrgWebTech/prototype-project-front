import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthUser from "@/store/AuthUser"

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000";
Axios.defaults.headers.common = { 'Authorization': `bearer ${AuthUser.getters.jwt}` };

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: []
    },
    getters: {
        users: (state) => state.users,
    },
    mutations: {
        fetch(state, { res }) {
            state.users = res.data
        },
        add(state, { payload }) {
            state.users.push(payload)
        },
        edit(state, res) {
            state.users[res.index] = res.data
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            let res = await Axios.get(api_endpoint + '/api/users')
            commit('fetch', { res })
        },

        async editStatusUser({ commit }, payload) {
            let url = api_endpoint + '/api/users/' + payload.id
            let body = {
                id: payload.id,
                status: payload.status
            }

            let res = await Axios.put(url, body)
            if (res.status === 200) {
                let resData = {
                    index: payload.index,
                    response: res.date
                }
                
                commit('edit', resData)
                
            } else {
                console.error(res)
                
            }
        },

        async editDetailUser({ commit }, payload) {
            let url = api_endpoint + '/api/users/' + payload.id
            let body = {
                id: payload.id,
                detail: payload.detail,
            }

            let res = await Axios.put(url, body)
            if (res.status === 200) {
                let resData = {
                    index: payload.index,
                    response: res.date
                }
                
                commit('edit', resData)
                
            } else {
                console.error(res)
                
            }
        },
    },
    modules: {}
})