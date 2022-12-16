<template>
  <div class="container">
    <div style="background-color: white; border-radius: 10px;"
         class=" col-12 mt-3 pt-3 mb-3 pb-3 justify-content-md-center">
      <div class="row">
        <b-col>
          <span class="text-center">
            <b-button variant="secondary">
              全部
              <b-badge variant="light">90</b-badge>
            </b-button>
          </span>
          <span class="text-center ml-2">
            <b-button variant="light">
              上架
              <b-badge variant="light">9</b-badge>
            </b-button>
          </span>
          <span class="text-center ml-2">
            <b-button variant="light">
              下架
              <b-badge variant="light">9</b-badge>
            </b-button>
          </span>
        </b-col>
      </div>
      <div class="row mt-3">
        <b-col class="col-md-4">
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="全表..." autocomplete="off"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col class="col-md-4">
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="tags"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="標籤..." autocomplete="off"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col class="col-md-4">
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="cash"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="促銷..." autocomplete="off"></b-form-input>
          </b-input-group>
        </b-col>
      </div>
      <div class="row mt-3">
        <b-col>
          <b-table
              class="text-center text-nowrap pre-wrap"
              align-self="center"
              :items="computedList"
              :fields="mainTableObj.fields"
              sort-icon-rigth
              sticky-header="1000px"
              responsive
          >
            <template #head(no)>
              <span>內部編號</span>
            </template>
            <template #head(sizeAndColor)>
              <span>商品尺寸<br>商品顏色</span>
            </template>
            <template #head(supplier)>
              <span>廠商名稱<br>廠商編號</span>
            </template>
          </b-table>

        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, reactive} from "@vue/composition-api/dist/vue-composition-api";
import $UseAxios from '@/services/common.req';

export default {
  name: "upsertProductPage",
  components: {},
  setup() {
    onMounted(() => {
      //統一命名$UseAxios
      $UseAxios.Get('https://hishowme.azurewebsites.net/showme/hello').then((res) => {
        console.log('res:', res.data);
      });
    })
    onBeforeMount(() => {
    });

    const mainTableObj = reactive({
      'fields': [
        {label: '商品照片', key: 'pic', sortable:false, thClass:'align-middle'},
        {label: '商品狀態', key: 'state', sortable:false, thClass:'align-middle'},
        {label: '內部編號', key: 'no', sortable:false, thClass:'align-middle'},
        {label: '商品名稱', key: 'name', sortable:false, thClass:'align-middle'},
        {label: '', key: 'sizeAndColor', sortable:false},
        {label: '', key: 'supplier', sortable:false, thClass:'align-middle'},
        {label: '商品售價', key: 'price', sortable:false, thClass:'align-middle'},
        {label: '促銷方案', key: 'promo', sortable:false, thClass:'align-middle'},
        {label: '標籤', key: 'tag', sortable:false, thClass:'align-middle'},
        {label: '編輯', key: 'edit', sortable:false, thClass:'align-middle'},
      ],
    })

    return {
      mainTableObj
    }
  },
}
</script>