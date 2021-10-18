<template>
  <div>
    <h1>Team: {{ form.name }}</h1>
    <h2>Member</h2>

    <div class="name">
      <div v-for="(name, index) in this.form.users" :key="index">
        {{ name }}
      </div>
    </div>

    <div class="divBtn">
      <router-link
        class="editTeamBtn"
        :to="{ name: 'EditTeam', params: { id: this.id } }"
      >
        Edit Team
      </router-link>
    </div>

    <br />
    <br />

    <h2>Challenges History</h2>

    <div class="divBtn">
      <button class="button text" @click="showHistory()">Show</button>
    </div>
    <br />
    <br />
    <table class="styled-table" v-if="this.show">
      <thead>
        <tr>
          <th>Location</th>
          <th>Team A</th>
          <th>Team B</th>
          <th>Mode</th>
          <th>Victory Team</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody v-for="(cha, index) in challenges" :key="index">
        <tr
          v-if="
            checkCha(cha.teamA_id, cha.teamB_id, cha.match_progress, cha.mode)
          "
        >
          <td>{{ cha.location }}</td>
          <td>{{ cha.teamA_name }}</td>
          <td>{{ cha.teamB_name }}</td>
          <td>{{ cha.mode }}</td>
          <td>{{ cha.victory_team }}</td>
          <td>{{ showDate(cha.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import TeamService from "@/services/TeamService";
import ChallengeApiStore from "@/store/ChallengeApi";
export default {
  components: {
    Topbar,
  },
  data() {
    return {
      challenges: [],
      id: "",
      show: false,
      form: {
        name: "",
        users: "",
      },
    };
  },
  async created() {
    this.id = this.$route.params.id;
    let team = await TeamService.getTeamById(this.id);
    this.form.name = team.name;
    this.form.users = team.users_name.split(",");
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await ChallengeApiStore.dispatch("fetchChallenges");
      this.challenges = ChallengeApiStore.getters.challenges;
    },

    checkCha(id_A, id_B, match_progress, mode) {
      let team_id = this.id;
      if (
        id_A == team_id ||
        (id_B == team_id && match_progress == "ENDED" && mode !== "1v1")
      ) {
        return true;
      } else {
        return false;
      }
    },

    showDate(date) {
      let d = new Date(date);
      return d.toString().slice(4, 24);
    },
    showHistory() {
      if (this.show === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.editTeamBtn {
  background-color: #f15858;
  border: #484848;
  margin-top: 20px;
  padding: 10px;
  text-decoration-line: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 5%;
  color: white;
}
.editTeamBtn:hover {
  color: black;
  cursor: pointer;
}
.name {
  font-size: 130%;
  padding-top: 10px;
  text-align: center;
}
h1 {
  font-size: 50px;
  text-align: center;
}
h2 {
  font-size: 35px;
  text-align: center;
}

.styled-table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr th {
  background-color: #484848;
  text-align: center;
  color: white;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #484848;
}

.button {
  background-color: #f15858;
  position: relative;
}
.text {
  color: white;
}
.divBtn {
  text-align: center;
  padding-top: 30px;
}
</style>