<template>
  <div>
      <h1 class="title is-1">Team {{form.name}}</h1>
      <h4 class="subtitle is-4">Team member</h4>
      <div v-for="(name, index) in this.form.users_name" :key="index">
          {{name}}
      </div>
      
              
              
          

  </div>
</template>

<script>
import TeamService from "@/services/TeamService"
export default {
    data(){
        return{

            id: '',

            form: {
                name: '',
                users_name:[],
            },
        }
    },
    async created(){
        this.id = this.$route.params.id
        let team = await TeamService.getTeamById(this.id)
        console.log(team)
        this.form.name = team.name
        this.form.users_name = team.users_name.split(",")
    },
    methods:{
  
    }
}
</script>

<style scoped lang="scss">

</style>