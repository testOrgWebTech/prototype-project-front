import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthUser from "@/store/AuthUser"
import swal from 'sweetalert';

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000";
Axios.defaults.headers.common = { 'Authorization': `bearer ${AuthUser.getters.jwt}` };

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        teams: []
    },
    getters: {
        teams: (state) => state.teams,
    },
    mutations: {
        fetch(state, { res }) {
            state.teams = res.data
        },
        add(state, { payload }) {
            state.teams.push(payload)
        },
        edit(state, res) {
            state.teams[res.index] = res.data
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
            let res = await Axios.post(url, payload)
            return res;
        },
        async editTeam({ commit }, payload) {
            let url = api_endpoint + '/api/teams/' + payload.id;
            let res = await Axios.put(url, payload);
            return res;
        }
    },
    modules: {}
})