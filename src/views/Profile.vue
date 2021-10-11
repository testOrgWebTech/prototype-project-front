<template>
    <div>
        <Topbar/>
        <h1>Profile</h1>

        <div class="card">
          <div class="card-content">
            <figure class="image is-128x128">
              <img class="is-rounded"  src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="content">
              <h1 class="text">{{ user.name }}</h1>
              <br>
              <h1 class="text">{{ user.email }}</h1>
            </div>
          </div>
        </div>


        <br>
        <h1>history</h1>
    </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'Dashboard',
  components: {
    Topbar,
  },
  data(){
    return{
      user:[]
    }
  },
  created(){
    this.showUser()
  },
  methods:{
    showUser(){
      this.user = AuthService.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.text{
  color: white;
}
.card{
  margin-left: 500px;
  margin-right: 500px;
  background-color: #484848;
  height: 225px;
}
.image{
  width: 180px;
  margin-left: 20px;
}
.content{
  position: relative;
  top: -115px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
</style>