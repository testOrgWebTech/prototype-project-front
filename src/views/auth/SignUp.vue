<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h1 class="title">Register</h1>
        <div class="inputForm">
          <b-field label="Name">
            <b-input class="" v-model="form.name" placeholder="Name" required></b-input>
          </b-field>

          <b-field label="E-mail">
            <b-input

                class=""
                type="email"
                v-model="form.email"
                placeholder="Email"
                required
                autocomplete="false"
            >
            </b-input>
          </b-field>
          <b-field label="Password">
            <b-input
                class=""
                v-model="form.password"
                type="password"
                password-reveal
                placeholder="Password"
                required
                autocomplete="false"
            >
            </b-input>
          </b-field>

          <b-field label="Confirm Password">
            <b-input
                class=""
                v-model="form.password_confirmation"
                type="password"
                password-reveal
                placeholder="Confirm Password"
                required
                autocomplete="false"
            >
            </b-input>
          </b-field>


          <div class="uploadImg file">
            <label class="file-label">
              <input class="file-input" type="file" @change="onFileSelected" />
              <span class="file-cta">
              <span class="file-label">Upload a File</span>
            </span>
            </label>


            <img class="image" :src="urlImage" />
          </div>
        </div>

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
      file: {},
      selectedFile: {},
      urlImage: "",
      isLoading: false,
    };
  },
  methods: {
    logSomething(){
      // console.log(this.file)
    },
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
            const fd = new FormData();
            fd.append("image", this.selectedFile, this.selectedFile.name);

            axios
              .post("http://127.0.0.1:8000/api/upload-image", fd, {
                headers: { Authorization: `Bearer ${AuthUser.getters.jwt}` },
              })
              .then((res) => {
                // console.log(res);
              });

            await AuthUser.dispatch("login", loginForm);

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
* {
  box-sizing: border-box;
}
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
.uploadImg {
  margin-top: 32px;
  .inputFile {
    margin-left: 37%;
  }
  .image {
    margin-top: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
}
body, html {
  height: 100%;
}

</style>