<template>
  <div class="card draft">
    <div class="card-content">
      <b-field label="Detail">
        <b-select required v-model="selectCategory" placeholder="Category">
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category.name }}
          </option>
        </b-select>
        <b-select
          required
          v-model="challenge_form.selectMode"
          placeholder="Mode"
        >
          <option value="1v1">1 vs 1</option>
          <option value="2v2">2 vs 2</option>
          <option value="5v5">5 vs 5</option>
          <option value="6v6">6 vs 6</option>
          <option value="7v7">7 vs 7</option>
        </b-select>
      </b-field>

      <b-field label="Location">
        <b-input
          type="location"
          placeholder="Your location"
          v-model="challenge_form.location"
          required
        >
        </b-input>
      </b-field>
      <b-field label="Post">
        <b-input
          required
          maxlength="300"
          type="textarea"
          v-model="message"
        ></b-input>
      </b-field>

      <b-field
        v-if="
          challenge_form.selectMode !== null &&
          challenge_form.selectMode !== '1v1'
        "
        label="Team (Already included you)"
      >

        <b-select
          placeholder="Select a Team"
          v-model="selectedTeam"
          @input="selectTeam"
        >
          <option
            v-for="(team, index) in teamWithUser"
            :key="index"
            :value="team"
          >
              {{ team.name }}
          </option>
        </b-select>
      </b-field>

      <div 
        v-if="
          challenge_form.selectMode !== null &&
          challenge_form.selectMode !== '1v1' &&
          this.selectedTeam !== null
        ">
      <b-field
       v-for="(email, index) in selectedTeamPlayer"
          :key="index"
      >
        <b-checkbox
          v-model="selectedPlayer"
          
          :native-value="email"
        >
          {{ email }}
        </b-checkbox>
      </b-field>
      </div>
      <div class="btn">
        <b-button v-if="!selectedPost" type="is-primary is-light" @click="newPost"
          >Create Challenge</b-button
        >
        <b-button v-else type="is-primary is-light" @click="editPost"
          >Edit</b-button
        >
      </div>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import CategoryStore from "@/store/Category";
import PostStore from "@/store/Post";
import AuthUser from "@/store/AuthUser";
import ChallengeStore from "@/store/ChallengeApi";
import TeamApiStore from "@/store/TeamApi";

export default {
  data() {
    return {
      categories: null,
      selectCategory: null,
      message: null,
      challenge_form: {
        location: null,
        team_id: null,
        selectMode: null,
        teamA_players: "",
      },
      teams: [],
      selectedTeam: null,
      teamWithUser: [],
      selectedTeamPlayer: [],
      selectedPlayer: [AuthUser.getters.user.email],
      isLoading: null,
      id: null,
    };
  },
  props: {
    show: false,
    selectedPost: null,
    isEdit: null,
  },
  methods: {
    showData() {
      // console.log();
    },
    async fetchCategory() {
      this.isLoading = true;
      await CategoryStore.dispatch("fetchCategory");
      this.categories = await CategoryStore.getters.categories;
      this.isLoading = false;
    },
    async fetchTeam() {
      this.isLoading = true;
      await TeamApiStore.dispatch("fetchTeams");
      this.teams = TeamApiStore.getters.teams;
      this.checkTeam();
      this.isLoading = false;
    },
    checkTeam() {
      let user_id = AuthUser.getters.user.id;
      this.teams.forEach((team) => {
        let array = team.users_id.split(', ')
        if (array.includes(user_id.toString())) {
          this.teamWithUser.push(team);
        }
      });
    },
    selectTeam() {
      this.selectedTeamPlayer = [];
      let stringArray = this.selectedTeam.users_email.trim().split(", ");
      stringArray.forEach((string) => {
        if (string !== AuthUser.getters.user.email) {
          this.selectedTeamPlayer.push(string);
        }
      });
    },
    async newPost() {
      if (this.selectedPlayer.length > this.challenge_form.selectMode[0]) {
        this.$buefy.dialog.alert({
          title: "Error",
          message: "The selected player is more than the limit.",
          type: "is-danger",
          hasIcon: false,
          icon: "times-circle",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      } else if (
        this.selectedPlayer.length < this.challenge_form.selectMode[0]
      ) {
        this.$buefy.dialog.alert({
          title: "Error",
          message: "The selected player is less than the limit.",
          type: "is-danger",
          hasIcon: false,
          icon: "times-circle",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      } else {
        let payload = {
          message: this.message,
          //img: this.imageUrl,
          user_id: AuthUser.getters.user.id,
          category_id: this.selectCategory.id,
          mode: 'challenge'
        };
        this.isLoading = true;
        let post = await PostStore.dispatch("newPost", payload);
        await this.$buefy.toast.open("Post Challenge Success");
        this.isLoading = false;

        //after created post then create chellenge of this post.

        if (this.challenge_form.selectMode === "1v1") {
          this.challenge_form.teamA_players = AuthUser.getters.user.email;
          payload = {
            location: this.challenge_form.location,
            post_id: post.data.id,
            teamA_id: "",
            teamA_name: AuthUser.getters.user.name,
            match_progress: "WAITING",
            mode: this.challenge_form.selectMode,
            teamA_players: this.challenge_form.teamA_players,
            player_team: "teamA",
          };
        } else {
          this.challenge_form.team_id = this.selectedTeam.id;
          this.challenge_form.teamA_players = this.selectedPlayer.join(", ");
          payload = {
            location: this.challenge_form.location,
            post_id: post.data.id,
            teamA_id: this.challenge_form.team_id,
            teamA_name: this.selectedTeam.name,
            match_progress: "WAITING",
            mode: this.challenge_form.selectMode,
            teamA_players: this.challenge_form.teamA_players,
            player_team: "teamA",
          };
        }
        await ChallengeStore.dispatch("addChallenge", payload);
        this.$emit("fetchPost");
        this.$emit("closeCreate");
        this.$router.go(0);
      }
    },
    async editPost() {
      const payload = {
        id: this.id,
        message: this.message,
        //img: this.imageUrl,
        user_id: (await AuthUser.getters.user).id,
        category_id: this.selectCategory.id,
      };
      await PostStore.dispatch("editPost", payload);
      await this.$buefy.toast.open("Edit Success");
      this.$emit("fetchPost");
      this.$emit("closeEdit");
      this.$router.go(0);
    },
  },
  created() {
    this.fetchCategory();
    this.fetchTeam();
    if (this.isEdit) {
      this.message = this.selectedPost.message;
      this.id = this.selectedPost.id;
      //this.challenge_form.location = this.selectedPost.location;
    }
  },
  mounted() {

  },
};
</script>

<style>
.btn{
  text-align: right;
}
.card {
  width: 50%;
  margin: auto;
  margin-top: 30px;
}
.wow {
  flex-direction: column;
}
</style>