<template>
    <div>
        <Topbar/>

        <div class="card">
          <div class="card-content">
            <figure class="is-128x128 is-rounded">
              <img class="image is-rounded"  :src="image">
            </figure>
            <div class="content">
              <h1 class="text">{{ this.user.name }}</h1>
              <br>
              <h1 class="text">{{ this.user.email }}</h1>
              
            </div>
          </div>
        </div>


        <br>
        <h1>history</h1>
    </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import AuthUser from '@/store/AuthUser.js'
export default {
  name: 'Dashboard',
  components: {
    Topbar,
  },
  data(){
    return{
      user:[],
      image: '',
    }
  },
  created(){
    this.showUser()
  },
  methods:{
    showUser(){
      this.user = AuthUser.getters.user
      this.image = "http://localhost:8000" + this.user.imagePath
     
      console.log(this.user);
    }
  }
}
</script>

<style lang="scss" scoped>
.text{
  color: white;
}
.card{
  margin-top: 30px;
  margin-left: 500px;
  margin-right: 500px;
  background-color: #484848;
  height: 225px;
}
.image{
  width: 180px;
  margin-left: 20px;
  height: 180px;
  border-radius: 50%;
}
.content{
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
</style>