<template>
  <div class="container">
    <div style="background-color: white; border-radius: 10px;"
         class=" col-12 mt-3 pt-3 mb-3 pb-3 justify-content-md-center">
      <div class="row">
        <b-col class="justify-center">
          <b-button variant="secondary" size="sm">
            全部
            <b-badge variant="light">1900</b-badge>
          </b-button>
          <b-button variant="light" size="sm" class="text-center ml-2">
            上架
            <b-badge variant="light">900</b-badge>
          </b-button>
          <b-button variant="light" size="sm" class="text-center ml-2">
            下架
            <b-badge variant="light">9</b-badge>
          </b-button>
        </b-col>
      </div>
      <div class="row mt-3">
        <b-col class="col-md-3">
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="搜尋..." autocomplete="off" v-model="searchValue"></b-form-input>
          </b-input-group>
          <b-card class="mt-2" v-if="searchComputed.length>0">
            <b-card-text class="small text-muted">
              <b-badge href="#" variant="secondary" class="ml-2" v-for="(str,i) in searchComputed" :key="i">{{ str }}
              </b-badge>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col class="col-md-3">
          <b-dropdown text="廠商..." ref="dropdown" variant="outline-secondary" block>
            <b-dropdown-form>
              <b-form-checkbox class="mb-3" v-for="(obj,i) in filterObj.supplierFilter" :key="i" v-model="obj.select" > &nbsp;&nbsp; {{obj.supplierName}}</b-form-checkbox>
            </b-dropdown-form>
            <template #button-content>
              <b-icon icon="shop"></b-icon> &nbsp;&nbsp;
              廠商... &nbsp;
            </template>
          </b-dropdown>
          <b-card class="mt-2" v-if="supplierComputed.length>0">
            <b-card-text class="small text-muted" >
              <b-badge href="#" variant="secondary" class="ml-2" v-for="(obj,i) in supplierComputed" :key="i" >{{obj.supplierName}}</b-badge>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col class="col-md-3">
          <b-dropdown text="促銷..." ref="dropdown" variant="outline-secondary" block>
            <b-dropdown-form>
              <b-form-checkbox class="mb-3" v-for="(obj,i) in filterObj.promoFilter" :key="i" v-model="obj.select" > &nbsp;&nbsp; {{obj.salesName}}-{{obj.salesInfo}}</b-form-checkbox>
            </b-dropdown-form>
            <template #button-content>
              <b-icon icon="cash"></b-icon> &nbsp;&nbsp;
              促銷... &nbsp;
            </template>
          </b-dropdown>
          <b-card class="mt-2" v-if="promoComputed.length>0">
            <b-card-text class="small text-muted">
              <b-badge href="#" variant="secondary" class="ml-2" v-for="(obj,i) in promoComputed" :key="i">{{obj.salesName}}-{{obj.salesInfo}}</b-badge>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col class="col-md-3">
          <b-dropdown text="標籤..." ref="dropdown" variant="outline-secondary" block>
            <b-dropdown-form>
              <b-form-checkbox class="mb-3" v-for="(obj,i) in filterObj.tagFilter" :key="i" v-model="obj.select" > &nbsp;&nbsp; {{obj.tagName}}</b-form-checkbox>
            </b-dropdown-form>
            <template #button-content>
              <b-icon icon="tag"></b-icon> &nbsp;&nbsp;
              標籤... &nbsp;
            </template>
          </b-dropdown>
          <b-card class="mt-2" v-if="tagComputed.length>0">
            <b-card-text class="small text-muted">
              <b-badge href="#" variant="secondary" class="ml-2" v-for="(obj,i) in tagComputed" :key="i">{{ obj.tagName }}</b-badge>
            </b-card-text>
          </b-card>
        </b-col>
      </div>
      <div class="row  mt-5">
        <b-col>
          <div class="mt-4">
            <span>庫存模式</span>
            <span class="pl-3 ">
              <toggle-button color="#12A3B8" :sync="true" :labels="true" v-model="inStockMode" :value="inStockMode"/>
            </span>
          </div>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
          <div class="mt-2 float-right">
            <b-button variant="info" class="mb-3">
              <b-icon icon="plus-circle"></b-icon>
              新增產品
            </b-button>
          </div>
        </b-col>
      </div>
      <div class="row">
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
              fixed
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
              fixed
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
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, onBeforeMount, onMounted, reactive, ref} from "@vue/composition-api/dist/vue-composition-api";
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
      let stateNum = [
        {name: 'all', num: 2500, select: true},
        {name: 'onShelf', num: 2000, select: true},
        {name: 'offShelf', num: 500, select: true}];
      filterObj.state = stateNum;
      let supplierInfo = [
        {supplierName: '廠商1abc', supplierId: '001', select: false},
        {supplierName: '廠商2mm', supplierId: '002', select: false},
        {supplierName: '廠商3', supplierId: '003', select: false},
        {supplierName: '廠商4', supplierId: '004', select: false},
        {supplierName: '廠商5', supplierId: '005', select: false}];
      filterObj.supplierFilter = supplierInfo;
      let promoInfo = [
        {salesId: '001', salesName: '換季大拍賣', salesInfo: '商品95折', select: false},
        {salesId: '002', salesName: '年末出清', salesInfo: '全面200元', select: false},
        {salesId: '003', salesName: '特價', salesInfo: '商品8折', select: false},
        {salesId: '004', salesName: '不想賣了', salesInfo: '全面10元', select: false},
        {salesId: '005', salesName: '成本賣', salesInfo: '全面50元', select: false},
        {salesId: '006', salesName: '降價', salesInfo: '全面20元', select: false},];
      filterObj.promoFilter = promoInfo;
      let tagInfo = [
        {tagId: '001', tagName: '20221220-追加', select: false},
        {tagId: '002', tagName: '20221221-追加', select: false},
        {tagId: '003', tagName: '20221222-追加', select: false},
        {tagId: '004', tagName: '20221223-追加', select: false},
        {tagId: '005', tagName: '20221224-追加', select: false},
        {tagId: '006', tagName: '20221225-追加', select: false},
      ];
      filterObj.tagFilter = tagInfo;
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

    const inStockMode = ref(false);
    const filterObj = reactive({
      state: [],
      searchFilter: [],
      supplierFilter: [],
      promoFilter: [],
      tagFilter: [],
    })
    const searchValue = ref('');
    const searchComputed = computed(() => {
      filterObj.searchFilter = [];
      let searchVal = searchValue.value.trim().length > 0 ? searchValue.value.trim().split(' ') : [];
      searchVal.forEach(f => {
        if (searchVal.length > 0 && !filterObj.searchFilter.includes(f)) {
          filterObj.searchFilter.push(f)
        }
      })
      return filterObj.searchFilter;
    })
    const supplierComputed = computed(() => {
      return filterObj.supplierFilter.filter(f=>f.select===true)
    })
    const promoComputed = computed(() => {
      return filterObj.promoFilter.filter(f=>f.select===true)
    })
    const tagComputed = computed(() => {
      return filterObj.tagFilter.filter(f=>f.select===true)
    })

    return {
      inStockMode,
      mainTableObj, inStockTableObj,
      filterObj, searchValue,
      searchComputed,supplierComputed,promoComputed,tagComputed
    }
  },
}
</script>