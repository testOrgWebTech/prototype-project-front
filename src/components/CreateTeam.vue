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

        <b-button type="is-primary is-light" @click="create"
          >Create Post</b-button
        >
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
<<<<<<< Updated upstream
.label {
  text-align: left;
}
.button {
  margin-top: 20px;
}
.in {
  width: 85%;
}
h1 {
  font-size: 50px;
  padding: 10px;
  text-align: center;
}
.divBtn {
  text-align: right;
}
.card {
  margin-top: 30px;
  height: 40%;
  width: 60%;
  text-align: center;
}
.title {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 10px;
}
.content {
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
=======
>>>>>>> Stashed changes
</style>