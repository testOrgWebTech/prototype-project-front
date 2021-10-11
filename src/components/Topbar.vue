<template>
  <b-navbar class="topbar">
    <template #brand>
      <section>
        <b-sidebar 
          type="is-light"
          :fullheight="fullheight"
          :fullwidth="fullwidth"
          :overlay="overlay"
          :right="right"
          v-model="open"
        >
          <div class="p-1">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
            <b-menu>
              
              <Team/>
            </b-menu>
            
          </div>
        </b-sidebar>
        <b-button class="text buttonTopbar" @click="open = true">Show sidebar</b-button>
      </section>
    </template>
    <template #start>
      <b-navbar-item class="text" href="#" tag="router-link" to="/"> Home </b-navbar-item>
      <b-navbar-item class="text" href="#"> Documentation </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#"> About </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-button class="text button buttonTopbar" v-if="!isAuthen()" tag="router-link" to="/signUp">
        Sign up
      </b-button>

      <div class="iconProfile">
        <router-link v-if="isAuthen()" to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle personIcon" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </router-link>
      </div>

      
      <b-button class="text buttonTopbar" v-if="isAuthen()" @click="logout">
        Logout
      </b-button>

      
      <div class="buttonTopbar login" v-if="!isAuthen()" >
        <Login />
      </div>
    </template>
  </b-navbar>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import AuthUser from "@/store/AuthUser";
import TeamApiStore from "@/store/TeamApi";
import Team from "@/components/Team";
export default {
  name: "Topbar",
  components: {
    Login,
    Team
  },
  data() {
    return {
      open: false,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
    };
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    logout() {
      AuthUser.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.text{
  color: white;
}
.login{
  border-radius: 7.5%;
  margin-bottom: 7px;
}
.topbar{
  background-color: #484848;
}
.buttonTopbar{
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  border: #484848;
  background-color: #f15858;
}
.iconProfile{
  position: absolute;
  right: 100px;
  top: 8.5px;
}
</style>
