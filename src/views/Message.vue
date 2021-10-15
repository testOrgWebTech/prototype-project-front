<template>
  <div>
    <Topbar></Topbar>
<!--    {{ messages }}-->
<!--    <b-table :data="messages" :columns="columns"></b-table>-->
    <div>
      <button @click="logAll()">LOG</button>
      <button @click="currentMenu = 0">Inbox</button>
      <button @click="currentMenu = 1">Sent</button>
    </div>

<!--    <b-tabs v-model="activeTab" :multiline="multiline">-->
<!--      <template v-for="tab in tabs">-->
<!--        <b-tab-item-->
<!--            v-if="tab.displayed"-->
<!--            :key="tab.id"-->
<!--            :value="tab.id"-->
<!--            :label="tab.label">-->
<!--          {{ tab.content }}-->
<!--        </b-tab-item>-->
<!--      </template>-->
<!--    </b-tabs>-->
    <b-tabs v-model="activeTab" position="is-centered">
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





    <div>
      <MessagePost></MessagePost>
    </div>

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
</style>