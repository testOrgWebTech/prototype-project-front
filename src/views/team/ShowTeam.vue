<template>
  <div>
      <Topbar/>
      <h1>Team {{form.name}}</h1>
      <h2>Member</h2>

      <div class="name">
          <div v-for="(name, index) in this.form.users" :key="index">
          {{name}}
            </div>
      </div>
      

      <br>
      <br>
      <router-link class="editTeamBtn" :to="{name: 'EditTeam',params:{ id: this.id}}"> Edit Team </router-link>
    
      
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import TeamService from "@/services/TeamService"
export default {
    components:{
        Topbar,
    },
    data(){
        return{

            id: '',

            form: {
                name: '',
                users:'',
            },
        }
    },

    async created(){
        this.id = this.$route.params.id
        let team = await TeamService.getTeamById(this.id)
        this.form.name = team.name
        this.form.users = team.users_name.split(",")
    },
}
</script>

<style scoped lang="scss">
.editTeamBtn{
    background-color: #f15858;
    border: #484848;
    margin-top: 20px;
    padding: 15px;
    text-decoration-line: none;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 5%;
    color: white;
}
.editTeamBtn:hover{
  color: black;
  cursor: pointer;
}
.name{
    font-size: 130%;
    padding-top: 10px;
}
h1{
    font-size: 50px;
}
h2{
    font-size: 35px;
}
</style>