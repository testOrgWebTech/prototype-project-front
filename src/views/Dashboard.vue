<template>
  <div>
    <Topbar/>

    <!-- loop tag -->
    <div class="select is-rounded"> 
      <select v-model="tags">
        <option value="">All Tags</option>
        <option value="Football">Football</option>
        <option value="Basketball">Basketball</option>
        <option value="Swimming">Swimming</option>
      </select>
    </div>

    <CreatePost v-if="isAuthen()"/>
    

    <!-- loop post  -->
    <div class="gus">
      <CardPost/><CardPost/><CardPost/><CardPost/><CardPost/><CardPost/><CardPost/><CardPost/>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import CreatePost from '@/components/CreatePost.vue'
import CardPost from '../components/CardPost.vue'
import AuthUser from '@/store/AuthUser.js'
export default {
  name: 'Dashboard',
  components: {
    Topbar,
    CardPost,
    CreatePost
  },
  data(){
    return{
      tags: ''
    }
  },
  methods:{
    isAuthen(){    
      return AuthUser.getters.isAuthen;
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  background: #e8dcd0;
}
.select{
  top: 10px;
}
.gus{
  margin-bottom: 100px;
}
</style>
