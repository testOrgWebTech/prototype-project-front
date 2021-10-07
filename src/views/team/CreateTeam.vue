<template>
  <div>
      <h1 class="title is-1">Create Team</h1>

      <div class="form">
    <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name"></b-input>
      </b-field>

      <b-button class="button is-danger" tag="router-link" to="/">
        Cancel
      </b-button>

      <b-button @click="create" class="is-success"> Create </b-button>
    </section>
  </div>
      
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import TeamStore from "@/store/Team";
import swal from 'sweetalert';
export default {
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
          let res = await TeamStore.dispatch("addTeam", this.form)
          if (res.success) {
                swal("Create Team Success", "","success")
                this.$router.push('/')   
            } else {
                swal("Create Team Failed", res.message, "error")
            }
      }
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin: 100px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
}

</style>