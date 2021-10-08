<template>
  <div>
      <h1 class="title is-1">Team {{form.name}}</h1>
      <h4 class="subtitle is-4">Team member</h4>
      <div v-for="(name, index) in this.form.users" :key="index">
          {{name}}
      </div>
      <br>
      <br>
      <router-link :to="{name: 'EditTeam',params:{ id: this.id}}"> Edit team </router-link>

    
      
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

</style>