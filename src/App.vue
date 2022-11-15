<template>
  <div id="app">
    <nav class="navbar mb-2">
      <div class="container-fluid">
        <p>台北市公共飲水機地圖</p>
        <form class="d-flex">
          <router-link to="/">清單</router-link>|
          <router-link to="/MapVue">地圖</router-link>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #71bfc6;

  p {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    font-weight: bold;
    font-size: 30px;
  }

  a {
    font-weight: bold;
    font-size: 24px;
    color: #dedede;
    text-decoration: none;
    padding-inline: 10px;

    &.router-link-exact-active {
      color: #205a60;
    }

    &:hover {
      color: #205a60;
    }
  }
}
</style>
