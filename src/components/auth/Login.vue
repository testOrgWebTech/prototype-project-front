<template>
  <div>
    <b-dropdown
      position="is-bottom-left"
      append-to-body
      aria-role="menu"
      trap-focus
    >
      <template #trigger>
        <a class="navbar-item" role="button">
          <span>Login</span>
          <b-icon icon="menu-down"></b-icon>
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
    };
  },
  methods: {
    async login() {
      //   let res = await AuthService.login(this.form);
      let res = await AuthUser.dispatch("login", this.form);
      if (res.success) {
        console.log("Login Success!!!");
      } else {
        console.log("Login Failed");
      }
    },
  },
};
</script>

<style>
</style>