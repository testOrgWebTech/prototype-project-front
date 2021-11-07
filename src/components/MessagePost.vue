
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
          <div class="">
            <div>
              <div class="uploadImg file">
                <label class="file-label">
                  <input class="file-input" type="file" @change="onFileSelected" />
                  <span class="file-cta">
              <span class="file-label">Upload a File</span>
            </span>
                </label>

                <img class="image" :src="urlImage" id="xImg"/>
              </div>
              <div>
                <a class="button is-info" @click="sendMessage()">Submit</a>
              </div>
            </div>

            <div
                v-for="(err, index) in error"
                :key="index">
              {{ err[0] }}
            </div>
            <br>
          </div>
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
      file: {},
      selectedFile: null,
      urlImage: "",
    };
  },
  methods: {
    logAll() {
      // console.log("wow");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.urlImage = URL.createObjectURL(this.selectedFile);
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
#xImg {
  width: 35%;
  height: 35%;
  margin-left: 20%;
}
</style>