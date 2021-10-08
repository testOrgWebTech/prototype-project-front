<template>
<div>
     <div>
      <h2 class="title is-2">Edit Team</h2>
      <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name"></b-input>
      </b-field>
      <b-field horizontal>
          Enter email separated by ","
      </b-field>
      <b-field label="Add Member" horizontal>
        <b-input v-model="form.users_add"></b-input>
      </b-field>
      <b-button class="is-success" @click="editTeam()"> Edit </b-button>
    </section>

    <b-field horizontal>
          Enter email separated by ","
      </b-field>
    <b-field label="Delete Member" horizontal>
        <b-input v-model="form.users_delete"></b-input>
      </b-field>
      <b-button class="is-danger" @click="deleteMember()"> Delete </b-button>
    </div>
</div>
</template>

<script>
import TeamService from "@/services/TeamService"
import TeamApiStore from "@/store/TeamApi";
export default {
    data(){
        return{

            id: '',

            form: {
                name: '',
                users_add:'',
                users_delete:''
            },
        }
    },
    async created(){
        this.id = this.$route.params.id
        let team = await TeamService.getTeamById(this.id)
        this.form.name = team.name
        
    },
    methods:{
      async editTeam(){
        let payload ={
          id: this.id,
          name: this.form.name,
          users: this.form.users_add,
          option: "add"
        }
        await TeamApiStore.dispatch("editTeam", payload)
        this.$router.push('/showTeam/' + this.id)
        
      },

      async deleteMember(){
        let payload ={
          id: this.id,
          name: this.form.name,
          users: this.form.users_delete,
          option: "delete"
        }
        await TeamApiStore.dispatch("editTeam", payload)
        this.$router.push('/showTeam/' + this.id)
        
      },
      
      
    }
}
</script>

<style>

</style>