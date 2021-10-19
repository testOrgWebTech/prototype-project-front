
<template>
  <div class="card">
    <article class="media card-content">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`http://localhost:8000${user.imagePath}`" />
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

            <div
                v-for="(err, index) in error"
                :key="index">
              {{ err[0] }}
            </div>
            <br>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import AuthUser from "../store/AuthUser"
import MessageStore from "../store/message";
export default {
  name: "Menu",
  props: ["receiver_id", "username"],
  data() {
    return {
      form: {
        message: "",
      },
      user:AuthUser.getters.user,
      error: "",
      receiver: this.$props.receiver_id,
    };
  },
  methods: {
    logAll() {
      // console.log("wow");
    },
    async sendMessage() {
      this.receiver = this.$props.receiver_id;
      let payload = {
        message: this.form.message,
        sender: this.user.id,
        receiver: this.receiver,
      };
      let res = await MessageStore.dispatch("postMessage", payload);
      if (res.status === 201) {
        this.clearForm();
        this.$buefy.toast.open("Message Sent!")
      }
      else {
        this.$buefy.toast.open("Failed")
        this.error = res.data;
        console.log(this.error)
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