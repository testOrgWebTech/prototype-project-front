<template>
  <div>
    <div class="card">
      <div class="card-content">
      <h1 class="title">Team {{form.name}}</h1>
      <h2>Member</h2>

    <div class="name">
      <div v-for="(name, index) in this.form.users" :key="index">
        {{ name }}
      </div>

      <br> 
      <div class="divBtn">
      <router-link class="editTeamBtn" :to="{name: 'EditTeam',params:{ id: this.id}}"> Edit Team </router-link>
      </div>
      </div>
      <br>
      </div>
    </div>
      <div class="card">
      <div class="card-content">
      <h2 class="title">Challenges History</h2> 
      <br>
      <table class="styled-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Team A</th>
              <th>Team B</th>
              <th>Mode</th>
              <th>Victory Team</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody v-for="(cha, index) in challengesSelected" :key="index">
            <tr>
              <td>{{cha.location}}</td>
              <td>{{cha.teamA_name}}</td>
              <td>{{cha.teamB_name}}</td>
              <td>{{cha.mode}}</td>
              <td>{{cha.victory_team}}</td>
              <td >{{showDate(cha.updated_at)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
        <b-loading v-model="isLoading"></b-loading>
    
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import TeamService from "@/services/TeamService";
import ChallengeApiStore from "@/store/ChallengeApi";
export default {
    components:{
        Topbar,
    },
    data(){
        return{
            challenges:[],
            challengesSelected:[],

            id: '',

            isLoading: false,
            form: {
                name: '',
                users:'',
            },
        }
    },
    async created(){
        this.isLoading = true;
        this.id = this.$route.params.id
        let team = await TeamService.getTeamById(this.id)
        this.form.name = team.name
        this.form.users = team.users_name.split(",")
        this.fetchData()
        this.isLoading = false;
        
    },
    methods: {
    async fetchData() {
            this.isLoading = true;
            await ChallengeApiStore.dispatch("fetchChallenges");
            this.challenges = ChallengeApiStore.getters.challenges;
            this.challenges.forEach(element => {
              if(element.teamA_id == this.id && element.match_progress == "ENDED" || element.teamB_id == this.id && element.match_progress == "ENDED"){
                this.challengesSelected.push(element)
              }
            });
            this.isLoading = false;
        },

    showDate(date){
      let d = new Date(date)
      return d.toString().slice(4,24);
    },

    }
    
}
</script>

<style scoped lang="scss">
.card {
  margin-top: 30px;
  //margin-left: 500px;
  //margin-right: 500px;
  //background-color: #484848;
  height: 40%;
  width: 80%;
  text-align: center;
  
}
.title{
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
.content {
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
tr th{
  padding: 20px;
}
table {
    table-layout: fixed;
    width: 100%;   
}
.editTeamBtn{
    background-color: #f15858;
    border: #484848;
    padding: 10px;
    text-decoration-line: none;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 5%;
    color: white;

}
.editTeamBtn:hover {
  color: black;
  cursor: pointer;
}
.name {
  font-size: 130%;
  padding-top: 10px;
  text-align: center;
}
h1 {
  font-size: 50px;
  text-align: center;
}
h2 {
  font-size: 35px;
  text-align: center;
}

/*.styled-table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr th {
  background-color: #484848;
  text-align: center;
  color: white;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
}

.styled-table tbody tr:last-of-type {

    border-bottom: 2px solid #484848;
}*/


.button {
  background-color: #f15858;
  position: relative;
}
.text {
  color: white;
}
.divBtn{
    text-align: center;
    padding-top: 30px;
}
</style>