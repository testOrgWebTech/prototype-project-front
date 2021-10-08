<template>
<div>
     <div>
      <h2 class="title is-2">Edit Team</h2>
      <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name"></b-input>
      </b-field>
      <b-field horizontal>
          Enter a name separated by ","
      </b-field>
      <b-field label="Add Member" horizontal>
        <b-input v-model="form.users"></b-input>
      </b-field>

      

      <b-button class="is-success" @click="editTeam()"> Edit </b-button>
    </section>
    </div>
</div>
</template>

<script>
import TeamService from "@/services/TeamService"
import TeamStore from "@/store/Team";
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
        console.log(team)
        this.form.name = team.name
        this.form.users = team.users_name
    },
    methods:{
      async editTeam(){
        let payload ={
          id: this.id,
          name: this.form.name,
          users: this.form.users
        }
        let res = await TeamStore.dispatch("editTeam", payload)
        if (res.success) {
                swal("Edit Team Success", "","success")
                this.$router.push('/showTeam/' + this.id)   
            } else {
                swal("Edit Team Failed", res.message, "error")
            }
        
      },
      cancle(){
          this.$router.push('/showTeam/'+ this.id)
      }
      
    }
}
</script>

<style>

</style>