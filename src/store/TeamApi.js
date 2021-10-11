import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthUser from "@/store/AuthUser"
import swal from 'sweetalert';

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8080";
Axios.defaults.headers.common = { 'Authorization': `bearer ${AuthUser.getters.jwt}` };

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: []
    },
    getters: {
        teams: (state) => state.data,
    },
    mutations: {
        fetch(state, { res }) {
            state.data = res.data
        },
        add(state, { payload }) {
            state.data.push(payload)
        },
        edit(state, res) {
            state.data[res.index] = res.data
        },
    },
    actions: {
        async fetchTeams({ commit }) {
            let res = await Axios.get(api_endpoint + '/api/teams')
            commit('fetch', { res })
        },
        async fetchTeam({ commit }, id) {
            let res = await Axios.get(api_endpoint + '/api/teams/' + id)
            commit('fetch', { res })
        },
        async addTeam({ commit }, payload) {
            let url = api_endpoint + '/api/teams'
            let body = {
                name: payload.name,
                user_id: payload.user_id,
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                commit('add', res.data)
                swal("Create Team Success", "","success")
            } else {
                console.error(res)
                
                swal("Create Team Failed", res.message, "error")
            }
        },
        async editTeam({ commit }, payload) {
            let url = api_endpoint + '/api/teams/' + payload.id
            let body = {
                name: payload.name,
                users: payload.users,
                option: payload.option
            }

            let res = await Axios.put(url, body)
            if (res.status === 200) {
                let resData = {
                    index: payload.index,
                    response: res.date
                }
                console.log("res", res)
                commit('edit', resData)
                swal("Edit Team Success", "","success")
            } else {
                console.log("test error")
                console.error(res)
                swal("Edit Team Failed", res.message, "error")
            }
        },
    },
    modules: {}
})