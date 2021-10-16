<template>
  <div>
    <Topbar/>
    <div class="form">
      <h1 class="text"> Register </h1>
      <br>
      <br>
      <section>
        <b-field label="Name" horizontal>
          <b-input v-model="form.name" maxlength="32"></b-input>
        </b-field>

        <b-field label="Email" horizontal>
          <b-input type="email" v-model="form.email" maxlength="30"> </b-input>
        </b-field>

        <b-field label="Password" horizontal>
          <b-input v-model="form.password" type="password" password-reveal>
          </b-input>
        </b-field>

        <b-field label="Password Confirmation" horizontal>
          <b-input
            v-model="form.password_confirmation"
            type="password"
            password-reveal
          >
          </b-input>
        </b-field>

        <img class="image" :src="urlImage">
        <b-field label="Upload Your Image" horizontal>
          <input class="inputFile" type="file" @change="onFileSelected">
        </b-field>

        <div class="Btn">
          <b-button class="button is-danger" tag="router-link" to="/">
            Cancel
          </b-button>
          <b-button @click="signUp" class="is-success"> Sign Up </b-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Topbar from "@/components/Topbar.vue";
import axios from "axios";
export default {
  components: {
    Topbar
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      selectedFile: null,
      urlImage: ''
    };
  },
  methods: {
    onFileSelected(event){
      console.log(event);
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      
      this.urlImage = URL.createObjectURL(this.selectedFile);
    },
    async signUp() {
      let res = await AuthUser.dispatch("register", this.form);
      if (res.success) {
        //after success registered then login to set the right jwt cuz resigter request not response jwt so we have to login to get jwt
        let loginForm = {
          email: this.form.email,
          password: this.form.password,
        };
        await AuthUser.dispatch("login", loginForm);
        //upload
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name)
        
        axios.post('http://127.0.0.1:8000/api/upload-image', fd, {
          headers: {Authorization:`Bearer ${AuthUser.getters.jwt}`}
          }).then(res=>{
          console.log(res);
        })
        await AuthUser.dispatch("login", loginForm);
        this.$router.push("/");
        this.$router.go(0);
      } else {
        this.danger(res.message);
        console.log("register Failed!");
      }
    },
    danger(message) {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: `<b>Failed</b> ${message} `,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
      // notif.$on("close", () => {
      //   this.$buefy.notification.open("Custom notification closed!");
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.text{
  font-size: 300%;
  text-align: center;
}
.form {
  margin-top: 100px;
  margin-left: 200px;
  margin-right: 200px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
}
.image{
  margin-left: 675px;
  width: 10%;
}
.Btn{
  text-align: center;
}
</style>