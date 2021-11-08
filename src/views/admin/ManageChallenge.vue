<template>
  <div>
      <div id="tableBoard">
      <table
        class="
          table
          is-hoverable
          is-bordered
          is-striped
          is-narrow
          is-hoverable
          is-fullwidth
        "
      >
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Tag</th>
            <th>Team A</th>
            <th></th>
            <th>Team B</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, index) in waitingCha" v-bind:key="index">
            
            <td>
              <b-modal
                :active.sync="showPostModal"
                :can-cancel="['escape', 'x', 'outside']"
              >
                <div class="card" id="postModal">
                    <Post id="postModal" :post="c.post"></Post>
                  
                </div>
              </b-modal>
              <b-button @click="showPostModal= true; loga(c)" type="is-text">
                {{c.post_id}}
              </b-button>
            </td>

            <td>
              <b-tag type="is-info">{{ c.post.category_name }}</b-tag>
            </td>

            <td>{{ c.teamA_name }}</td>

            <td>VS</td>

            <td>{{ c.teamB_name }}</td>

            <td>
              <b-button class="A" type="is-info" @click="teamWin(c, 'A')">TeamA win</b-button>
              <b-button type="is-danger" @click="teamWin(c, 'B')">TeamB win</b-button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ChallengeApi from '@/store/ChallengeApi'
import Post from '@/components/Post'
export default {
  components:{
    Post
  },
  data() {
    return {
      waitingCha: [],
      challenges: null,
      showPostModal: false
    };
  },
  created() {
  this.fetchChallenges();
  },
  methods: {
    loga(c){
      console.log(c.post);
    },
    async fetchChallenges(){
      await ChallengeApi.dispatch("fetchChallenges")
      this.challenges = ChallengeApi.getters.challenges
      this.challenges.forEach(cha => {
        if (cha.teamB_name !== null && cha.match_progress === 'WAITING') {
          this.waitingCha.push(cha)
        }
      });
    },
    async teamWin(c, teamWin){
      let mes
      if (teamWin === "A") {
        mes = c.teamA_name
      }
      else{
        mes = c.teamB_name
      }
      this.$buefy.dialog.confirm({
      message: "Team " + mes + " Win?",
      onConfirm: async () => {
          let payload = {
            id: c.id,
            victoryTeam: teamWin
          };
          console.log(payload);
          let res = await ChallengeApi.dispatch("updateTeamWin", payload)
          console.log(res);
          this.$buefy.toast.open("Team "+ mes + " won.");
          this.$router.go(0)
        },
      });
      
    }
  }
}
</script>

<style lang="scss" scoped>
#tableBoard {
  .table {
    margin-top: 50px;
    width: 75%;
    text-align: center;
    padding-top: 2em;
    margin-left: auto;
    margin-right: auto;
  }
}
.A{
  margin-right: 20px;
}
#postModal{
  text-align: left;
  width: 100%;
}
</style>

