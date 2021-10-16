<template>
  <div>
    <Topbar></Topbar>
<!--    {{ messages }}-->
<!--    <b-table :data="messages" :columns="columns"></b-table>-->
    <div>
        <div class="container">
          <button @click="logAll()">LOG</button>
          <b-button class="level-right b-buttoncolor"
                    label="New +"
                    size="is-medium"
                    @click="showCreateModal = true" />
        </div>




      <b-modal
          :active.sync="showCreateModal"
          :can-cancel="['escape', 'x', 'outside']"
      >
        <MessagePost></MessagePost>
      </b-modal>
    </div>


    <b-tabs v-model="activeTab"  position="is-centered">
      <b-tab-item label="Inbox">
        <div class="container">
          <MessageCard v-for="(item) in this.messages"
                       :sender="item.sender" :msg="item.message" :ago="item.ago" class="is-vcentered is-centered"></MessageCard>
        </div>
      </b-tab-item>

      <b-tab-item label="Sent">
        <div class="container">
          <MessageCard v-for="(item) in this.sentMessages"
                       :sender="item.sender" :msg="item.message" class="is-vcentered is-centered">

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
export default {
  components: {
    MessageCard,
    MessagePost,
    Topbar
  },
  data() {
    return {
      messages: [],
      sentMessages: [],
      currentMenu: 0,
        activeTab: 0,
      showCreateModal: false,

      //   showMusic: true,
      //   showBooks: false,
      //   multiline: true
      // }
    }
  },
  created() {
    this.fetchMessage()
    this.fetchSentMessage()
  },
  methods: {
    async fetchMessage() {
      await MessageStore.dispatch('fetchMessage')
      this.messages = MessageStore.getters.messages
    },
    async fetchSentMessage() {
      await MessageStore.dispatch('fetchSentMessage')
      this.sentMessages = MessageStore.getters.messages
    },
    logAll() {
      console.log(this.messages)
      console.log(this.sentMessages)
    }
  }

}
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

</style>