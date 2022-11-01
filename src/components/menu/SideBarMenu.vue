<template>
  <div class="col-2">
    <div>
      <b-sidebar id="sidebar-1" aria-modal="true" backdropprop="true" aria-label="Sidebar with custom footer"
                 no-header shadow>
        <template #footer="{ hide }">
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <strong class="mr-auto"> </strong>
            <b-button size="sm" @click="hide">Close</b-button>
          </div>
        </template>
        <div class="px-3 py-2 side_Customize">
          <div>
            <ul class="nav mt-2" style="  display: block;">
              <li v-for="(item, index) in routerList" :key="index+'_'">
                <router-link :to="item.toPath" class="color_66615B">
                  <p>{{ (++index) + '.' + item.name }}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </b-sidebar>
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