<template>
    <div>
        <Topbar/>
        <h1>Profile</h1>

        <div class="card">
          <div class="card-content">
            <figure class="image is-128x128">
              <img class="is-rounded"  src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="content">
              <h1 class="text">Name : </h1>
              <br>
              <h1 class="text">Email : </h1>
            </div>
          </div>
        </div>

        <br>
        <h1>Challenges History</h1>

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
          <tbody v-for="(cha, index) in challenges" :key="index">
            <tr v-if="checkCha(cha.users_id,cha.match_progress)">
              <td>{{cha.location}}</td>
              <td>{{cha.teamA_name.toString()}}</td>
              <td>{{cha.teamB_name.toString()}}</td>
              <td>{{cha.mode}}</td>
              <td>{{cha.victory_team}}</td>
              <td>{{cha.updated_at.slice(0,10)}}</td>
            </tr>
          </tbody>
        </table>


    </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import ChallengeApiStore from '@/store/ChallengeApi'
import AuthUser from "@/store/AuthUser"
export default {
  name: 'Dashboard',
  components: {
    Topbar,
  },
  
  data() {
    return {
      challenges:[],
      
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await ChallengeApiStore.dispatch("fetchChallenges");
      this.challenges = ChallengeApiStore.getters.challenges;
    },

    checkCha(id,match_progress){ 
      let user_id = AuthUser.getters.user.id.toString()
      if(id.includes(user_id) && match_progress == "ENDED"){
        return true
      }
      else{
        return false
      }
    },
    
  
  }
}
</script>

<style lang="scss" scoped>
.text{
  color: white;
}
.card{
  margin-left: 500px;
  margin-right: 500px;
  background-color: #484848;
  height: 225px;
}
.image{
  width: 180px;
  margin-left: 20px;
}
.content{
  position: relative;
  top: -115px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
.styled-table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr th{
    background-color: #484848;
    text-align: center;
    color: white;
}
.styled-table th, .styled-table td {
    padding: 12px 15px;
    text-align: center;
    
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #484848;
}

h1{
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
}

</style>