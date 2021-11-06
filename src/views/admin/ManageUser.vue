<template>
  <div>
      <div id="tableBoard">
      <table
        class="
          table
          is-hoverable
          is-bordered
          is-striped
          is-narrow
          is-hoverable
          is-fullwidth
        "
      >
        <thead>
          <tr>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, index) in users" v-bind:key="index">

            <td v-if="checkRole(u)">{{u.name}}</td>

            <td v-if="checkRole(u)">{{u.status}}</td>

            <td v-if="checkRole(u)">
                <b-button v-if="banBtn(u)"
                    @click="ban(u.id)"
                    size="is-small"
                    type="is-danger"
                >Ban
                </b-button>

                <b-button v-if="unbanBtn(u)"
                    @click="unban(u.id)"
                    size="is-small"
                    type="is-success"
                >Unban
                </b-button>
                
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserApi from '@/store/UserApi'
export default {
data() {
    return {
      users: null,
      
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers(){
      await UserApi.dispatch("fetchUsers")
      this.users = UserApi.getters.users
    },

    async ban(id){
        this.$buefy.dialog.confirm({
        message: "Ban User?",
        onConfirm: async () => {
          console.log(id)
        let payload = {
            id: id,
            status: "INACTIVE"
      };
        await UserApi.dispatch("editStatusUser", payload);
        this.$buefy.toast.open("Ban Success");
        this.$router.go(0)
        },
      });
    },

    async unban(id){
        this.$buefy.dialog.confirm({
        message: "Unban User?",
        onConfirm: async () => {
          console.log(id)
        let payload = {
            id: id,
            status: "ACTIVE"
      };
        await UserApi.dispatch("editStatusUser", payload);
        this.$buefy.toast.open("Unban Success");
        this.$router.go(0)
        },
      });
        
    },

    banBtn(user){
        return user.status == "ACTIVE"
    },
    unbanBtn(user){
        return user.status == "INACTIVE"
    },

    checkRole(user){
        if(user.role == "ADMIN"){
            return false
        }
        else{
            return true
        }
    }
  },
}
</script>

<style lang="scss" scoped>
#tableBoard {
  .table {
    margin-top: 50px;
    width: 75%;
    text-align: center;
    padding-top: 2em;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

