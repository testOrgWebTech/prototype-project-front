import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthService from "../services/AuthService";
import AuthUser from "./AuthUser";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    getters:{
        messages: (state) => state.data
    },
    mutations: {
        fetch(state, {res}){
            state.data = res.data
        },
        add(state, payload) {
            state.data.unshift(payload)
        },
        edit(state, index, data) {
            state.data[index] = data
        }
    },
    actions: {
        async fetchMessage({ commit }) {
            let header = AuthService.getApiHeader()
            let res = await Axios.get("http://localhost:8000/api/messages",header
            )
            commit("fetch", {res})
        },
        async fetchSentMessage({ commit }) {
            let header = AuthService.getApiHeader()
            let res = await Axios.get("http://localhost:8000/api/messages/getSentMessage",header
            )
            commit("fetch", {res})
        },
        async postMessage({ commit },payload) {
            let header = AuthService.getApiHeader()
            let res = await Axios.post("http://localhost:8000/api/messages",payload,header
            )
            console.log(res.data)
            commit("add", res.data)
            return res

        }
    },
})