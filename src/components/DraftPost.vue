<template>
  <div class="card draft">
    <div class="card-content">
      <b-field label="detail">
        <b-select v-model="selectCategory" placeholder="Category">
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category.name }}
          </option>
        </b-select>
        <b-select v-model="selectMode" placeholder="Mode">
          <option value="1 vs 1">1 vs 1</option>
          <option value="2 vs 2">2 vs 2</option>
          <option value="5 vs 5">5 vs 5</option>
          <option value="7 vs 7">7 vs 7</option>
        </b-select>
      </b-field>

      <b-field label="location">
        <b-input type="location" placeholder="Your location" required>
        </b-input>
      </b-field>
      <b-field label="post">
        <b-input maxlength="300" type="textarea" v-model="message" ></b-input>
      </b-field>
      <b-button type="is-primary is-light" @click="newPost"
        >Create Post</b-button
      >
    </div>
  </div>
</template>

<script>
import CategoryStore from "@/store/Category";
import PostStore from "@/store/Post";
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      categories: null,
      selectCategory: null,
      selectMode: null,
      message: null,
    };
  },
  props: {
    id: null,
    show: false,
    selectedPost: null
  },
  methods: {
    async fetchCategory() {
      await CategoryStore.dispatch("fetchCategory");
      this.categories = await CategoryStore.getters.categories;
    },
    async newPost() {
      const payload = {
        message: this.message,
        //img: this.imageUrl,
        user_id: (await AuthUser.getters.user).id,
        category_id: this.selectCategory.id,
      };
      await PostStore.dispatch("newPost", payload);
      await this.$buefy.toast.open("Post Success");
      this.$emit("fetchPost");
      this.$emit("closeCreate");
    },
    async editPost() {
      const payload = {
        id: this.id,
        message: this.message,
        //img: this.imageUrl,
        user_id: (await AuthUser.getters.user).id,
        category_id: this.selectCategory.id,
      };
      await PostStore.dispatch("editPost", payload);
      await this.$buefy.toast.open("Post Success");
      this.$emit("fetchPost");
      this.$emit("closeEdit");
    },
  },
  created() {
    this.fetchCategory();
  },
  mounted() {

  }
};
</script>

<style>
.card {
  width: 50%;
  margin: auto;
  margin-top: 30px;
}
</style>