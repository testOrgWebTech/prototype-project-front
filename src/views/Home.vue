<template>
  <div class="bg">
    <div class="box box-custom">I'm in a box.</div>
    <b-button
      type="is-danger"
      size="is-large"
      @click="$router.push('/dashboard')"
      class="start-button"
      >Get started</b-button
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
.bg {
  background-image: url(../assets/nba.jpg);
  /* Full height */
  height: 100%;
  width: 100%;
  position: fixed;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.start-button {
  position: fixed;
  top: 50%;
  left: 70%;
}
.box-custom {
  position: absolute;
  width: 30%;
  height: 30%;
  opacity: 0.7;
}
</style>