<template>
  <div class="card draft">
    <div class="card-content">
        <b-field label="Detail">
            <b-select required v-model="selectCategory" placeholder="Category">
            <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category"
            >
                {{ category.name }}
            </option>
            </b-select>
        </b-field>

        <b-field label="Post">
            <b-input
            required
            maxlength="300"
            type="textarea"
            v-model="message"
            ></b-input>
        </b-field>

        <b-button v-if="!selectedPost" type="is-primary is-light" @click="newPost"
            >Create Post</b-button
        >
      
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import CategoryStore from "@/store/Category";
import AuthUser from "@/store/AuthUser";
import PostStore from "@/store/Post";
export default {
    data(){
        return{
            message: null,
            categories: null,
            selectCategory: null,
            isLoading: null,
        }
    },  
    props: {
        selectedPost: null,
    },
    created(){
        this.fetchCategory()
    },
    methods:{
        async fetchCategory(){
            this.isLoading = true;
            await CategoryStore.dispatch("fetchCategory");
            this.categories = await CategoryStore.getters.categories;
            this.isLoading = false;
        },
        async newPost() {
            let payload = {
                message: this.message,
                //img: this.imageUrl,
                user_id: AuthUser.getters.user.id,
                category_id: this.selectCategory.id,
                mode: 'post'
            };
            this.isLoading = true;
            let post = await PostStore.dispatch("newPost", payload);
            await this.$buefy.toast.open("Post Success");
            this.isLoading = false;

            this.$emit("fetchPost");
            this.$emit("closeCreatePost");
            this.$router.go(0);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>