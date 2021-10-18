
<template>
  <div class="card">
    <article class="media card-content">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="field content">
          <p class="control">
            <textarea
              class="textarea"
              :placeholder="`Sending Message to ${username}`"
              v-model="form.message"
            ></textarea>
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a class="button is-info" @click="sendMessage()">Submit</a>
            </div>
            <div>
              {{ error }}
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import MessageStore from "../store/message";
export default {
  name: "Menu",
  props: ["receiver_id", "username"],
  data() {
    return {
      form: {
        message: "",
      },
      error: "",
      receiver: this.$props.receiver_id,
    };
  },
  methods: {
    logAll() {
      console.log("wow");
    },
    async sendMessage() {
      this.receiver = this.$props.receiver_id;
      let payload = {
        message: this.form.message,
        receiver: this.receiver,
      };
      let res = await MessageStore.dispatch("postMessage", payload);
      if (res.status === 201) {
        this.clearForm();
      } else {
        this.error = res.data;
      }
    },
    clearForm() {
      this.form = {
        message: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 100%;
}
</style>