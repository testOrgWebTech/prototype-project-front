<template>
  <div class="card">
    <div class="card-content">
      <div v-for="(comment, index) in comments" :key="index">
        <div class="comment media">
          <figure class="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
            />
          </figure>
          <p class="subtitle is-6">{{ comment.message }}</p>
        </div>
      </div>
      <div class>
        <div class="comment">
          <textarea
            class="textarea comment-input"
            placeholder="เขียนคอมเม่น"
            v-model="message"
          ></textarea>
          <b-button
            type="is-primary"
            class="comment-button"
            @click="onClickComment"
            >Comment</b-button
          >
        </div>
        <!--user profile pic-->
      </div>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import CommentStore from "@/store/Comment";
export default {
  data() {
    return {
      message: null,
      isLoading: false,
      comments: null,
    };
  },
  props: {
    post: null,
  },
  created() {
    this.fetchCommentsByPostId(this.post.id);
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
.comment-button {
  margin-left: 80%;
}
</style>