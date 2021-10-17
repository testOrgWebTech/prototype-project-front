<template>
  <div>
      <div>
        <b-menu-list label="Teams">
          <table class="team_table">
              <tbody v-if="isAuthen()">
                  <tr v-for="(team, index) in teams" :key="index">
                      <td v-if="checkTeam(team.users_id)">

                        <button class="teamName" @click="link(team.id)" 
                        >{{team.name}}</button>

                      </td>
                  </tr>
              </tbody>
          </table>
          </b-menu-list>
      <button class="button text" v-if="isAuthen()" @click="createTeamBtn()">Create Team</button>
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
    },
    link(id){
      this.$router.push({name:'ShowTeam', params: {id: id}})
      this.$router.go('/showTeam/' + id)
    }
  },
}
</script>

<style scoped lang="scss">

.button{
  background-color: #f15858;
  left: 23%;
  top: 30px;
}

.text{
    color: white;
}

.teamName:hover{
  color: #f15858;
}
.teamName{
  border: none;
  font-size: 20px;
  margin: 10px;
}


</style>