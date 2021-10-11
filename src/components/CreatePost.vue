<template>
    <div class="card">
        <div class="card-content">
            <figure class="image is-64x64">
                <img class="is-rounded"  src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="content">
                <h3 class="text">{{ name }}</h3>
            </div>
        </div>
        <button class="button text">
            CreatePost
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: "Gus"
        }
    },
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
</style>