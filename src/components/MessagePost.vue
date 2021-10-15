
<template>
  <div class="">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" placeholder="Add a comment..." v-model="form.message"></textarea>
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
  name: 'Menu',
  data() {
    return {
      form: {
        message: ""
      },
      error: ""
    }
  },
  methods: {
    logAll(){
      console.log("wow")
    },
    async sendMessage(){
      let payload ={
        message: this.form.message,
        receiver: 2
      }
      let res = await MessageStore.dispatch("postMessage", payload)
      if (res.status === 201)
      {
        this.clearForm();
      }
      else
      {
        this.error = res.data;
      }
    },
    clearForm(){
      this.form = {
        message: "",
      }
    }
  }
}
</script>
