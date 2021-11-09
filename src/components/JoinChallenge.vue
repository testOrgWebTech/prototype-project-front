<template>
  <div class="card draft">
    <div class="card-content" v-if="this.challenge">
      <p >This challenge mode is {{ this.challenge.mode }}</p>
      <b-field v-if="checkMode()">
        <b-select
          placeholder="Select Your Team"
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

      <div v-if="this.selectedTeam !== null">
        <b-field  v-for="(email, index) in selectedTeamPlayer" :key="index">
          <b-checkbox
            v-model="selectedPlayer"
            :native-value="email"
          >
            {{ email }}
          </b-checkbox>
        </b-field>
      </div>
      <div class='btn'>
        <b-button type="is-primary is-light" @click="join"> Join </b-button>
      </div>
      <b-loading v-model="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>
import ChallengeService from "@/services/ChallengeService";
import TeamApiStore from "@/store/TeamApi";
import AuthUser from "@/store/AuthUser";
import ChallengeStore from "@/store/ChallengeApi";
export default {
  data() {
    return {
      teams: [],
      teamWithUser: [],
      selectedTeam: null,
      selectedTeamPlayer: [],
      selectedPlayer: [AuthUser.getters.user.email],
      isLoading: true,
      challenge: null,
    };
  },
  props: {
    id: null,
    challenge_id: null,
  },
  methods: {
    showData() {
      //   console.log(this.challenge);
    },
    async findChallenge() {
      this.isLoading = true;
      this.challenge = await ChallengeService.getChallengeById(
        this.$props.challenge_id
      );
      this.isLoading = false;
    },
    async fetchTeam() {
      this.isLoading = true;
      await TeamApiStore.dispatch("fetchTeams");
      this.teams = TeamApiStore.getters.teams;
      let user_id = AuthUser.getters.user.id;
      if (user_id) {
        this.teams.forEach((team) => {
        let array = team.users_id.split(', ')
        if (
          array.includes(user_id.toString()) &&
          team.id !== this.challenge.teamA_id
        ) {
          this.teamWithUser.push(team);
        }
        });
      }
      
      this.isLoading = false;
    },
    selectTeam() {
      this.selectedTeamPlayer = [];
      let stringArray = this.selectedTeam.users_email.trim().split(", ");
      let idTeamBArray = this.selectedTeam.users_id.split(', ')
      let idTeamAArray = this.challenge.teamA_players_id.split(', ')

      for (let j = 0; j < idTeamBArray.length; j++) {
        if (stringArray[j] !== AuthUser.getters.user.email && !idTeamAArray.includes(idTeamBArray[j].toString())) {
          this.selectedTeamPlayer.push(stringArray[j]);
        }
      }

    },
    checkMode() {
      if (this.challenge.mode[0] === "1") {
        return false;
      }
      return true;
    },
    async join() {
      if (this.selectedPlayer.length > this.challenge.mode[0]) {
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
      } else if (this.selectedPlayer.length < this.challenge.mode[0]) {
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
        //update challenge and delete post
        let player = this.selectedPlayer.join(", ");
        let payload;
        if (this.challenge.mode[0] === "1") {
          payload = {
            id: this.$props.challenge_id,
            teamB_id: "",
            teamB_name: AuthUser.getters.user.name,
            players: player,
            player_team: "teamB",
          };
        } else {
          payload = {
            id: this.$props.challenge_id,
            teamB_id: this.selectedTeam.id,
            teamB_name: this.selectedTeam.name,
            players: player,
            player_team: "teamB",
          };
        }
        await ChallengeStore.dispatch("editChallenge", payload);
        this.$emit("fetchPost");
        this.$emit("closeCreate");
        this.$router.go(0);
      }
    },
  },
  created() {
    this.findChallenge();
    this.fetchTeam();
  },
};
</script>

<style lang="scss" scoped>
.btn{
  text-align: right;
}
</style>