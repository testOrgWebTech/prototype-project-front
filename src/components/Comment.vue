<!--<template>
<div class="card">
    <div class="card-content">
        <div v-for="(comment, index) in comments" :key="index">
          <div class="comment media">
            <div class="media-content wowrelative">
              <div class="media-right wow">
                <button class="delete" @click="deleteComment(comment.id)" v-if="comment.user.id === user_id"></button>
              </div>
              <figure class="image is-64x64 media-left is-inline-block">
                <router-link :to="`/profile/${comment.user.id}`">
                  <img
                      class="is-rounded"
                      :src="`http://localhost:8000${comment.user.imagePath}`"
                  />
                </router-link>
              </figure>

              <div class="media-content is-inline-block card-content">
                <div class="content">
                  <router-link :to="`/profile/${comment.user.id}`">
                    <p class="title is-4">{{ comment.user.name }}</p>
                    <p class="subtitle is-6">{{ comment.user.email }}</p>
                  </router-link>
                </div>

                <div>
                  <p class="subtitle is-6">{{ comment.message }}</p>
                </div>
              </div>
            </div>
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
      </div>
    </div>
    <b-loading v-model="isLoading" v-if="comments.length != 0"></b-loading>
  </div>
</template>-->

<template>
  <div>
    <article class="media" v-for="(comment, index) in comments" :key="index">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`http://localhost:8000${comment.user.imagePath}`" />
        </p>
      </figure>
      <div class="media-content comment-content">
        <div class="content">
          <div class="comment-content">
            <strong>{{ comment.user.name }}</strong>
            <br />
            {{ comment.message }}
            <br />
            <small><a>Like</a> · <a>Reply</a> · <a>3 hrs</a> · </small>
            <button
              class="delete"
              @click="deleteComment(comment.id)"
              v-if="comment.user.id === user_id"
              style="margin"
            ></button>
          </div>
        </div>
      </div>
    </article>

    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content comment-content">
        <div class="field">
          <p class="control">
            <textarea
              class="textarea"
              placeholder="Add a comment..."
              v-model="message"
            ></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button" @click="onClickComment">Post comment</button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import CommentStore from "@/store/Comment";
import AuthUser from "@/store/AuthUser";
import Post from "@/components/Post"
export default {
  components: {
    Post,
  },
  data() {
    return {
      option: null,
      message: null,
      isLoading: false,
      comments: [],
      user_id: AuthUser.getters.user.id,
    };
  },
  props: {
    post: null,
  },
  async created() {
    await this.fetchCommentsByPostId(this.post.id);
    this.comments = await CommentStore.getters.comments;
  },
  methods: {
    async deleteComment(id) {
      this.$buefy.dialog.confirm({
        message: "Delete Comment?",
        onConfirm: async () => {
          this.isLoading = true;
          await CommentStore.dispatch("deleteComment", id);
          await this.fetchCommentsByPostId(this.post.id);
          this.comments = await CommentStore.getters.comments;
          this.isLoading = false;
          this.$buefy.toast.open("Delete Success");
        },
      });
    },
    onClickComment() {
      const payload = {
        post_id: this.post.id,
        user_id: AuthUser.getters.user.id,
        message: this.message,
      };
      this.$buefy.dialog.confirm({
        message: "Comment?",
        onConfirm: async () => {
          this.isLoading = true;
          await CommentStore.dispatch("newComment", payload);
          this.comments = await CommentStore.getters.comments;
          await this.$buefy.toast.open("Comment Success");
          this.isLoading = false;
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
.comment-content {
  word-break: break-word;
  margin: 2%;
  margin-top: 0%;
  margin-left: 0%;
  width: 98%;
}
.comment-input {
  margin: 10px;
}
.create-comment-button {
  margin-top: 3%;
  margin-left: 83%;
}
</style>