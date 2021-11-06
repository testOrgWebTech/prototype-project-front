<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h1 class="title">Your Detail</h1>
        <div class="form">
          <section>
            <b-field >
            <b-input
            maxlength="300"
            type="textarea"
            v-model="detail"
            ></b-input>
        </b-field>

            <div class="divBtn">
              <b-button class="button is-info" @click="edit()">edit</b-button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import UserApi from '@/store/UserApi'
export default {
    data() {
    return {
    
        detail: null, 
      
    };
  },
  methods:{
      async edit(){
          let payload = {
              id: AuthUser.getters.user.id,
              detail: this.detail,
          };
          await UserApi.dispatch("editDetailUser", payload);
          this.$buefy.toast.open("Edit Detail Success");
          this.$router.go(0);
      },
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin: 35px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
}
.in {
  width: 85%;
}
h1 {
  font-size: 50px;
  padding: 10px;
  text-align: center;
}
.divBtn {
  text-align: center;
  padding-top: 20px;
}
.card {
  margin-top: 30px;
  height: 40%;
  width: 80%;
  text-align: center;
}
.title {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
.content {
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
</style>