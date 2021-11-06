<template>
  <div>
    <div id="tableBoard">
      <table
        class="
          table
          is-hoverable
          is-bordered
          is-striped
          is-narrow
          is-hoverable
          is-fullwidth
        "
      >
        <thead>
          <tr>
            <th>Name Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, index) in categories" v-bind:key="index">

            <td>{{ c.name }}</td>

            <td>
                <b-button
                    @click="deleteItem(c)"
                    size="is-small"
                    type="is-danger"
                >Delete
                </b-button>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <b-modal
        :active.sync="showCreateCateModal"
        :can-cancel="['escape', 'x', 'outside']"
      >
        <CreateCategories class="post" @closeCreateCate="showCreateCateModal = false">
        </CreateCategories>
      </b-modal>
      <b-button
        type="is-primary is-light"
        id="cate-button"
        @click="showCreateCateModal = true"
        v-if="(auth.getters.user && !isLoading) || auth.getters.user.role == 'ADMIN'"
      >
        Add New Categories
      </b-button>
  </div>
</template>

<script>
import CategoryApi from '@/store/Category'
import CreateCategories from '@/components/admin/CreateCategory'
import AuthUser from "@/store/AuthUser";
import PostApi from '@/store/Post'
export default {
  components: {
    CreateCategories
  },
  data() {
    return {
      auth: AuthUser,
      showCreateCateModal: false,
      categories: null,
      isLoading: false,
      posts: null
    };
  },
  created() {
    this.fetchCategories();
    this.fetchPosts()
  },
  methods: {
    async fetchCategories(){
      await CategoryApi.dispatch("fetchCategory")
      this.categories = CategoryApi.getters.categories
    },
    async fetchPosts(){
      await PostApi.dispatch("fetchPosts")
      this.posts = PostApi.getters.posts
    },
    async deleteItem(c){
      this.$buefy.dialog.confirm({
        title: 'Deleting Category',
        message: 'Are you sure you want to <b>delete</b> your Category? This action cannot be undone.',
        confirmText: 'Delete Category',
        type: 'is-danger',
        hasIcon: false,
        onConfirm: () => {
          this.delete(c)
        }
      })
    },
    async delete(c){
      this.isLoading = true;
      await CategoryApi.dispatch("deleteCategory", c.id)
      for (const post of this.posts) {
        if (c.id == post.category_id) {
          await PostApi.dispatch("deletePost", post.id)
        }
      }
      this.$buefy.toast.open("Delete Category Success");
      this.fetchCategories();
      this.isLoading = false;
      this.$router.go(0)
    }
  },
};
</script>

<style scoped lang="scss">
#tableBoard {
  .table {
    margin-top: 50px;
    width: 75%;
    text-align: center;
    padding-top: 2em;
    margin-left: auto;
    margin-right: auto;
  }
}

#cate-button{
  color: white;
  background-color: #7957d5;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 170px;
}
</style>