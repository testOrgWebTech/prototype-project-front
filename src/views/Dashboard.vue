<template>
  <div>
    <Topbar/>

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
    <CardPost/>
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
.select{
  top: 10px;
}
</style>
