<template>
  <div class="columns is-centered">
    <div class="column has-text-centered is-3">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="jim.jpg" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Patchapon Rochananan</p>
            </div>
          </div>
          <div class="content">
            <h3 class="text">Jimmy</h3>
            <h3 class="text">6210450652</h3>
            <p class="subtitle">patchapon.r@ku.th</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="off.jpg" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Sethawut Pornsiripiyakul</p>
            </div>
          </div>
          <div class="content">
            <h3 class="text">Off</h3>
            <h3 class="text">6210450784</h3>
            <p class="subtitle">sethawut.p@ku.th</p>
          </div>
        </div>
      </div>
    </div>

    <div class="column has-text-centered is-3">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="tan.jpg" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Chanwit Saisin</p>
            </div>
          </div>
          <div class="content">
            <h3 class="text">Tan</h3>
            <h3 class="text">6210450521</h3>
            <p class="subtitle">chanwit.sa@ku.th</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="gus.jpg" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Kunkawee Suriyasarapong</p>
            </div>
          </div>
          <div class="content">
            <h3 class="text">Gus</h3>
            <h3 class="text">6210451055</h3>
            <p class="subtitle">kunkawee.s@ku.th</p>
          </div>
        </div>
      </div>
    </div>

    <div class="column has-text-centered is-3">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="dol.jpg" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Suppachai Glubpean</p>
            </div>
          </div>
          <div class="content">
            <h3 class="text">Dol</h3>
            <h3 class="text">6210451713</h3>
            <p class="subtitle">suppachai.g@ku.th</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="phone.jpg" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Panyakarn Pantaeng</p>
            </div>
          </div>
          <div class="content">
            <h3 class="text">Phone</h3>
            <h3 class="text">6210450091</h3>
            <p class="subtitle">panyakarn.p@ku.th</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";

export default {
  components: {
    Topbar,
  },
};
</script>

<style lang="scss" scoped>
h3,
p {
  color: white;
}
.card {
  text-align: center;
  width: 500px;
  height: auto;
  position: relative;
  float: left;
  background-color: #7957d5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>