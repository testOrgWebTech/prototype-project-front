<template>
  <div id="app" style="">
    <Topbar :key="componentKey"/>
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";

export default {
  components: {
    Topbar,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  }
}
</script>

<style lang="scss">
body, html{
  //background-color: #e8dcd0;

  background-image: url("./assets/nba.jpg");
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  background-attachment: fixed;
  //background: #f2effb;
  margin: auto 10px;
  width: 100%;
  height: 100%;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;

  //background-color: #f2effb;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
