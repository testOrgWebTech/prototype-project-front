<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h1 class="title">Register</h1>
        <b-input class="ipt" v-model="form.name" placeholder="Name"></b-input>
        <b-input
          class="ipt"
          type="email"
          v-model="form.email"
          placeholder="Email"
        >
        </b-input>
        <b-input
          class="ipt"
          v-model="form.password"
          type="password"
          password-reveal
          placeholder="Password"
        >
        </b-input>
        <b-input
          class="ipt"
          v-model="form.password_confirmation"
          type="password"
          password-reveal
          placeholder="Confirm Password"
        >
        </b-input>
        <!--<input class="inputFile" type="file" @change="onFileSelected" />-->
        <!--<img class="image" :src="urlImage" />-->
        <section class="btn">
          <b-button class="inside-btn is-danger" tag="router-link" to="/">
            Cancel
          </b-button>
          <b-button @click="signUp" class="is-success"> Sign Up </b-button>
        </section>
      </div>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Topbar from "@/components/Topbar.vue";
import axios from "axios";
export default {
  components: {
    Topbar,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      selectedFile: null,
      urlImage: "",
      isLoading: false,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];

      this.urlImage = URL.createObjectURL(this.selectedFile);
    },
    async signUp() {
      this.$buefy.dialog.confirm({
        message: "Register?",
        onConfirm: async () => {
          this.isLoading = true;
          let res = await AuthUser.dispatch("register", this.form);
          if (res.success) {
            //after success registered then login to set the right jwt cuz resigter request not response jwt so we have to login to get jwt
            let loginForm = {
              email: this.form.email,
              password: this.form.password,
            };
            await AuthUser.dispatch("login", loginForm);

            //upload
            /*const fd = new FormData();
            fd.append("image", this.selectedFile, this.selectedFile.name);

            axios
              .post("http://127.0.0.1:8000/api/upload-image", fd, {
                headers: { Authorization: `Bearer ${AuthUser.getters.jwt}` },
              })
              .then((res) => {
                console.log(res);
              });

            await AuthUser.dispatch("login", loginForm);*/

            this.isLoading = false;
            await this.$buefy.toast.open("Register Success!!");
            this.$router.push("/");
            this.$router.go(0);
          } else {
            this.danger(res.message);
            this.isLoading = false;
            console.log("register Failed!");
          }
        },
      });
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
/*.text{
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
}*/

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.title {
  width: 100%;
  text-align: center;
}
.ipt {
  width: 50%;
  margin: auto;
  margin-top: 10px;
}
.btn {
  margin-top: 5%;
  margin-left: 37%;
}
.inside-btn {
  margin-right: 10px;
}
.Btn {
  text-align: center;
}
</style>