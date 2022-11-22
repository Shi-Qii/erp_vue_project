<template>
  <div class="col-12">
    <div>
      <b-collapse is-nav id="collapse" >
         <div class="px-3 py-2 ">
           <ul class="nav mt-2" style=" background-color: #cccccc;  display: block;">
             <li v-for="(item, index) in routerList" :key="index+'_'">
               <router-link :to="item.toPath" class="color_66615B" v-b-toggle="'collapse'">
                 <p>{{ (++index) + '.' + item.name }}</p>
               </router-link>
             </li>
           </ul>
         </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import {reactive} from "@vue/composition-api/dist/vue-composition-api";

export default {
  name: "SideBarMenu",
  setup() {
    const routerList = reactive(
        [{
          'name': '查詢列表',
          'toPath': 'ProjectHome1'
        }, {
          'name': '新增品項頁面',
          'toPath': 'UpsertProductPage'
        }])

    return {routerList}
  }
}
</script>

<style>
.side_Customize {
  position: relative;
  height: calc(95vh - 95px);
  overflow: auto;
  width: 260px;
  z-index: 4;
  padding-bottom: 100px;
}

.color_66615B {
  color: #66615B;
}
</style>