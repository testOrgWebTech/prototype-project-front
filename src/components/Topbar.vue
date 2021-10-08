<template>
  <b-navbar>
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
        <b-button @click="open = true">Show sidebar</b-button>
      </section>
    </template>
    <template #start>
      <b-navbar-item href="#"> Home </b-navbar-item>
      <b-navbar-item href="#"> Documentation </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#"> About </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-button
        class="is-primary"
        v-if="!isAuthen()"
        tag="router-link"
        to="/signUp"
      >
        <strong>Sign up</strong>
      </b-button>

      <b-button class="is-primary" v-if="isAuthen()" @click="logout">
        <strong>Logout</strong>
      </b-button>
      
      <div v-if="!isAuthen()">
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

<style scoped lang="scss">
