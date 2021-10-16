<template>
  <div class="card draft">
    <div class="card-content">
      <b-field label="detail">
        <b-select required v-model="selectCategory" placeholder="Category">
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category.name }}
          </option>
        </b-select>
        <b-select required v-model="challenge_form.selectMode" placeholder="Mode">
          <option value="1V1">1 vs 1</option>
          <option value="2V2">2 vs 2</option>
          <option value="5V5">5 vs 5</option>
          <option value="6V6">6 vs 6</option>
          <option value="7V7">7 vs 7</option>
        </b-select>
      </b-field>

      <b-field label="location">
        <b-input
          type="location"
          placeholder="Your location"
          v-model="challenge_form.location"
          required
        >
        </b-input>
      </b-field>
      <b-field label="post">
        <b-input required maxlength="300" type="textarea" v-model="message"></b-input>
      </b-field>

      <b-field>
        <b-select v-if="challenge_form.selectMode !== null && challenge_form.selectMode !== '1V1'" placeholder="Solo or Team" v-model="selectSoloOrTeam">
          <option :value="1">Solo</option>
          <option :value="2">Team</option>
        </b-select>
      </b-field>

      <b-field v-if="selectSoloOrTeam === 2 && challenge_form.selectMode !== null && challenge_form.selectMode !== '1V1'" label="Team">
          <b-select placeholder="Select a Team" v-model="selectedTeam" @input="selectTeam">
              <option
                v-for="(team, index) in teamWithUser" :key="index" 
                :value="team"
                >
                {{ team.name }}
              </option>
          </b-select>
      </b-field>

      <b-field v-if="selectSoloOrTeam === 2 && challenge_form.selectMode !== null && challenge_form.selectMode !== '1V1' && this.selectedTeam !== null ">
        <b-checkbox v-model="selectedPlayer" v-for="(email, index) in selectedTeamPlayer" :key="index" :native-value="email">
            {{ email }}
        </b-checkbox>
      </b-field>

      <b-button type="is-primary is-light" @click="newPost">
        Create Post
      </b-button>
    </div>
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
        teamA_players: '',
      },
      teams: [],
      selectedTeam: null,
      teamWithUser: [],
      selectSoloOrTeam: 1,
      selectedTeamPlayer: [],
      selectedPlayer: []
    };
  },
  props: {
    id: null,
    show: false,
    selectedPost: null,
  },
  created() {
    this.fetchCategory();
    this.fetchTeam();
  },
  methods: {
    async fetchCategory() {
      await CategoryStore.dispatch("fetchCategory");
      this.categories = await CategoryStore.getters.categories;
    },
    async fetchTeam(){
      await TeamApiStore.dispatch("fetchTeams");
      this.teams = TeamApiStore.getters.teams;
      this.checkTeam();
    },
    checkTeam(){
      let user_id = AuthUser.getters.user.id.toString();
      this.teams.forEach(team => {
        if(team.users_id.includes(user_id)){
          this.teamWithUser.push(team);
        }
      });
    },
    selectTeam(){
      this.selectedTeamPlayer = []
      let stringArray = this.selectedTeam.users_email.trim().split(', ')
      stringArray.forEach(string => {
        this.selectedTeamPlayer.push(string)
      });
    },
    async newPost() {
      if(this.selectedPlayer.length > this.challenge_form.selectMode[0]){
        this.$buefy.dialog.alert({
          title: 'Error',
          message: 'The selected player has more than the limit.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
      else{
        let payload = {
          message: this.message,
          //img: this.imageUrl,
          user_id: AuthUser.getters.user.id,
          category_id: this.selectCategory.id,
        };
        let post = await PostStore.dispatch("newPost", payload);
        await this.$buefy.toast.open("Post Success");

        //after created post then create chellenge of this post.
        
        if(this.selectSoloOrTeam === 1){
          this.challenge_form.teamA_players = AuthUser.getters.user.email
          payload = {
            location: this.challenge_form.location,
            post_id: post.data.id,
            teamA_id: null,
            match_progress: "WAITING",
            mode: this.challenge_form.selectMode,
            teamA_players: this.challenge_form.teamA_players,
            player_team: "teamA",
          };
        }
        else{
          this.challenge_form.team_id = this.selectedTeam.id
          this.challenge_form.teamA_players = this.selectedPlayer.join(', ')
          payload = {
            location: this.challenge_form.location,
            post_id: post.data.id,
            teamA_id: this.challenge_form.team_id,
            match_progress: "WAITING",
            mode: this.challenge_form.selectMode,
            teamA_players: this.challenge_form.teamA_players,
            player_team: "teamA",
          };
        }
        console.log("challenge", payload);
        await ChallengeStore.dispatch("addChallenge", payload);
        this.$emit("fetchPost");
        this.$emit("closeCreate");
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
      await this.$buefy.toast.open("Post Success");
      this.$emit("fetchPost");
      this.$emit("closeEdit");
    },
  },
  
  mounted() {},
};
</script>

<style>
.card {
  width: 50%;
  margin: auto;
  margin-top: 30px;
}
</style>