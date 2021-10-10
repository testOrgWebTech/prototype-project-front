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
    }
  },
  created() {
    this.fetchMessage()
  },
  methods: {
    async fetchMessage() {
      await MessageStore.dispatch('fetchMessage')
      this.messages = MessageStore.getters.messages
    },
    logAll() {
      console.log(this.messages)
    }
  }

}
</script>

<style scoped lang="scss">
.wow {
  width: 66%;
}
</style>