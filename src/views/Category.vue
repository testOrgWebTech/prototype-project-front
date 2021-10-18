<template>
  <div>
    <Post
      v-for="(post, index) in posts"
      class="post"
      :key="index"
      :post="post"
      @click="showPost"
      @delete="(id) => deletePost(id)"
      @showEdit="
        (e) => {
          selectedPost = e;
          showEditModal = true;
        }
      "
      @closeEdit="showEditModal = false"
      @showComment="(e) => showComment(e)"
    >
    </Post>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import PostStore from "@/store/Post";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    posts: null,
    id: null,
  },
  created() {
    this.fetchPostByCategory();
  },
  methods: {
    async fetchPostByCategory() {
      this.isLoading = true;
      await PostStore.dispatch("fetchPostByCategory", this.id);
      this.posts = await PostStore.getters.posts;
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>