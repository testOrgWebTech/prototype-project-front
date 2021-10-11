<template>
    <div class="card">
        <div class="card-content">
            <figure class="image is-64x64">
                <img class="is-rounded"  src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="content">
                <h3 class="text">{{ user.name }}</h3>
            </div>
        </div>

        <button class="button text"
            @click="popup = true">
            Create Post
        </button>

        <b-modal :active.sync="popup" has-modal-card>
            <form action="">
            <div class="modal-card" style="width: 700px">
                <header class="modal-card-head">
                    <p class="text modal-card-title">Create Your Post</p>
                </header>
                <section class="modal-card-body">

                    <!-- loop tags -->
                    <b-field label="Tag">
                        <div class="select"> 
                            <select v-model="tags">
                                <option value="" disabled selected hidden>Select your post tag</option>
                                <option value="Football">Football</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Swimming">Swimming</option>
                            </select>
                        </div>
                    </b-field>

                    <!-- mode -->
                    <b-field label="mode">
                        <div class="select"> 
                            <select v-model="modes">
                                <option value="" disabled selected hidden>Select your post mode</option>
                                <option value="1 vs 1">1 vs 1</option>
                                <option value="2 vs 2l">2 vs 2</option>
                                <option value="5 vs 5">5 vs 5</option>
                                <option value="7 vs 7">7 vs 7</option>
                            </select>
                        </div>
                    </b-field>

                    <b-field label="location">
                        <b-input
                        type="location"
                        placeholder="Your location"
                        required>
                        </b-input>
                    </b-field>
                    
                    <b-field label="detail">
                        <b-input
                        type="detail"
                        placeholder="Your detail"
                        required>
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="left button text" type="button" @click="popup = false">Close</button>
                    <button class="right button is-success">Create Post</button>
                </footer>
            </div>
        </form>
        </b-modal>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
    data(){
        return{
            popup: false,
            tags: '',
            modes: '',
            user: []
        }
    },
    created(){
        this.showUser()
    },
    methods:{
        showUser(){
            this.user = AuthService.getUser()
        }
    }
}
</script>

<style lang="scss" scoped>
.text{
    color: white;
}
.card{
  margin-left: 800px;
  margin-right: 800px;
  margin-top: 20px;
  background-color: #484848;
  height: 100px;
  margin-bottom: 20px;
}
.image{
  position: absolute;
  top: 18px;
  width: 50px;
  margin-left: 3px;
  
}
.content{
  top: 35px;
  left: 5px;
  position: absolute;
  margin-left: 100px;
  margin-right: 20px;
  text-align: left;
}
.button{
  background-color: #f15858;
  top: -18px;
  left: 75px;
  border: #484848;
}
.left, .right{
    top: 0px;
}
.right{
    left: 400px;
}
.modal-card-head{
    background-color: #484848;
}
.modal-card-foot{
    background-color: #484848;
}
.modal-card-body{
    background-color: #e8dcd0;
}
</style>