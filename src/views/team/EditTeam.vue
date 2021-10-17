<template>
<div>
  <Topbar/>
  <h1>Edit Team</h1>
     <div class="form">
      <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name" class="in" ></b-input>
      </b-field>
      <b-button class="is-success" @click="editTeamName()"> Edit </b-button>
      <b-field horizontal>
          Enter email separated by ","
      </b-field>
      <b-field label="Add Member" horizontal>
        <b-input v-model="form.users_add" class="in" placeholder="example1@gmail.com,example2@gmail.com"></b-input>
      </b-field>
      <b-button class="is-success" @click="addMember()"> Add </b-button>

      <b-field horizontal>
          Enter email separated by ","
      </b-field>
    <b-field label="Delete Member" horizontal>
        <b-input v-model="form.users_delete" class="in" placeholder="example1@gmail.com,example2@gmail.com"></b-input>
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
import swal from 'sweetalert'
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
      async editTeamName(){
        let payload ={
          id: this.id,
          name: this.form.name,
        }
        let res = await TeamApiStore.dispatch("editTeam", payload)
        if(this.form.name === ''){
          swal("Edit Team Name Failed", "Name field is required.", "error")
        }
        else{
          if(res.success){
            swal("Edit Team Name Success", "","success")
            this.$router.push('/showTeam/' + this.id)
          }
          else{
            swal("Edit Team Name Failed", "The name has already been taken.", "error")
          }
        }
        
        
      },

      async addMember(){
        let payload = {
          id: this.id,
          name: this.form.name,
          users: this.form.users_add,
          option: "add"
        }
        if(this.form.users_add === ''){
          swal("Add Member Failed", "Add Member field is required.", "error")
        }
        else{
          let res = await TeamApiStore.dispatch("editTeam", payload)
          if(res.success){
            swal("Add Member Success", "","success")
            this.$router.push('/showTeam/' + this.id)
        }
          else{
            swal("Add Member Failed", "Please fill in the blanks correctly.", "error")
          }
        }
        
      },

      async deleteMember(){
        let payload ={
          id: this.id,
          name: this.form.name,
          users: this.form.users_delete,
          option: "delete"
        }
        if(this.form.users_delete === ''){
          swal("Delete Member Failed", "Delete Member field is required.", "error")
        }
        else{
          let res = await TeamApiStore.dispatch("editTeam", payload)
          if(res.success){
            swal("Delete Member Success", "","success")
            this.$router.push('/showTeam/' + this.id)
          }
          else{
            swal("Delete Member Failed", "Please fill in the blanks correctly.", "error")
          }
        }
      
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
  text-align: center;
}
.form{
  text-align: center;
}
</style>