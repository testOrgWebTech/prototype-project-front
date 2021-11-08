<template>
  <b-navbar class="topbar text" >
    <template #start>
      <b-navbar-item class="text" href="#" tag="router-link" to="/">
        Home
      </b-navbar-item>
      <b-navbar-dropdown type="is-primary" label="Teams" v-if="userId" style="color: white;">
        <b-navbar-item class="text"
          v-for="(team, index) in teamSelected"
          :key="index"
          @click="link(team.id)"
        >
          {{ team.name }}
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item class="text" href="#" tag="router-link" to="/contract">
        About Us
      </b-navbar-item>
      <b-navbar-item href="/message" v-if="isAuthen()" class="text">Message</b-navbar-item>
      <b-navbar-item href="/editCategory" v-if="auth.getters.user.role == 'ADMIN'" class="text">Edit Category</b-navbar-item>
      <b-navbar-item href="/manageUser" v-if="auth.getters.user.role == 'ADMIN'" class="text">Manage Users</b-navbar-item>
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

      <div dusk="login-dropdown" class="buttonTopbar login" v-if="!isAuthen()">
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
      auth: AuthUser,
      open: false,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      teams: null,
      isLoading: false,
      userId: AuthUser.getters.user.id,

      categories: null,
      teamSelected: [],
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
      this.$router.push("/");
      this.$router.go(0);
      this.$buefy.toast.open("Logout Success!!");
    },
    async fetchTeam() {
      this.isLoading = true;
      await TeamApiStore.dispatch("fetchTeams");
      this.teams = await TeamApiStore.getters.teams;
      let user_id = AuthUser.getters.user.id.toString();
      this.teams.forEach((team) => {
        if (team.users_id.includes(user_id)) {
          this.teamSelected.push(team);
        }
      });
      this.isLoading = false;
    },

    link(id) {
      this.$router.push({ name: "ShowTeam", params: { id: id } });
      this.$router.go("/showTeam/" + id);
    },
  },
  created() {
    this.fetchTeam();
  },
};
</script>

<style lang="scss" scoped>
//$sidebar-background: #484848;

.text {
  color: black;
}
.login {
  border-radius: 7.5%;
  margin-bottom: 7px;
}
.topbar {
  //background-color: #ffa990;
  //border-bottom: 1px solid #
  // cccccc;
  background-color: white;
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