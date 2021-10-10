<template>
  <div>
<!--    {{ messages }}-->
<!--    <b-table :data="messages" :columns="columns"></b-table>-->
    <div>
      <button @click="logAll()">LOG</button>
    </div>
    <div class="container">
      <MessageCard v-for="(item) in this.messages"
      :sender="item.sender.name" :msg="item.message" class="is-vcentered is-centered"></MessageCard>
    </div>

    <div>
      <MessagePost></MessagePost>
    </div>
    <div class="container">
      <MessageCard v-for="(item) in this.sentMessages"
                   :sender="item.sender.name" :msg="item.message" class="is-vcentered is-centered"></MessageCard>
    </div>
  </div>


</template>

<script>
import MessageStore from "../store/message";
import MessageCard from "../components/MessageCard";
import MessagePost from "../components/MessagePost";
import AuthUser from "../store/AuthUser";
import AuthService from "../services/AuthService";
export default {
  components: {
    MessageCard,
    MessagePost
  },
  data() {
    return {
      messages: [

      ],
      sentMessages: [

      ],
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