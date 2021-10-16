<template>
<div>
  <Topbar/>
  <h1>Edit Team</h1>
     <div>
      <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name" class="in"></b-input>
      </b-field>
      <b-field horizontal>
          Enter email separated by ","
      </b-field>
      <b-field label="Add Member" horizontal>
        <b-input v-model="form.users_add" class="in"></b-input>
      </b-field>
      <b-button class="is-success" @click="editTeam()"> Edit </b-button>

      <b-field horizontal>
          Enter email separated by ","
      </b-field>
    <b-field label="Delete Member" horizontal>
        <b-input v-model="form.users_delete" class="in"></b-input>
      </b-field>
      <b-button class="is-danger" @click="deleteMember()"> Delete </b-button>
    </section>
    </div>
</div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import TeamService from "@/services/TeamService"
import TeamApiStore from "@/store/TeamApi";
export default {
  components:{
        Topbar,
    },
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

<style lang="scss" scoped>
.in{
  width: 85%;
}
h1{
  font-size: 50px;
  padding: 10px;
}
</style>