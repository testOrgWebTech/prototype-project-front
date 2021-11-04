<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h1 class="title">Add New Categories</h1>
        <div class="form">
          <section>
            <b-field horizontal> Enter Categories separated by "," </b-field>
            <b-field horizontal>
              <b-input
                v-model="categories"
                class="in"
                type="text"
                placeholder="example football,basketball,swimming"
              ></b-input>
            </b-field>

            <div class="divBtn">
              <b-button
                class="button is-danger"
                @click="$emit('closeCreateCate')"
              >
                Cancel
              </b-button>

              <b-button @click="create()" class="is-success"> Add </b-button>
            </div>
          </section>
        </div>
      </div>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import CategoryApi from '@/store/Category'
export default {
  components: {

  },
  data() {
    return {
      exitsCategories: [],
      categories: "",
      isLoading: false,
    };
  },
  created(){
    this.fetchCategories()
  },
  methods: {
    async fetchCategories(){
        await CategoryApi.dispatch("fetchCategory")
        let ecategories = CategoryApi.getters.categories
        ecategories.forEach(c => {
            let string = c.name.toLowerCase()
            this.exitsCategories.push(string)
        });
    },
    async create() {
        let array = this.categories.split(',')
        if (this.categories === '') {
            this.$buefy.notification.open({
                duration: 5000,
                message: "Please Enter Categories",
                position: "is-bottom-right",
                type: "is-danger",
                hasIcon: true,
            });
        }
        else{
            for (let i = 0; i < array.length; i++) {
                if (this.exitsCategories.includes(array[i].toLowerCase())) {
                    this.$buefy.notification.open({
                    duration: 5000,
                    message: "This categories already exits. Please enter new categories",
                    position: "is-bottom-right",
                    type: "is-danger",
                    hasIcon: true,
                });
                }
                else{
                    let payload={
                        name: array[i]
                    }
                    await CategoryApi.dispatch("AddNewCategory", payload)
                
                    this.$buefy.toast.open("Add New Categories Success");
                    this.$router.push("/editCategory");
                    this.$router.go(0)
                    
                }
                    
            }
        }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 35px;
}
.label {
  text-align: left;
}
.button {
  margin: 10px;
  width: 10%;
}
.in {
  width: 85%;
}
h1 {
  font-size: 50px;
  padding: 10px;
  text-align: center;
}
.divBtn {
  text-align: center;
  padding-top: 20px;
}
.card {
  margin-top: 30px;
  height: 40%;
  width: 80%;
  text-align: center;
}
.title {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
.content {
  position: absolute;
  top: 40px;
  margin-left: 250px;
  margin-right: 20px;
  text-align: left;
}
</style>