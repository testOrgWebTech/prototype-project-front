<template>
  <div class="card">
    <div class="card-content">
      <div v-for="(comment, index) in comments" :key="index" v-if="comments.length != 0">
        <div class="comment media">
          <div class="media-content">
            <figure class="image is-64x64 media-left is-inline-block">
              <router-link :to="`/profile/${comment.user.id}`">
                <img class="is-rounded" :src="`http://localhost:8000${comment.user.imagePath}`">
              </router-link>
            </figure>
            <div class="media-content is-inline-block">
              <div class="content">
                <router-link :to="`/profile/${comment.user.id}`">
                  <p class="subtitle">{{ comment.user.name }}</p>
                  <p class="subtitle">{{ comment.user.email }}</p>
                </router-link>
              </div>
            </div>
          </div>
          <p class="subtitle is-6">{{ comment.message }}</p>
        </div>
      </div>
      <div class>
        <div class="comment">
          <textarea
            class="textarea comment-input"
            placeholder="Comment!!"
            v-model="message"
          ></textarea>
          <b-button
            type="is-primary"
            class="create-comment-button"
            @click="onClickComment"
            >Comment</b-button
          >
        </div>
        <!--user profile pic-->
      </div>
    </div>
    <b-loading v-model="isLoading" v-if="comments.length != 0"></b-loading>
  </div>
</template>

<script>
import CommentStore from "@/store/Comment";
export default {
  data() {
    return {
      message: null,
      isLoading: false,
      comments: [],
    };
  },
  props: {
    post: null,
  },
  async created() {
    await this.fetchCommentsByPostId(this.post.id);
    this.comments = CommentStore.getters.comments;
    console.log(this.comments)
  },
  methods: {
    onClickComment() {
      const payload = {
        post_id: this.post.id,
        message: this.message,
      };
      this.$buefy.dialog.confirm({
        message: "Comment?",
        onConfirm: async () => {
          this.isLoading = true;
          await CommentStore.dispatch("newComment", payload);
          await this.$buefy.toast.open("Comment Success");
          this.isLoading = false;
          this.$emit("closeEdit");
          this.message = null;
        },
      });
    },
    async fetchCommentsByPostId(post_id) {
      this.isLoading = true;
      await CommentStore.dispatch("getCommentsByPostId", post_id);
      this.comments = await CommentStore.getters.comments;
      this.isLoading = false;
    },
  },
};
</script>
    
<style lang="scss">
.comment {
  margin-bottom: 10px;
  //border-bottom: 0.5px solid;
  padding: 10px;
}
.comment-input {
  margin: 10px;
}
.create-comment-button {
  margin-top: 3%;
  margin-left: 83%;
}
</style>