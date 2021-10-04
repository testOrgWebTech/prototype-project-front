<template>
  <div class="form">
    <section>
      <b-field label="Name" horizontal>
        <b-input v-model="form.name"></b-input>
      </b-field>

      <b-field
        label="Email"
        horizontal
      >
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

      <b-button class="button is-danger" tag="router-link" to="/">
        Cancel
      </b-button>
      <b-button @click="signUp" class="is-success"> Sign Up </b-button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },

  methods: {
    signUp() {
      console.log(this.form.name);
      console.log(this.form.email);
      console.log(this.form.password);
      console.log(this.form.password_confirmation);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 200px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
}
</style>