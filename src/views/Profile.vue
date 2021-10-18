<template>
  <div>
    <div class="modal">
      <b-modal
        :active.sync="showCreateModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <MessagePost
          :receiver_id="this.$route.params.id"
          :username="this.user.data.name"
        ></MessagePost>
      </b-modal>
    </div>

    <div class="card">
      <div class="card-content">
        <figure class="is-128x128 is-rounded">
          <img class="image is-rounded" :src="image" />
        </figure>
        <div class="content">
          <h1 class="text">{{ this.user.data.name }}</h1>
          <br />
          <h1 class="text">{{ this.user.data.email }}</h1>
        </div>
      </div>
    </div>

    <div class="container" v-if="notMyself()">
      <b-button
        class="b-buttoncolor"
        label="Send a Message"
        size="is-medium"
        @click="showCreateModal = true"
      />
    </div>

    <br />
    <h1 class="chText">Challenges History</h1>

    <div class="divBtn">
      <button class="button text" @click="showHistory()">Show</button>
    </div>

    <br />
    <br />
    <table class="styled-table" v-if="this.show">
      <thead>
        <tr>
          <th>Location</th>
          <th>Players Team A</th>
          <th>Players Team B</th>
          <th>Mode</th>
          <th>Victory Team</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody v-for="(cha, index) in challenges" :key="index">
        <tr v-if="checkCha(cha.users_id, cha.match_progress)">
          <td>{{ cha.location }}</td>
          <td>{{ cha.teamA_players_name }}</td>
          <td>{{ cha.teamB_players_name }}</td>
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
import ChallengeApiStore from "@/store/ChallengeApi";
import AuthUser from "@/store/AuthUser";
import MessagePost from "../components/MessagePost";
import Axios from "axios";

export default {
  name: "Dashboard",
  components: {
    Topbar,
    MessagePost,
  },

  data() {
    return {
      challenges: [],
      user: [],
      image: "",
      show: false,
      showCreateModal: false,
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.user = await Axios.get("http://localhost:8000/api/users/" + this.id);
    this.fetchData();
    this.showUser();
  },
  methods: {
    async fetchData() {
      await ChallengeApiStore.dispatch("fetchChallenges");
      this.challenges = ChallengeApiStore.getters.challenges;
    },

    checkCha(id, match_progress) {
      let user_id = AuthUser.getters.user.id.toString();
      if (id.includes(user_id) && match_progress == "ENDED") {
        return true;
      } else {
        return false;
      }
    },

    showUser() {
      // this.user = AuthUser.getters.user
      this.image = "http://localhost:8000" + this.user.imagePath;
      console.log(this.user);
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
    notMyself() {
      return this.id != AuthUser.getters.user.id;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin-top: 30px;
  //margin-left: 500px;
  //margin-right: 500px;
  background-color: #484848;
  height: 225px;
  text-align: center;
}
.image {
  width: 180px;
  margin-left: 20px;
  height: 180px;
  border-radius: 50%;
}
.content {
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
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

.chText {
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}

.button {
  background-color: #f15858;
}
.button:hover {
  color: #484848;
  cursor: pointer;
}
.text {
  color: white;
}

.divBtn {
  text-align: center;
  padding-top: 30px;
}
.b-buttoncolor {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  border: #484848;
  background-color: #f15858;
  color: white;
}
</style>