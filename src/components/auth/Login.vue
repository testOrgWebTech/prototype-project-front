<template>
  <div>
    <b-dropdown
      position="is-bottom-left"
      append-to-body
      aria-role="menu"
      trap-focus
    >
      <template #trigger>
        <a class="button">
          <span style="color: is-primary">Login</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down icon"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </a>
      </template>

      <b-dropdown-item
        aria-role="menu-item"
        :focusable="false"
        custom
        paddingless
      >
        <form>
          <div class="modal-card" style="width: 300px">
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input
                  v-model="form.email"
                  type="email"
                  placeholder="Your email"
                  required
                >
                </b-input>
              </b-field>

              <b-field label="Password">
                <b-input
                  v-model="form.password"
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  required
                >
                </b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <b-button @click="login" label="Login" type="is-primary" />
            </footer>
          </div>
        </form>
      </b-dropdown-item>
    </b-dropdown>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async login() {
      //   let res = await AuthService.login(this.form);
      this.isLoading = true;
      let res = await AuthUser.dispatch("login", this.form);
      this.isLoading = false;
      if (res.success) {
        this.$buefy.toast.open("Login Success!!");
        this.$router.go(0);
        this.$router.push("/");
        location.reload()
      } else {
        this.$buefy.toast.open("Login Failed!!");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 5px;
}
.button{
  color: black;
  background-color: #8c67ef;
}
</style>