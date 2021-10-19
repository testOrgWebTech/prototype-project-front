<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h1 class="title">Create Team</h1>
        <div class="form">
          <section>
            <b-field horizontal>
              <b-input
                v-model="form.name"
                class="in"
                placeholder="Name"
              ></b-input>
            </b-field>

            <div class="divBtn">
              <b-button
                class="button is-danger"
                @click="$emit('closeCreateTeam')"
              >
                Cancel
              </b-button>

              <b-button @click="create()" class="is-success"> Create </b-button>
            </div>
          </section>
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

export default {
  components: {
    Topbar,
  },

  data() {
    return {
      form: {
        name: "",
        user_id: AuthUser.getters.user.id,
      },
      isLoading: false,
    };
  },
  methods: {
    async create() {
      this.isLoading = true;
      let res = await TeamApiStore.dispatch("addTeam", this.form);
      this.isLoading = false;
      if (this.form.name === "") {
        this.$buefy.toast.open("Please input team name!!");
      } else {
        if (res.success) {
          this.$buefy.toast.open("Create Team Success!!");
          this.$router.push("/");
          this.$router.go(0);
        } else {
          this.$buefy.toast.open("The name has already been taken!!");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 35px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
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
  text-align: center;
  padding-top: 20px;
}
.card {
  margin-top: 30px;
  height: 40%;
  width: 80%;
  text-align: center;
}
.title {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
.content {
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
</style>