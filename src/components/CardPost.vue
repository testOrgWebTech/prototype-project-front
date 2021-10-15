<template>
<div>
    <div class="card">
        <div class="card-content">
            <figure class="image is-128x128">
                <img class="is-rounded"  src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="content">
                <h1 class="text name">{{ name }}</h1>
                <p class="text time">{{ time }}</p>
                <h1 class="text tagName">Tag : {{ tagName }}</h1>
                <h1 class="text info">{{ info }}</h1>
                <h1 class="text location">Location : {{ location }}</h1>
                <h1 class="text detail">Detail : {{ detail }}</h1>
                
            </div>
        </div>
        <button class="button text">
            Request to Join
        </button>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            name: 'Gus',
            time: 'time',
            tagName: 'Football',
            info: 'looking for a 5-a-side',
            location: '@ Casa Ramkhamhaeng',
            detail: 'รับเเต่สาวๆ'
        }
    }
}
</script>

<style lang="scss" scoped>
.text{
  color: white;
}
.image{
    position: absolute;
    top: 30px;
    left: 45px;
}
.name{
    position: absolute;
    text-align: left;
    left: 200px;
    top: 45px;
    font-size: 300%;
}
.time{
    position: absolute;
    text-align: left;
    left: 205px;
    top: 100px;
}
.tagName{
    position: absolute;
    text-align: left;
    top: 150px;
    left: 60px;
}
.info{
    position: absolute;
    text-align: left;
    top: 200px;
    left: 60px;
}
.location{
    position: absolute;
    text-align: left;
    top: 250px;
    left: 60px;
}
.detail{
    position: absolute;
    top: 300px;
    left: 60px
}
.card{
  background-color: #484848;
  margin-left: 450px;
  margin-right: 450px;
  padding-bottom: 420px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.button{
  position: absolute;
  border: #484848;
  background-color: #f15858;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
  top: 400px;
  right: 40px;
  font-size: 120%;
}
</style>