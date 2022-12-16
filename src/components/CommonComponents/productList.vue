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
          </span></b-col>
        <b-col></b-col>
        <b-col class="justify-center">
          <div style="text-align:center">
            <span>庫存模式</span>
            <span class="pl-3">
              <toggle-button color="#12A3B8" :sync="true" :labels="true" v-model="inStockMode" :value="inStockMode"/>
            </span></div>
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
      <div class="row  mt-4">
        <b-col></b-col>
        <b-col></b-col>
        <b-col class="justify-center">
          <div style="text-align:center">
            <b-button variant="info" class="mb-2">
              <b-icon icon="plus-circle"></b-icon> 新增產品
            </b-button></div>
        </b-col>
      </div>
      <div class="row mt-2">
        <b-col>
          <b-table
              class="text-center text-nowrap pre-wrap"
              align-self="center"
              :items="computedList"
              :fields="mainTableObj.fields"
              sort-icon-rigth
              sticky-header="1000px"
              responsive
              v-if="inStockMode==false"
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
          <b-table
              class="text-center text-nowrap pre-wrap"
              align-self="center"
              :items="computedList"
              :fields="inStockTableObj.fields"
              sort-icon-rigth
              sticky-header="1000px"
              responsive
              v-if="inStockMode==true"
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
      <div class="row mt-2">
        <b-col>
          <div class="mt-3">
            <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
          </div>
        </b-col> </div>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, reactive,ref} from "@vue/composition-api/dist/vue-composition-api";
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
        {label: '商品照片', key: 'pic', sortable: false, thClass: 'align-middle'},
        {label: '商品狀態', key: 'state', sortable: false, thClass: 'align-middle'},
        {label: '內部編號', key: 'no', sortable: false, thClass: 'align-middle'},
        {label: '商品名稱', key: 'name', sortable: false, thClass: 'align-middle'},
        {label: '', key: 'sizeAndColor', sortable: false},
        {label: '', key: 'supplier', sortable: false, thClass: 'align-middle'},
        {label: '商品售價', key: 'price', sortable: false, thClass: 'align-middle'},
        {label: '促銷方案', key: 'promo', sortable: false, thClass: 'align-middle'},
        {label: '標籤', key: 'tag', sortable: false, thClass: 'align-middle'},
        {label: '編輯', key: 'edit', sortable: false, thClass: 'align-middle'},
      ],
    })

    const inStockTableObj = reactive({
      'fields': [
        {label: '商品照片', key: 'pic', sortable: false, thClass: 'align-middle'},
        {label: '內部編號', key: 'no', sortable: false, thClass: 'align-middle'},
        {label: '商品名稱', key: 'name', sortable: false, thClass: 'align-middle'},
        {label: '', key: 'sizeAndColor', sortable: false},
        {label: '', key: 'supplier', sortable: false, thClass: 'align-middle'},
        {label: '標籤', key: 'tag', sortable: false, thClass: 'align-middle'},
        {label: '公司', key: 'com1', sortable: false, thClass: 'align-middle'},
        {label: '新店店', key: 'com2', sortable: false, thClass: 'align-middle'},
        {label: '公館店', key: 'com3', sortable: false, thClass: 'align-middle'}
      ],
    })

    const inStockMode=ref(false);

    return {
      inStockMode,
      mainTableObj,inStockTableObj,
    }
  },
}
</script>