import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthUser from "@/store/AuthUser"

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000";
Axios.defaults.headers.common = { 'Authorization': `bearer ${AuthUser.getters.jwt}` };

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: []
    },
    getters: {
        challenges: (state) => state.data,
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
        async fetchChallenges({ commit }) {
            let res = await Axios.get(api_endpoint + '/api/challenges')
            commit('fetch', { res })
        },
        async addChallenge({ commit }, payload) {
            let url = api_endpoint + '/api/challenges'
            let body = {
                location: payload.location,
                post_id: payload.post_id,
                teamA_id: payload.teamA_id,
                match_progress: payload.match_progress,
                mode: payload.mode,
                teamA_players: payload.teamA_players,
                player_team: payload.player_team,
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                commit('add', res.data)
                //create success show something to user
            } else {
                console.error(res)
                //create fail show something to user
            }
        },
        async editChallenge({ commit }, payload) {
            let url = api_endpoint + '/api/challenges/' + payload.id
            let body = {
                location: payload.location,
                teamB_id: payload.teamB_id,
                victory_team: payload.victory_team,
                match_progress: payload.match_progress,
                mode: payload.mode,
                players: payload.players,
                player_team: payload.player_team
            }

            let res = await Axios.put(url, body)
            if (res.status === 200) {
                let resData = {
                    index: payload.index,
                    response: res.date
                }
                console.log("res", res)
                commit('edit', resData)
                // swal("Edit Challenge Success", "", "success")
                // edit success show something to user
            } else {
                console.error(res)
                // swal("Edit Challenge Failed", res.message, "error")
                // edit fail show something to user
            }
        },
    },
    modules: {}
})