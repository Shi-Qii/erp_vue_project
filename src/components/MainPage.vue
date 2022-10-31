<template>
  <div>
    <!test-->
    <!--上面**各項選單項目新增-->
    <NavBarMenu></NavBarMenu>
    <!--左邊**各項選單項目新增-->
    <SideBarMenu></SideBarMenu>

  </div>
</template>

<script>
import SideBarMenu from '../menu/SideBarMenu.vue'
import NavBarMenu from '../menu/NavBarMenu.vue'

export default {
  name: "mainPage",
  components: {
    SideBarMenu, NavBarMenu
  }
}
</script>

<style scoped>

</style>