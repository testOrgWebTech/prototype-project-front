<template>
  <div class="content">
    <Topbar />

    <!-- loop post  -->
    <div class="post-zone">
      <!--<Post class="post"
        :isDraft="true"
      >
      </Post>-->
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
        <DraftPost class="post" :selectedPost="selectedPost"> </DraftPost>
      </b-modal>
      <Post
        v-for="(post, index) in posts"
        class="post"
        :key="index"
        :id="post.id"
        :name="post.user.name"
        :datetime="post.created_at"
        :email="post.user.email"
        :user="post.user"
        :message="post.message"
        :challenge_id="post.challenge_id"
        @click="showPost"
        @delete="(id) => deletePost(id)"
        @showEdit="
          (e) => {
            selectedPost = e;
            showEditModal = true;
          }
        "
        @closeEdit="showEditModal = false"
      >
      </Post>
      <b-button
        type="is-danger is-light"
        id="create-button"
        @click="showCreateModal = true"
        v-if="AuthUser.getters.user"
      >
        สร้างโพส
      </b-button>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import Post from "@/components/Post.vue";
import DraftPost from "@/components/DraftPost.vue";
import PostStore from "@/store/Post";
import AuthUser from "@/store/AuthUser";

export default {
  name: "Dashboard",
  components: {
    Topbar,
    Post,
    DraftPost,
  },
  data() {
    return {
      posts: null,
      showCreateModal: false,
      showEditModal: null,
      selectedPost: null,
      AuthUser,
    };
  },
  methods: {
    async fetchPost() {
      await PostStore.dispatch("fetchPost");
      this.posts = await PostStore.getters.posts;
    },
    showPost() {
      console.log("hey");
    },
    async deletePost(id) {
      this.$buefy.dialog.confirm({
        message: "Delete?",
        onConfirm: async () => {
          await PostStore.dispatch("deletePost", id);
          await this.fetchPost();
          this.$buefy.toast.open("Delete Success");
        },
      });
    },
  },
  created() {
    this.fetchPost();
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #e8dcd0;
}
.select {
  top: 10px;
}
.post {
  margin-top: 10px;
  margin-bottom: 10px;
}
#create-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
