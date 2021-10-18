<template>
  <div class="content">
    <!--<Topbar />-->
    <div class="post-zone">
      <b-modal
        :active.sync="showCreateModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <DraftPost class="post" @closeCreate="showCreateModal = false">
        </DraftPost>
      </b-modal>
      <b-modal
        :active.sync="showEditModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <DraftPost class="post" :selectedPost="selectedPost" :isEdit="true">
        </DraftPost>
      </b-modal>
      <b-modal
        :active.sync="showCommentModal"
        :can-cancel="['escape', 'x', 'outside']"
        full-screen
      >
        <Comment
          class="comment"
          :post="selectedPost"
          @closeComment="showCommentModal = false"
          @fetchPost="fetchPost"
        ></Comment>
      </b-modal>
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
      <b-button
        type="is-primary is-light"
        id="create-button"
        @click="showCreateModal = true"
        v-if="auth.getters.user"
      >
        Create challenge
      </b-button>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import Post from "@/components/Post.vue";
import DraftPost from "@/components/DraftPost.vue";
import PostStore from "@/store/Post";
import AuthUser from "@/store/AuthUser";
import Comment from "@/components/Comment.vue";

export default {
  name: "Dashboard",
  components: {
    Topbar,
    Post,
    DraftPost,
    Comment,
  },
  data() {
    return {
      posts: null,
      comments: null,
      showCreateModal: false,
      showPostModal: false,
      showEditModal: null,
      selectedPost: null,
      showCommentModal: false,
      auth: AuthUser,
      isLoading: false,
    };
  },
  methods: {
    async fetchPost() {
      this.isLoading = true;
      await PostStore.dispatch("fetchPost");
      this.posts = await PostStore.getters.posts;
      this.isLoading = false;
    },
    /*async fetchComment(id) {
      await CommentStore.dispatch("fetchComment", id);
      this.comments = await CommentStore.getters.comments;
    },*/
    showPost() {
      console.log("hey");
    },
    async showComment(post_id) {
      await this.fetchPost();
      this.selectedPost = await this.posts.find((e) => e.id == post_id);
      this.showCommentModal = true;
    },
    async deletePost(id) {
      this.$buefy.dialog.confirm({
        message: "Delete?",
        onConfirm: async () => {
          this.isLoading = true;
          await PostStore.dispatch("deletePost", id);
          await this.fetchPost();
          this.isLoading = false;
          this.$buefy.toast.open("Delete Success");
        },
      });
    },
  },
  async created() {
    await this.fetchPost();
  },
};
</script>

<style lang="scss" scoped>
/*.content {
  background: #e8dcd0;
}*/
.select {
  top: 10px;
}
.post {
  margin-top: 15px;
  margin-bottom: 15px;
}
#create-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.modal-close {
  background: black;
}
</style>
