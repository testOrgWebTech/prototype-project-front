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
      <b-button
        type="is-primary"
        id="create-button"
        @click="showCreateModal = true"
        v-if="auth.getters.user && !isLoading"
      >
        Create challenge
      </b-button>

      <b-modal
        :active.sync="showCreatePostModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <CreatePost class="post" @closeCreatePost="showCreatePostModal = false">
        </CreatePost>
      </b-modal>
      <b-button
        type="is-primary"
        id="post-button"
        @click="showCreatePostModal = true"
        v-if="auth.getters.user && !isLoading"
      >
        Create Post
      </b-button>

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

      <b-field class="selectCategory">
        <b-select
          v-model="selectedCategory"
          placeholder="Select a Category"
          rounded
          @input="selectCategory"
        >
          <option value="all">All Categories</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category.name }}
          </option>
        </b-select>
      </b-field>
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
      <div style="text-align: center">
        <b-button
          class="load-more-btn"
          type="is-primary"
          @click="onClickLoadMore"
          v-if="page < last_page"
          >Load more</b-button
        >
      </div>

      <b-modal
        :active.sync="showCreateTeamModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <CreateTeam class="post" @closeCreateTeam="showCreateTeamModal = false">
        </CreateTeam>
      </b-modal>
      <b-button
        type="is-primary"
        id="team-button"
        @click="showCreateTeamModal = true"
        v-if="auth.getters.user && !isLoading"
      >
        Create Team
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
import CreateTeam from "@/components/CreateTeam";
import CategoryStore from "@/store/Category";
import CreatePost from '@/components/CreatePost'

export default {
  name: "Dashboard",
  components: {
    Topbar,
    Post,
    DraftPost,
    Comment,
    CreateTeam,
    CreatePost,
  },
  data() {
    return {
      posts: null,
      comments: null,
      showCreateModal: false,
      showCreateCateModal: false,
      showPostModal: false,
      showCreatePostModal: false,
      showEditModal: null,
      selectedPost: null,
      showCommentModal: false,
      auth: AuthUser,
      isLoading: false,
      showCreateTeamModal: false,
      selectedCategory: "all",
      categories: null,
      page: 1,
      last_page: null,
    };
  },
  methods: {
    async selectCategory() {
      this.isLoading = true;
      if (this.selectedCategory === "all") {
        this.page = 1;
        await this.fetchPost();
      } else {
        this.page = 1;
        await this.fetchPostByCategory(this.selectedCategory.id);
      }
      this.isLoading = false;
    },
    async fetchCategory() {
      this.isLoading = true;
      await CategoryStore.dispatch("fetchCategory");
      this.categories = await CategoryStore.getters.categories;
      this.isLoading = false;
    },
    async fetchPostByCategory(category_id) {
      this.isLoading = true;
      await PostStore.dispatch("fetchPostByCategory", {
        category_id,
        page: this.page,
      });
      this.posts = await PostStore.getters.posts;
      this.isLoading = false;
    },
    async fetchPost() {
      this.isLoading = true;
      await PostStore.dispatch("fetchPost", this.page);
      this.posts = await PostStore.getters.posts;
      this.last_page = await PostStore.getters.paginate.last_page;
      this.isLoading = false;
    },
    /*async fetchComment(id) {
      await CommentStore.dispatch("fetchComment", id);
      this.comments = await CommentStore.getters.comments;
    },*/
    showPost() {
      // console.log("hey");
    },
    async showComment(post_id) {
      await this.fetchPost();
      this.selectedPost = await this.posts.find((e) => e.id == post_id);
      console.log(post_id);
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
    createTeam() {
      this.$router.push("/createTeam");
    },

    async onClickLoadMore() {
      this.page += 1;
      this.isLoading = true;
      await PostStore.dispatch("fetchPost", this.page);
      //this.posts = await PostStore.getters.posts;
      this.isLoading = false;
    },
  },
  async created() {
    await this.fetchCategory();
    await this.fetchPost();
  },
};
</script>

<style lang="scss" scoped>
//.content {
//  background: #f2effb;
//}
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
  width: 170px;
}
#team-button {
  position: fixed;
  bottom: 140px;
  right: 20px;
  width: 170px;
}
#post-button{
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 170px;
}
.modal-close {
  background: black;
}
.selectCategory {
  width: 10%;
  margin: auto;
  margin-top: 10px;
}
.load-more-btn {
  margin-bottom: 15px;
}
.post-zone {
  margin-bottom: 15px;
}
</style>
