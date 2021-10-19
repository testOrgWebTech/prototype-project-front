<template>
  <div>
    <div>
      <div class="container is-centered" id="create-button">
        <b-button
          class="level-right b-buttoncolor"
          label="New +"
          size="is-medium"
          @click="showCreateModal = true"
        />
      </div>

      <b-modal
        :active.sync="showCreateModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <div class="card">
          <div class="card-content">
            <b-field label="Sending message to ...">
              <b-taginput
                  v-model="sendTo"
                  ellipsis
                  icon="label"
                  placeholder="e.g. test@email.com"
                  aria-close-label="Delete this tag"
                  maxtags="1"
                  v-on:add="getUser(sendTo);">
              </b-taginput>
            </b-field>
          </div>
        </div>
        <MessagePost :receiver_id="user_id" :username="sendToUserName" ></MessagePost>
      </b-modal>

    </div>

    <b-tabs v-model="activeTab" position="is-centered">
      <b-tab-item label="Inbox">
        <div class="container">
          <MessageCard
            v-for="(item, index) in this.messages"
            :key="index"
            :sender="item.sender"
            :msg="item.message"
            :ago="item.ago"
            class="is-vcentered is-centered"
          ></MessageCard>
        </div>
      </b-tab-item>

      <b-tab-item label="Sent">
        <div class="container">
          <MessageCard
            v-for="(item, index) in this.sentMessages"
            :key="index"
            :sender="item.receiver"
            :msg="item.message"
            :ago="item.ago"
            class="is-vcentered is-centered"
          >
          </MessageCard>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import MessageStore from "../store/message";
import MessageCard from "../components/MessageCard";
import MessagePost from "../components/MessagePost";
import AuthUser from "../store/AuthUser";
import AuthService from "../services/AuthService";
import Topbar from "../components/Topbar";
import Axios from "axios";
export default {
  components: {
    MessageCard,
    MessagePost,
    Topbar,
  },
  data() {
    return {
      messages: [],
      sentMessages: [],
      currentMenu: 0,
      activeTab: 0,
      showCreateModal: false,
      sendTo: [],
      sendToUser: [],
      sendToUserName: '',
      user_id: 0,

      //   showMusic: true,
      //   showBooks: false,
      //   multiline: true
      // }
    };
  },
  created() {
    this.fetchMessage();
    this.fetchSentMessage();
  },
  methods: {
    async fetchMessage() {
      await MessageStore.dispatch("fetchMessage");
      this.messages = MessageStore.getters.messages;
    },
    async fetchSentMessage() {
      await MessageStore.dispatch("fetchSentMessage");
      this.sentMessages = MessageStore.getters.messages;
    },
    // logAll() {
    //   console.log(this.messages);
    //   console.log(this.sentMessages);
    // },
    async getUser(emailString) {
      let payload = {
        email: emailString
      }
      this.sentToUser = await Axios.post("http://localhost:8000/api/getUserByEmail",payload);
      this.sendToUserName = this.sentToUser.data[0].name;
      this.user_id = this.sentToUser.data[0].id
    },
  },
};
</script>

<style scoped lang="scss">
.wow {
  width: 66%;
}
.b-buttoncolor {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  border: #484848;
  background-color: #f15858;
  color: white;
}
#create-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}
</style>