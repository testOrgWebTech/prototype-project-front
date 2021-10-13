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

    <CreatePost/>
    

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
