<template>
  <div>
    <div class="card">
      <article class="media card-content">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="`http://localhost:8000${sender.imagePath}`">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
              <p>
              <strong>{{ sender.name }}</strong> <small> <{{ sender.email }}></small> <small>{{ ago }}</small>
              <br>
                <span style="white-space: pre;">{{ msg }}</span>
            </p>

          </div>
        </div>
      </article>
    </div>

<!--    <div class="card">-->
<!--      <div class="card-content">-->
<!--        <div class="media">-->
<!--          <div class="media-left">-->
<!--            <figure class="image is-48x48">-->
<!--              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">-->
<!--            </figure>-->
<!--          </div>-->
<!--          <div class="media-content">-->
<!--            <p class="title is-4">John Smith</p>-->
<!--            <p class="subtitle is-6">@johnsmith</p>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="content">-->
<!--          Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
<!--          Phasellus nec iaculis mauris. <a>@bulmaio</a>.-->
<!--          <a href="#">#css</a> <a href="#">#responsive</a>-->
<!--          <br>-->
<!--          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>

</template>

<script>
export default {
  props: ["sender",'msg','ago']
}
</script>

<style lang="scss" scoped>
.pre-formatted {
  white-space: pre;
}
pre {
  overflow-wrap: break-word;
  overflow: hidden;
}
.card{
  background-color: #484848;
  color: white;
}
strong{
  color: white;
}
</style>