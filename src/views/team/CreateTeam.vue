<template>
  <div>
    <Topbar/>
      <h1>Create Team</h1>

      <div class="form">
    <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name" class="in"></b-input>
      </b-field>

      <b-button class="button is-danger" tag="router-link" to="/">
        Cancel
      </b-button>

      <b-button @click="create()" class="is-success"> Create </b-button>
    </section>
  </div>
      
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import AuthUser from "@/store/AuthUser";
import TeamApiStore from "@/store/TeamApi";
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
          await TeamApiStore.dispatch("addTeam", this.form)
          this.$router.push('/')
      }
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
}

</style>