<template>
  <div>
      <div>
        <b-menu-list label="Teams">
          <table class="team_table">
              <tbody v-if="isAuthen()">
                  <tr v-for="(team, index) in teams" :key="index">
                      <td v-if="checkTeam(team.users_id.split(','))">
                        <router-link :to="{name: 'ShowTeam',params:{ id: team.id}}"
                        >{{team.name}}</router-link>
                      </td>
                  </tr>
              </tbody>
          </table>
          </b-menu-list>
          <b-button class="is-primary" v-if="isAuthen()" @click="createTeamBtn()">
        <strong>Create Team</strong>
      </b-button>
      </div>
    </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import TeamApiStore from "@/store/TeamApi";

export default {
    data() {
    return {
      teams: [],

      form: {
        name: "",
       
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await TeamApiStore.dispatch("fetchTeams");
      this.teams = TeamApiStore.getters.teams;
    },

    isAuthen() {
        return AuthUser.getters.isAuthen
    },

    checkTeam(id){
      let user_id = AuthUser.getters.user.id.toString()
      if(id.includes(user_id)){
        return true
      }
      else{
        return false
      }
    },
    createTeamBtn(){
      this.$router.push('/createTeam')
    }
  },

}
</script>

<style scoped lang="scss">


</style>