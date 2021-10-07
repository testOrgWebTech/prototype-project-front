import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '@/services/AuthService'
const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      data: [],
    },
    getters: {
      teams: (state) => state.data
    },
    mutations: {
      fetch(state, {res}){
          state.data = res.data
      },
      add(state, payload){
        state.data.push(payload)
      },
      edit(state, index, data){
        state.data[index] = data
      },
      delete(state, index, data){
        state.data[index] = data
      },
      get(state, index, data){
        state.data[index] = data
      }
  
    },
    actions: {
      async fetchData({ commit }){
          let res = await Axios.get(api_endpoint + "/api/teams")
        
          commit('fetch', {res})
      },
      async getTeamById({ commit }, id){
        let res = await Axios.get(api_endpoint + "/api/teams/" + id)
      
        commit('fetch', {res})
    },
      
      async addTeam({ commit }, payload){
        
        let url = api_endpoint + "/api/teams"
  
        let body = {
            name: payload.name,
            user_id: payload.user_id,
        }
        try{
          let res = await Axios.post(url, body)
          if(res.status === 200){
          commit("add", res.data)
          return{
              success: true,
              data: res.data
          }
          }
          else{
            console.error(res)
            return{
                success: false,
                message: "Unknown status code: " + res.status
            }
              }
          } catch(e){
              if(e.response.status === 403){
                  console.error(e.response.data.message)
                  return{
                      success: false,
                      message: e.response.data.message,
                  }
              }else{
                  return{
                      success: false,
                      message: "Unknown error: " + e.response.data
                  }
              }
          }
      },
    
    },
    modules: {
    }
  })