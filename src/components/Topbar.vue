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
              <b-menu-list label="Menu">
                <b-menu-item
                  icon="information-outline"
                  label="Info"
                ></b-menu-item>
                <b-menu-item icon="settings">
                  <template #label="props">
                    Administrator
                    <b-icon
                      class="is-pulled-right"
                      :icon="props.expanded ? 'menu-down' : 'menu-up'"
                    ></b-icon>
                  </template>
                  <b-menu-item icon="account" label="Users"></b-menu-item>
                  <b-menu-item icon="cellphone-link">
                    <template #label>
                      Devices
                      <b-dropdown
                        aria-role="list"
                        class="is-pulled-right"
                        position="is-bottom-left"
                      >
                        <template #trigger>
                          <b-icon icon="dots-vertical"></b-icon>
                        </template>
                        <b-dropdown-item aria-role="listitem"
                          >Action</b-dropdown-item
                        >
                        <b-dropdown-item aria-role="listitem"
                          >Another action</b-dropdown-item
                        >
                        <b-dropdown-item aria-role="listitem"
                          >Something else</b-dropdown-item
                        >
                      </b-dropdown>
                    </template>
                  </b-menu-item>
                  <b-menu-item
                    icon="cash-multiple"
                    label="Payments"
                    disabled
                  ></b-menu-item>
                </b-menu-item>
                <b-menu-item icon="account" label="My Account">
                  <b-menu-item label="Account data"></b-menu-item>
                  <b-menu-item label="Addresses"></b-menu-item>
                </b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item
                  label="Expo"
                  icon="link"
                  tag="router-link"
                  target="_blank"
                  to="/expo"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="Actions">
                <b-menu-item label="Logout"></b-menu-item>
              </b-menu-list>
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
      <b-button class="is-primary" @click="editTeam">
        <strong>Test Edit Team</strong>
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

export default {
  name: "Topbar",
  components: {
    Login,
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
    async editTeam() {
      //this method just to test edit team
      let payload = {
        id: "1",
        //id team ที่จะแก้ไข
        name: "VueSuki",
        //team name 
        users: "dayana68@example.org, fshields@example.net",
        //add users by email
        option: "delete",
        //บอกว่าทำการลบหรือเพิ่มuserในteamด้วย keyword "add","delete"
      };
      await TeamApiStore.dispatch("editTeam", payload);
    },
  },
};
</script>

<style scoped lang="scss">
