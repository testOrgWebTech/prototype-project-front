<template>
  <div class="card">
    <h1 class="title">Setting Team</h1>
    <div class="form">
      <section>
        <b-field label="Name" horizontal>
          <b-input v-model="form.name" class="in"></b-input>
        </b-field>

        <b-button class="is-success" @click="editTeamName()"> Edit </b-button>
        <b-field horizontal> Enter email separated by "," </b-field>

        <b-field label="Add Member" horizontal>
          <b-input
            v-model="form.users_add"
            class="in"
            placeholder="example1@gmail.com,example2@gmail.com"
          ></b-input>
        </b-field>
        <b-button class="is-success" @click="addMember()"> Add </b-button>

        <div class="deleteBlock">
          <b-field label="Delete Member">
            <b-field>
              Check the box in front of player's email you want to kick out of
              team</b-field
            >
            <b-checkbox
              v-model="form.checkbox_users_delete"
              type="is-danger"
              v-for="(player, index) in teamPlayers"
              :key="index"
              :native-value="player.email"
            >
              {{ player.email }}
            </b-checkbox>
          </b-field>
          <b-button class="is-danger" @click="deleteMember()">
            Delete
          </b-button>
        </div>
        <b-button class="leave is-danger" @click="deleteYourself()">
            Leave Team
          </b-button>
      </section>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import TeamService from "@/services/TeamService";
import TeamApiStore from "@/store/TeamApi";
import AuthUser from "@/store/AuthUser";
import swal from "sweetalert";

export default {
  components: {
    Topbar,
  },
  data() {
    return {
      id: "",
      team: null,
      teamPlayers: [],
      isLoading: false,
      form: {
        name: "",
        users_add: "",
        users_delete: "",
        checkbox_users_delete: [],
      },
    };
  },
  async created() {
    this.isLoading = true;
    this.id = this.$route.params.id;
    this.team = await TeamService.getTeamById(this.id);
    if (!this.isTeamMember()) {
      swal("Restricted Area", "You do not have permision.", "warning");
      this.$router.push("/");
      this.isLoading = false;
    }
    this.form.name = this.team.name;
    this.showMemberCanDelete()
    this.isLoading = false;
  },
  mounted() {},
  methods: {
    showMemberCanDelete(){
      this.team.users.forEach(user => {
        if(user.email !== AuthUser.getters.user.email){
          this.teamPlayers.push(user.email)
        }
      });
    },
    isTeamMember() {
      if (this.team.users_id.includes(AuthUser.getters.user.id)) {
        return true;
      } else {
        return false;
      }
    },

    async editTeamName() {
      let payload = {
        id: this.id,
        name: this.form.name,
      };
      let res = await TeamApiStore.dispatch("editTeam", payload);
      if (this.form.name === "") {
        this.$buefy.toast.open("Name field is required!!");
      } else {
        if (res.success) {
          this.$buefy.toast.open("Edit Team Name Success");
          this.$router.push("/showTeam/" + this.id);
        } else {
          this.$buefy.toast.open("The name has already been taken.");
        }
      }
    },

    async addMember() {
      let payload = {
        id: this.id,
        name: this.form.name,
        users: this.form.users_add,
        option: "add",
      };
      if (this.form.users_add === "") {
        this.$buefy.toast.open("Add Member field is required!!");
      } else {
        let res = await TeamApiStore.dispatch("editTeam", payload);
        if (res.success) {
          this.$buefy.toast.open("Add Member Success");
          this.$router.push("/showTeam/" + this.id);
        } else {
          this.$buefy.toast.open("Please fill in the blanks correctly.");
        }
      }
    },
    async deleteMember() {
      // console.log(this.form.checkbox_users_delete);
      this.arrayToString();
      let payload = {
        id: this.id,
        name: this.form.name,
        users: this.form.users_delete,
        option: "delete",
      };
      if (this.form.users_delete === "") {
        this.$buefy.toast.open("Delete Member checked box is required!!");
      } else {
        let res = await TeamApiStore.dispatch("editTeam", payload);
        if (res.success) {
          this.$buefy.toast.open("Delete Member Success");
          this.$router.push("/showTeam/" + this.id);
        } else {
          this.$buefy.toast.open("Please fill in the checkbox correctly.");
        }
      }
    },
    async deleteYourself(){
      this.form.users_delete = AuthUser.getters.user.email
      let payload = {
        id: this.id,
        name: this.form.name,
        users: this.form.users_delete,
        option: "delete",
      };
      if (this.form.users_delete === "") {
        this.$buefy.toast.open("Delete Member checked box is required!!");
      } else {
        let res = await TeamApiStore.dispatch("editTeam", payload);
        if (res.success) {
          this.$buefy.toast.open("Delete Member Success");
          this.$router.push("/");
          this.$router.go(0)
        } else {
          this.$buefy.toast.open("Please fill in the checkbox correctly.");
        }
      }
    },
    arrayToString() {
      this.form.checkbox_users_delete.forEach((string) => {
        this.form.users_delete += string + ", ";
        // console.log(this.form.users_delete);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.leave{
  margin: 20px;
}
.deleteBlock {
  margin-top: 80px;
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.in {
  width: 85%;
}
h1 {
  font-size: 50px;
  padding: 10px;
  text-align: center;
}
.form {
  text-align: center;
}
.title {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>