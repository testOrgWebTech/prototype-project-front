<template>
  <div>
      <h1>Create Team</h1>

      <div class="form">
    <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name" class="in"></b-input>
      </b-field>

      <div class="divBtn">
        <b-button class="button is-danger" tag="router-link" to="/">
          Cancel
        </b-button>

        <b-button @click="create()" class="is-success"> Create </b-button>
      </div>
    </section>
  </div>
      
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import AuthUser from "@/store/AuthUser";
import TeamApiStore from "@/store/TeamApi";
import swal from 'sweetalert';
export default {
  components:{
    Topbar
  },

    data() {
      return {
          form: {
          name: "",
          user_id: AuthUser.getters.user.id,
      },
    };
  },
  methods:{
      async create(){
          let res = await TeamApiStore.dispatch("addTeam", this.form)
          if(this.form.name === ''){
            swal("Create Team Failed", "Name field is required.", "error")
          }
          else{
            if(res.success){
              swal("Create Team Success", "","success")
              this.$router.push('/')
            }
            else{
              swal("Create Team Failed", "The name has already been taken.", "error")
            }
          }
          
          
      },
  }
}
</script>

<style lang="scss" scoped>
.form{
  margin: 35px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
}
.in{
  width: 85%;
}
h1{
  font-size: 50px;
  padding: 10px;
  text-align: center;
}
.divBtn{
    text-align: center;
    padding-top: 20px;
}

</style>