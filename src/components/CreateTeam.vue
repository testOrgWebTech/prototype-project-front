<template>
  <div>
    <div class="card">
      <div class="card-content">
        <b-field label="Team name" style="width: 50%">
          <b-input
            required
            v-model="form.name"
            placeholder="Your team name"
          ></b-input>
        </b-field>

        <b-field label="Add member">
          <b-dropdown
            v-model="form.selectedPlayers"
            multiple
            aria-role="list"
            scrollable
          >
            <template #trigger>
              <b-button icon-right="menu-down"> Select players </b-button>
            </template>

            <b-dropdown-item
              v-for="(user, index) in users"
              :key="index"
              :value="user.id"
              aria-role="listitem"
            >
              <span>{{ user.name }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </b-field>

        <b-field label="Detail">
          <b-input
            required
            maxlength="300"
            type="textarea"
            v-model="form.detail"
          ></b-input>
        </b-field>

        <div  class="btn" >
          <b-button type="is-primary is-light" @click="create"
          >Create Team</b-button
        >
        </div>
        
      </div>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>


<script>
import Topbar from "@/components/Topbar.vue";
import AuthUser from "@/store/AuthUser";
import TeamApiStore from "@/store/TeamApi";
import UserStore from "@/store/User";

export default {
  components: {
    Topbar,
  },

  data() {
    return {
      form: {
        name: "",
        detail: null,
        user_id: AuthUser.getters.user.id,
        selectedPlayers: [],
      },
      isLoading: false,
      users: null,
    };
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true;
      await UserStore.dispatch("fetchUsers");
      this.users = await UserStore.getters.users;
      this.users = this.users.filter((e) => {
        return e.id != AuthUser.getters.user.id;
      });
      this.isLoading = false;
    },
    async create() {
      if (Object.values(this.form).every((e) => e !== null && e !== "")) {
        try {
          this.isLoading = true;
          let res = await TeamApiStore.dispatch("addTeam", this.form);
          this.$buefy.toast.open("Create Team Success!!");
          //this.$router.push("/")
          this.$router.go(0);
          this.$emit('closeCreateTeam')
        } catch (e) {
          this.$buefy.toast.open("The name has already been taken!!");
        }
        this.isLoading = false;
      } else {
        this.$buefy.toast.open("Please input your team detail!!");
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
.btn{
  text-align: right;
}
</style>