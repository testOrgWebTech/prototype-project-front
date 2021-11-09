<template>
  <div class="bg">

    <div class="">
      <b-modal
          :active.sync="showMessageModal"
          :can-cancel="['escape', 'x', 'outside']"
      >
        <div class="card-content">
          <MessagePost
              :receiver_id="this.$route.params.id"
              :username="sendName"></MessagePost>
        </div>

      </b-modal>
    </div>

    <div class="card Info">
      <div class="card-content wow " style="background-color: #484848">
        <figure class="is-128x128 is-rounded">
          <img class="image is-rounded" :src="image" />
        </figure>
        <div class="content">
          <h1 class="text has-text-white">{{ sendName }}</h1>
          <p class="subtitle has-text-white">{{ sendEmail }}</p>
          <div v-if="user.data">
            <div v-if="user.data.status==='INACTIVE'" style="color: red">
              This user has been suspended due to violation of term of services.
            </div>
          </div>
        </div>
        <br>
        <p class="subtitle has-text-white" style="white-space: pre">{{ sendDetail }}</p>
        
        <div class="card-content is-bottom-right" id="sendMsg">
          <b-button
            type="is-primary"
            class=""
            label="Send Message"
            size="is-medium"
            @click="logAll()"
            v-if="notMyself()"
          />
        </div>

        <b-modal
          :active.sync="showEditDetailUserModal"
          :can-cancel="['escape', 'x', 'outside']"
        >
          <EditDetailUser 
          class="post" 
          @closeEditDetailUser="showEditDetailUserModal = false"
          :value="sendDetail"
          >
          </EditDetailUser>
        </b-modal>

        <div class="editDetailBtn">
          <b-button 
          type="is-primary"
          @click="showEditDetailUserModal = true"
          v-if="myself()"
          >Edit Detail</b-button>
        </div>
      </div>
    </div>


    <br />


    <br />
    <div class="card" v-if="user">
      <div class="card-content" style="text-align: center">
        <h1 class="title">Challenges History</h1>
        <section>
        <table  align="center">
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
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import ChallengeApiStore from "@/store/ChallengeApi";
import AuthUser from "@/store/AuthUser";
import MessagePost from "../components/MessagePost";
import EditDetailUser from '@/components/EditDetailUser';
import Axios from "axios";

export default {
  name: "Dashboard",
  components: {
    Topbar,
    MessagePost,
    EditDetailUser,
  },
  data() {
    return {
      challenges: [],
      user: [],
      image: "",
      sendName: '',
      sendEmail: '',
      sendDetail: '',
      show: false,
      showMessageModal: false,
      showEditDetailUserModal: false,
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.user = await Axios.get("http://localhost:8000/api/users/" + this.id);
    this.sendName = this.user.data.name;
    this.sendEmail = this.user.data.email;
    this.sendDetail = this.user.data.detail;
    this.fetchData();
    this.showUser();
  },
  methods: {
    logAll(){
      this.showMessageModal = true;
    },
    async fetchData() {
      await ChallengeApiStore.dispatch("fetchChallenges");
      this.challenges = await ChallengeApiStore.getters.challenges;
    },

    checkCha(id, match_progress) {
      let user_id = AuthUser.getters.user.id;
      let array = id.split(', ')
      if (array.includes(user_id.toString()) && match_progress == "ENDED") {
        return true;
      } else {
        return false;
      }
    },

    showUser() {
      // this.user = AuthUser.getters.user
      this.image = "http://localhost:8000" + this.user.data.imagePath;
      // console.log(this.user);
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
    myself(){
      return this.id == AuthUser.getters.user.id;
    }
  },
};
</script>

<style scoped lang="scss">
.Info{
  border-radius: 8%;
}
.card {
  margin-top: 30px;
  //margin-left: 500px;
  //margin-right: 500px;
  //background-color: #484848;
  height: 40%;
  width: 80%;
  //text-align: center;

}
.title{
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
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
/*.styled-table {
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
}*/

 tr th{
  padding: 20px;
}
table {
    table-layout: fixed;
    width: 100%;
}

.chText {
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.button:hover {
  color: #484848;
  cursor: pointer;
}
.text {
  color:black;
}

.divBtn {
  text-align: center;
  padding-top: 30px;
}
.wow {
  position: relative;
}
#sendMsg{
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.editDetailBtn{
  text-align: right;
}

</style>