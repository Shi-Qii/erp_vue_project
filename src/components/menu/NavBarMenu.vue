<template>
<div>
  <nav class="navbar navbar-expand NavBar_shi">
    <!--      <a class="navbar-brand">預留網站名字</a>-->
    <a class="navbar-brand"></a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item   ">
        <router-link to="/ProjectHome" class="nav-link">
          <font-awesome-icon class="TheSameFontColor" icon="home"/>
          <a class="TheSameFontColor">test</a>
        </router-link>
      </li>
      <li class="nav-item">
        <b-button v-b-toggle="'collapse'">各項選單</b-button>
      </li>
    </div>

    <div class="navbar-nav ml-auto">

      <li class="nav-item dropdown">
        <h5
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
          選單
          <!--          歡迎 {{ currentUser.username }} 到來-->
        </h5>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/profile">個人資料中心</a>
        </div>
      </li>
      <li class="nav-item ">
        <a class="nav-link TheSameFontColor">
          <font-awesome-icon icon="sign-out-alt"/>
          LogOut
        </a>
      </li>
    </div>

  </nav>
</div>
</template>

<script>
export default {
  name: "navBarMenu"
}
</script>

<style  >
.NavBar_shi{
  background-color: transparent !important;
  box-shadow: none;
  border-bottom: 1px solid #ddd;
   color: #66615B;
}
.TheSameFontColor{
  color: #66615B;
}

</style>