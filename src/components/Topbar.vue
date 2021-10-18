<template>
  <b-navbar class="topbar">
    <template #start>
      <b-navbar-item class="text" href="#" tag="router-link" to="/">
        Home
      </b-navbar-item>
      <b-navbar-dropdown type="success" label="Teams" v-if="userId">
        <b-navbar-item href="/createTeam"> Create </b-navbar-item>
        <b-navbar-item
          v-for="(team, index) in teams"
          :key="index"
          @click="$router.push('/showTeam/' + team.id)"
        >
          {{ team.name }}
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item class="text" href="#" tag="router-link" to="/aboutUs">
        About us
      </b-navbar-item>
      <b-navbar-item class="text" href="#" tag="router-link" to="/contract">
        Contract
      </b-navbar-item>
      <b-navbar-item href="/message" v-if="isAuthen()">Message</b-navbar-item>
    </template>

    <template #end>
      <b-button
        class="text button buttonTopbar"
        v-if="!isAuthen()"
        tag="router-link"
        to="/signUp"
      >
        Sign up
      </b-button>

      <div class="iconProfile">
        <router-link v-if="isAuthen()" :to="`/profile/${userId}`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-person-circle personIcon"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </router-link>
      </div>

      <b-button class="text buttonTopbar" v-if="isAuthen()" @click="logout">
        Logout
      </b-button>

      <div class="buttonTopbar login" v-if="!isAuthen()">
        <Login />
      </div>
    </template>
    <b-loading v-model="isLoading"></b-loading>
  </b-navbar>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import AuthUser from "@/store/AuthUser";
import TeamApiStore from "@/store/TeamApi";
import Team from "@/components/Team";
import CategoryStore from "@/store/Category";

export default {
  name: "Topbar",
  components: {
    Login,
    Team,
  },
  props: ["id"],
  data() {
    return {
      open: false,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      teams: null,
      isLoading: false,
      userId: AuthUser.getters.user.id,
    };
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
      
    },
    async logout() {
      this.isLoading = true;
      await AuthUser.dispatch("logout");
      this.isLoading = false;
      //await this.$router.push("/");
      //await this.$router.go(0);
      this.$buefy.toast.open("Logout Success!!");
    },
    async fetchTeam() {
      this.isLoading = true;
      await TeamApiStore.dispatch("fetchTeams");
      this.teams = await TeamApiStore.getters.teams;
      this.isLoading = false;
    },
  },
  created() {
    this.fetchTeam();
  },
};
</script>

<style lang="scss" scoped>
//$sidebar-background: #484848;

/*.text {
  color: #484848;
}*/
.login {
  border-radius: 7.5%;
  margin-bottom: 7px;
}
.topbar {
  //background-color: #484848;
  border-bottom: 1px solid #cccccc;
}
.buttonTopbar {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  //border: #484848;
  background-color: #896bda;
}
.iconProfile {
  position: absolute;
  right: 100px;
  top: 8.5px;
}
</style>