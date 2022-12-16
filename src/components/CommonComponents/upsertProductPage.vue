<template>
  <div class="container">
    <div style="background-color: white;border-radius: 10px" class=" col-12 mt-3 pt-3 mb-3 pb-3 justify-content-md-center">
      <div class="row ">
        <b-col class="col-md-6">
          <!--                info start-->
          <div class="row">
            <div class="col-md-7">
              <div class="form-group">
                <label>商品編號</label>
                <b-input v-model="productObj.productId" disabled="disabled"></b-input>
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group pl-5">
                <div>商品狀態</div>
                <div class="pt-3">
                  <toggle-button :value="productObj.productIsActive" color="#12A3B8" :sync="true" :labels="true"
                                 v-model="productObj.productIsActive"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>商品名稱</label>
                <b-input type="text" class="form-control" v-model="productObj.productName"
                         placeholder="商品名稱"></b-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 ">
              <div class="form-group">
                <label>廠商編號</label>
                <b-input v-model="productObj.productManufacturerNo" placeholder="廠商編號"></b-input>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>廠商名稱</label>
                <b-input type="text" class="form-control" v-model="productObj.productManufacturerName"
                         placeholder="廠商名稱"></b-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group"><label>促銷說明</label>
                <b-list-group-item>
                  <div :style="{'width':'100%' }">
                    <b-row v-if="isPromo">
                      <b-col cols="1">
                        <b-icon icon="info-circle-fill" scale="2" variant="info"></b-icon>
                      </b-col>
                      <b-col cols="8">[促銷中]&nbsp;&nbsp;&nbsp;{{
                          productObj.promoInfo.promoName
                        }}-{{ productObj.promoInfo.promoDiscount }}
                      </b-col>
                    </b-row>
                    <b-row v-else>
                      <b-col>無參與促銷方案！</b-col>
                    </b-row>
                  </div>
                </b-list-group-item>
              </div>
            </div>
          </div>
          <!--                info end-->
        </b-col>
        <b-col class="col-md-6">
          <!--                pic start-->
          <div class="form-group">
            <img class="output ml-5" :src="mainPic(productObj.productPic)"
                 style="border:#ADB2B6;border-style: solid;width:65%"
                 @click="editImageButton('A','')">
          </div>
          <!--                pic end-->
        </b-col>
      </div>
      <div class="row">
        <!--             add button start-->
        <b-col>
          <div class="row mt-3">
            <div class="col-12">
              <div class="form-group">
                <label>項目列表</label>
                <b-button variant="outline-secondary" class="mr-5 float-right" @click="newItem()">新增規格</b-button>
              </div>
            </div>
          </div>
        </b-col>
        <!--             add button end-->
      </div>
      <div class="row">
        <b-col>
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <div>
                  <b-table
                      class="text-center text-nowrap"
                      align-self="center"
                      :items="computedList"
                      :fields="mainTableObj.fields"
                      sort-icon-rigth
                      sticky-header="1000px"
                      responsive
                      fixed
                      id="mainTable"
                  >
                    <template #cell(itemPic)="data">
                      <div class="form-group">
                        <img class="output" :src="mainPic(data.item.itemPic)"
                             style="border:#ADB2B6;border-style: solid;width:100%"
                             @click="editImageButton('B',data.item.itemNo===''?data.item.newItemNo:data.item.itemNo)">
                      </div>
                    </template>
                    <template #cell(itemIsDelete)="data">
                      <b-icon icon="trash-fill" v-if="data.item.itemInStock===false"
                              @click="rowIconClick(data)"></b-icon>
                    </template>
                    <template #cell(itemManufacturerNo)="data">
                      <b-form-input v-model="data.item.itemManufacturerNo"></b-form-input>
                    </template>
                    <template #cell(itemCost)="data">
                      <b-form-input v-model="data.item.itemCost"
                                    :disabled="data.item.itemNo===''?false:true "></b-form-input>
                    </template>
                    <template #cell(itemPrice)="data">
                      <b-form-input v-model="data.item.itemPrice"
                                    :disabled="data.item.itemNo===''?false:true "></b-form-input>
                    </template>
                  </b-table>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </div>
      <div class="row">
        <b-col>
          <div style="text-align:center" class="mt-3">
            <div>
              <div>
                <b-button variant="danger" class="ml-3"> 刪除資訊</b-button>
                <b-button @click="submit()" variant="info" class="ml-3"> 儲存資訊</b-button>
              </div>
            </div>
          </div>
        </b-col>
      </div>
      <div class="mt-3">
        <div>
          <h1>HI VUEX </h1>
          <h2>{{ count }}</h2>
          <button @click="add()">增加按鈕</button>
        </div>
        <p class="text-justify">
          1.照片 <br>
          2.條碼列印 <br>
          3.送出時驗證次否有重複資料(vee)<br>
          4.利潤調整＆顏色tag 存前端
        </p>
      </div>
    </div>
    <b-modal ref="newItem-modal" size="xl" hide-footer scrollable title="新增規格">
      <div class="row justify-content-md-center">
        <div class="col-3">
          <h5 class="ml-4">尺寸</h5>
          <div class="mr-5 ml-2 mt-2">
            <b-button v-for="(btn, idx) in sizeArray" :key="idx" class="item mt-2 ml-2" :variant="btn.variant"
                      @click="sizeButton(btn)">
              {{ btn.size }}
            </b-button>
          </div>
          <h5 class="ml-4 mt-4">金額</h5>
          <div class="mr-5 ml-2 mt-2">
            <b-input-group prepend="成本" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-username" placeholder="NT$..?"
                            v-model="modelMoney.itemCost" autocomplete="off"></b-form-input>
            </b-input-group>
            <b-input-group prepend="售價" class="mb-2 mr-sm-2 mb-sm-0 mt-2">
              <b-form-input id="inline-form-input-username" placeholder="NT$..?" v-model="modelMoney.itemPrice"
                            autocomplete="off">
              </b-form-input>
            </b-input-group>
            <b-input-group prepend="利潤" class="mb-2 mr-sm-2 mb-sm-0 mt-2" style="display:none" id="modalMoneyCountEdit">
              <b-form-input id="inline-form-input-username" placeholder="num<1" v-model="modelMoney.itemCount"
                            autocomplete="off">
              </b-form-input>
            </b-input-group>
            <div style="font-size:14px;color:gray">
              利潤：{{ modelMoney.itemCount }} &nbsp;
              <b-icon icon="gear-fill" font-scale="1" @click="modifyCount()"></b-icon>
              <br>
              建議售價：NT$ {{
                Math.ceil(modelMoney.itemCost / (1 - modelMoney.itemCount)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'TWD',
                  minimumFractionDigits: 0
                })
              }}
            </div>
          </div>
        </div>
        <div class="col-5">
          <div>
            <h5>顏色</h5>
            <div class="row mt-2">
              <div>
                <b-button-group vertical>
                  <b-button v-for="(btn, idx) in colorButtonGroupObj" :key="idx" class="item "
                            :variant="buttonVariant(btn)" @click="colorButton(btn)">
                    {{ btn.name }} (
                    {{ options.name === btn.name ? options.color.length : selectedValue[btn.ref].color.length }} )
                  </b-button>
                </b-button-group>
              </div>
              <div class="col-8 item"
                   :style="{'padding':'5px','width':'100%'}"
              >
                <div class="ml-3">
                  {{ options.name }}
                  <template>
                    <div class="mt-2">
                      <b-form-group label-for="tags-withﬁ-dropdown" v-if="options.ref!==''">
                        <b-form-tags id="tags-with-dropdown" v-model="options.color"
                                     no-outer-focus class="mb-2">
                          <template v-slot="{ tags, disabled, addTag, removeTag }">
                            <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                              <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                <b-form-tag
                                    @remove="removeTag(tag)"
                                    :title="tag"
                                    :disabled="disabled"
                                    variant="info"
                                >{{ tag }}
                                </b-form-tag>
                              </li>
                            </ul>

                            <b-card size="sm" variant="outline-secondary" block menu-class="w-100"
                            >
                              <template #button-content>
                                <b-icon icon="tag-fill"></b-icon>
                                Choose tags
                              </template>
                              <b-form-group
                                  label="Search/add"
                                  label-for="tag-search-input"
                                  label-cols-md="auto"
                                  class="mb-0"
                                  label-size="sm"
                                  :disabled="disabled"
                              >
                                <b-button class="float-right" size="sm" variant="outline-info" @click="addNewTag()"
                                          v-if="search.trim().length>0">add
                                </b-button>
                                <b-form-input
                                    v-model="search"
                                    id="tag-search-input"
                                    type="search"
                                    size="sm"
                                    autocomplete="off"
                                    class="mb-3"
                                    style="width:60%"
                                ></b-form-input>

                              </b-form-group>
                              <b-button
                                  v-for="option in availableOptions"
                                  :key="option"
                                  @click="onOptionClick({option , addTag },true)"
                                  size="sm"
                                  variant="outline-secondary"
                                  class="mr-1 mb-1 float-left"
                              >{{ option }}
                                <b-icon icon="x" @click="onOptionClick({option , addTag },false)"
                                        class="float-right"></b-icon>
                              </b-button>
                              <b-text v-if="availableOptions.length=== 0  ">
                                no tag
                              </b-text>
                            </b-card>
                          </template>
                        </b-form-tags>
                      </b-form-group>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3" :style="{'border-radius':'12px','background-color':'#F5F5F5'}">
          <div class="mt-4 mb-4">
            <h5>選取結果</h5>
            <div style="text-align:center" class="mt-4">
              <div class="row mt-2" v-for="(value,index) in getSelectedResult.size" :key="index">
                <div class="col-3" style="text-align:right">
                  <b-badge variant="info">{{ value.size }}</b-badge>
                </div>
                <div class="col-8" style="text-align:left">
                  <b-badge variant="info" v-for="(col,i) in getSelectedResult.color" :key="i" class="mr-2">{{
                      col.color
                    }}
                  </b-badge>
                </div>
              </div>
            </div>
            <b-button class="mt-5" variant="outline-info" block @click="addRow()">確定新增-共{{
                getSelectedResult.num
              }}筆
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal ref="rowDelModal"
             @ok="rowClass(true)"
             ok-title="確認刪除"
             ok-variant="danger"
             @cancel="rowClass(false)"
             cancel-title="取消選取"
             cancel-variant="outline-secondary"
    >
      <div class="d-block text-center">
        <h3>確定刪除資料？</h3>
      </div>
    </b-modal>
    <b-modal id="submit-modal" ref="submit-modal" hide-footer title="資料儲存成功！">
      <h5>{{ productObj.productId }} - {{ productObj.productName }}</h5>
      <div class="float-right">
        <b-button class="mt-2" v-b-modal.print-modal>列印條碼</b-button>
        <b-button class="mt-2 ml-2" variant="outline-info" @click="$bvModal.hide('submit-modal')">返回頁面
        </b-button>
      </div>
    </b-modal>
    <b-modal size="lg" id="print-modal" hide-footer scrollable title="請填寫標籤數量">
      <h5>{{ productObj.productId }} - {{ productObj.productName }}</h5>
      <h5></h5>
      <b-table
          class="text-nowrap"
          sticky-header
          :items="computedList"
          :fields="brandTableObj.fields"
          sort-icon-left
          responsive="sm"
          fixed
      >
        <template #cell(printNum)="data">
          <b-input
              trim
              v-model="data.item.brandNum"
              :state="data.item.brandNum>=0 && data.item.brandNum<=50 && data.item.brandNum!=='' "
          ></b-input>
        </template>
      </b-table>
      <b-button class="mt-2" variant="outline-info" block>列印</b-button>
      <!--      <PrintViewFunction :ObjectItem='ObjectItem'/>-->
    </b-modal>
    <b-modal ref="mainPic-modal" hide-footer size="sm" title="照片編輯">
      <my-image-cropper v-model="chosePic" :initial-image="thisPhoto" class="ml-4"
      ></my-image-cropper>
      <div style="text-align:center">
        <b-button-group>
          <b-button class="mt-2" @click="noImageButton">刪除照片</b-button>
          <b-button class="mt-2 ml-4" @click="generateImage">確認完成</b-button>
        </b-button-group>
      </div>
    </b-modal>
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

      let dataObj = {
        upsertType: "U",
        productName: "上衣",
        productId: "2200001",
        productManufacturerNo: "11205",
        productManufacturerName: "衣蕾",
        productIsActive: true,
        productPic: '',
        promoInfo: {
          promoId: '123456',
          promoName: '換季大拍賣',
          promoDiscount: '商品95折/全面100元'
        },
        list: [{
          itemColor: '黑色',
          itemColorCategory: 'blackWhiteAndGray',
          itemSize: 'F',
          itemSizeNo: '123',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '2200001-01',
          itemBrandNo: '123456789',
          itemInStock: false,
          itemPic: ''
        }, {
          itemColor: '藍色',
          itemColorCategory: 'purpleAndBlue',
          itemSize: 'F',
          itemSizeNo: '123',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '2200001-02',
          itemBrandNo: '123456789',
          itemInStock: true,
          itemPic: ''
        }]
      }
      dataObj.list.forEach(f => {
        f.itemIsDelete = false;
        f.brandNum = 0;
      })
      productObj.value = dataObj
      isPromo.value = dataObj.promoInfo.promoId === '' ? false : true;
      // sizeList
      let size = ['F', '2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
      let sizeArr = []
      size.forEach((f, idx) => {
        sizeArr.push({size: f, state: false, variant: 'outline-secondary', id: idx})
      })
      sizeArray.value = sizeArr;
      // colorList
      let ColorArr = reactive(     //所選清單-各分類目前所選取的顏色清單
          {
            'blackWhiteAndGray': {color: ['黑色', '白色', '灰色', '鐵灰', '淺灰']},
            'lightColor': {color: ['米白', '杏色', '奶茶']},
            'yellowAndBrown': {color: ['黃色', '鵝黃', '橘紅', '卡其', '可可', '咖啡']},
            'redAndPink': {color: ['粉色', '紅色', '磚紅']},
            'purpleAndBlue': {color: ['紫色', '藍色', '深藍', '淺藍']},
            'green': {color: ['綠色', '草綠', '軍綠']},
            'otherColor': {color: []},
          }
      )
      colorArray = ColorArr;
    });

    let productObj = ref([]);
    let isPromo = ref([]);
    let stickyHeader = ref(true);
    const checked = ref(productObj.value.checked);
    let sizeArray = ref([]);
    let colorArray = reactive([]);
    const mainTableObj = reactive({
      'fields': [
        {label: '照片', key: 'itemPic', sortable: false},
        {label: '顏色', key: 'itemColor', sortable: false, tdClass: 'align-middle'},
        {label: '尺寸', key: 'itemSize', sortable: false, tdClass: 'align-middle'},
        {label: '廠商編號', key: 'itemManufacturerNo', sortable: false, tdClass: 'align-middle'},
        {label: '成本', key: 'itemCost', sortable: false, tdClass: 'align-middle'},
        {label: '售價', key: 'itemPrice', sortable: false, tdClass: 'align-middle'},
        {label: '內部編號', key: 'itemNo', sortable: false, tdClass: 'align-middle'},
        {label: '條碼編號', key: 'itemBrandNo', sortable: false, tdClass: 'align-middle'},
        {label: '刪除', key: 'itemIsDelete', sortable: false, tdClass: 'align-middle'}
      ],
    })

    const brandTableObj = reactive({
      'fields': [
        {label: '顏色', key: 'itemColor', sortable: false},
        {label: '尺寸', key: 'itemSize', sortable: false},
        {label: '成本', key: 'itemCost', sortable: false},
        {label: '售價', key: 'itemPrice', sortable: false},
        {label: '內部編號', key: 'itemNo', sortable: false},
        {label: '條碼編號', key: 'itemBrandNo', sortable: false},
        {label: '列印張數', key: 'printNum', sortable: false}
      ],
    })
    const computedList = computed(() => {
      return productObj.value.list.filter(f => f.itemIsDelete !== true);
    })
    const rowClickData = ref();
    const rowIconClick = function (data) {
      rowClickData.value = data;
      document.getElementById("mainTable").getElementsByTagName("tr")[data.index + 1].style.background = "#DDDDDD"
      this.$refs['rowDelModal'].show();
    }
    const rowClass = function (isDel) {
      document.getElementById("mainTable").getElementsByTagName("tr")[rowClickData.value.index + 1].style.background = ""
      productObj.value.list.forEach((f, idx) => {
        const checkListNo = f.itemNo === '' ? f.newItemNo : f.itemNo;
        const checkClickNo = rowClickData.value.item.itemNo === '' ? rowClickData.value.item.newItemNo : rowClickData.value.item.itemNo;
        if (checkListNo === checkClickNo) {
          isDel ? productObj.value.list[idx].itemIsDelete = true : '';
          return;
        }
      })
    }
    //新增品項modal--start
    //＠click新增規格按鈕
    const newItem = function () {
      this.$refs['newItem-modal'].show();
      cleanAllButton()
    }
    const cleanAllButton = function () {
      search.value = '';
      options.name = '';
      options.ref = '';
      options.color = [];
      modelMoney.itemCost = '';
      modelMoney.itemPrice = ''
      Object.values(selectedValue).forEach(f => {
        f.color = []
      })
      colorButtonGroupObj.forEach(f => {
        f.selected = false
      })
      sizeArray.value.forEach(f => {
        f.state = false;
        f.variant = 'outline-secondary'
      })
    }
    //金額 itemCost/(1-itemCount)=itemPrice
    const modelMoney = reactive({
      itemCost: '',
      itemPrice: '',
      itemCount: '0.33'
    })
    //size
    const sizeButton = function (btn) {
      btn.state = btn.state === true ? false : true;
      if (btn.state) {
        btn.variant = "secondary";
      } else {
        btn.variant = 'outline-secondary';
      }
    }
    //color
    const search = ref(''); //查詢-查詢的tag
    const options = reactive({name: '', ref: '', color: []})  //目前選取-目前所點選的顏色分類的名字、在此分類中所選取的顏色tag
    let selectedValue = reactive(     //所選清單-各分類目前所選取的顏色清單
        {
          'blackWhiteAndGray': {ref: 'blackWhiteAndGray', color: []},
          'lightColor': {ref: 'lightColor', color: []},
          'yellowAndBrown': {ref: 'yellowAndBrown', color: []},
          'redAndPink': {ref: 'redAndPink', color: []},
          'purpleAndBlue': {ref: 'purpleAndBlue', color: []},
          'green': {ref: 'green', color: []},
          'otherColor': {ref: 'otherColor', color: []},
        }
    )
    const colorButton = function (btn) { //＠onclick顏色-分類群組的按鈕
      if (options.ref !== '') {  //如果有點選過顏色的分類按鈕
        selectedValue[options.ref].color = options.color  //把目前所選取的顏色存回所選清單
      }
      options.ref = btn.ref;  //把資料更新進目前選取
      options.name = btn.name;
      options.color = selectedValue[btn.ref].color;  //把所選清單對應的顏色撈到目前選取的顏色
    }
    const buttonVariant = function (btn) { //顏色的分類按鈕-選取變色
      if (options.ref === btn.ref) {
        return 'secondary';
      } else {
        return 'outline-secondary';
      }
    }
    const colorButtonGroupObj = [{
      name: '黑白灰系', ref: 'blackWhiteAndGray', selected: false
    }, {
      name: '米杏淺系', ref: 'lightColor', selected: false
    }, {
      name: '橘黃咖系', ref: 'yellowAndBrown', selected: false
    }, {
      name: '紅粉色系', ref: 'redAndPink', selected: false
    }, {
      name: '紫藍色系', ref: 'purpleAndBlue', selected: false
    }, {
      name: '綠色色系', ref: 'green', selected: false
    }, {
      name: '其他分類', ref: 'otherColor', selected: false
    }]
    const availableOptions = computed(() => {
      if (colorArray[options.ref] === undefined) {
        return [];
      }
      options.value = colorArray[options.ref].color;
      const criteria = search.value.trim().toLowerCase();
      const opts = options.value.filter(opt => options.color.indexOf(opt) === -1)
      if (search.value.trim() !== '') {
        return opts.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      return opts
    })
    let delState = true;
    const onOptionClick = function ({option, addTag}, isSelect) {
      if (isSelect) {
        //tag加入上方選取清單
        delState ? addTag(option) : ''
        delState = true;
      } else {
        //tag從清單內刪除
        colorArray[options.ref].color = colorArray[options.ref].color.filter(f => {
          return f !== option
        })
        delState = false;
      }
      this.search = ''
    }
    const addNewTag = function () {
      // let isExit = options.color.some((f) => f === search.value);
      let isExit = colorArray[options.ref].color.some((f) => f === search.value);
      if (!isExit) {
        colorArray[options.ref].color.push(search.value);
      }
      search.value = ''
    }
    const getSelectedResult = computed(() => {
      const color = [];
      Object.values(selectedValue).forEach(f => {
        const colList = options.ref === f.ref ? options.color : f.color;
        colList.forEach(c => {
          const obj = {color: c, ref: f.ref}
          color.push(obj);
        })
      })
      const size = [];
      sizeArray.value.forEach(f => {
        if (f.state === true) {
          size.push(f);
        }
      })
      const result = {
        color: color,
        size: size,
        num: color.length * size.length
      }
      return result;
    })
    const addRow = function () {
      const obj = getSelectedResult.value;
      obj.size.forEach(size => {
        obj.color.forEach(color => {
          productObj.value.list.push({
            itemColor: color.color,
            itemColorCategory: 'color.ref',
            itemSize: size.size,
            itemSizeNo: size.id,
            itemManufacturerNo: productObj.value.productManufacturerNo,
            itemCost: modelMoney.itemCost.trim(),
            itemPrice: modelMoney.itemPrice.trim(),
            itemNo: '',
            itemBrandNo: '',
            itemInStock: false,
            itemIsDelete: false,
            itemPic: '',
            newItemNo: productObj.value.list.length + 1
          })
        })
      })
      this.$refs['newItem-modal'].hide();
    }
    //新增品項modal--end

    const modifyCount = function () {
      document.getElementById("modalMoneyCountEdit").removeAttribute("style")
    }
    const fileList = ref([]);

    const submit = function () {
      //打api儲存更新資料，並把確認的資料往再往前端送
      let flag = true;
      if (flag) {
        this.$refs['submit-modal'].show()
      } else {
        alert("error - 上傳失敗！")
      }
    }
    //測試中
    const add = () => {
      // 指派 vuex 要做什麼事情
      // $storeT.dispatch('add', 1);

    }
    //測試中
    const count = computed(() => {
      // 用這樣的方式取到 vuex 中的資料。
      // return this.$store.state.count;
    })

    const ObjectItem = ref(computedList);

    //照片相關
    const defaultPicUrl = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnQXUJMX1tytYCBA0uDvB3Z0AQQMhENwtBAkW3CVIcLcQNFhwdwnBCbs4AYK7O0T4zlP/r/fMzs7M21Oj/fZT5+zZhJ3qqX6qpn5V99669YPvv//++2CRgAQkIAEJNEngBwpIk8T8uAQkIAEJRAIKiANBAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdisJAEJSEACCohjQAISkIAEkggoIEnYrCQBCUhAAgqIY0ACEpCABJIIKCBJ2KwkAQlIQAIKiGNAAhKQgASSCCggSdiKV+n7778P33zzTfj000/D559/Hr7++uvw7bffhv/85z/Fexlb3DKBkUceOYw22mjhhz/8YRhzzDHDOOOME3784x+HkUYaqeVn+4DyEFBABnlf/+9//wuvvfZaePDBB8PQoUPDSy+9FN56663w8ccfRyFBVCzlIzDKKKOEscYaK4w99thhookmClNPPXWYddZZwzzzzBPmnnvuKCoWCQxEQAEZiFAB/x3R+Oyzz8LLL78czjrrrHDfffeFN954IwoG/2aRQC0C7EYmnHDCMPvss4e11147LL300mGKKaaIOxWLBGoRUEAG0bhAHD755JPw0EMPhcsuuyzccMMN4cMPP1Q0BlEfd+NVfvCDH8QdyLzzzhvWW2+9sPzyy4dpppkmYPaySKCSgAIySMYD/owXX3wxXHnlleGKK64Izz77bPj3v/89SN7O1+gFAfwh7EiWW265sPnmm0dBGXfccQMCY5EABBSQQTAO8GPcfffd4dxzzw133nln+Oijj9x1DIJ+7ZdXwLQ100wzhfXXXz/+mXLKKRWRfumcHrdDAelxB7T69URTXXfddeGEE04Ijz/+eC6nOCtIVpf87Wqy1R4obn0i8zB75vWLTTrppHEnstVWW4WppprKsVPcrm9byxWQtqHs/oO+++67cNVVV4UDDjggRlc1CslFMIi6wSQx8cQTh8knnzyGbhKNYykfAUTjq6++Cu+++254++23w3vvvRc++OCDhmLCYmOyySYLG220Udhmm21i5JYLkPKNHX0gg6DP//vf/4Z77rkn/O53vwtPPfVUYDVZr+AQXXLJJcPPf/7zsPDCC4fpp58+jD766Mb8D4Jx0MorMGbwkyEeQ4YMCbfddlu4/vrrY5h3vYJgsAjZfvvt45/xxhuvlSZYt+AE3IEUsANZPeIk32effcJNN90U2IlUlyySZv755w+bbbZZdISy83DHUcAO70KTERN2JM8991z0pbGzff/99+sGYkw77bThiCOOCGussYZhvl3on379CgWkX3umQbtYMR577LHhzDPPjAcCqwvmKhydhGBuueWW0dSgcBSwo3vQZISEIIxbb701ji8OoNY6bMp4WnbZZcNRRx0V5pxzTk1ZPeirfvhKBaQfeqGJNmByuOWWW8K+++4bT5ZXm674YRMxs/XWW4cNN9wwTDDBBE083Y9K4P8IEJyBiZSFyt/+9rf4/6vLGGOMEc1YjEXSoFjKR0ABKVCfIxakJTnssMPCxRdfHL788svhWs/OA/HYaaed4klixaNAnduHTWXn8cADD4Qjjzwy3HHHHTWDNDBlnX322XE3YikfAQWkQH3O7uPaa68Nu+++e3jllVdG2H0gGETH7LDDDtHfYYRMgTq3T5uKf42zRbvsskv0u1UXdrz42I477jjzZ/VpH3ayWQpIJ+m2+dmkKTnooIPCSSedFIjCqizkK1pxxRXDoYceGnMZmVW1zfBL/Dic66effno0VdUyZc0444zhggsuCAsttFCJKZXz1RWQAvU7Zz3WXXfd8Oijj47Q6kkmmSSaGojRd+dRoE4tSFM5L7LJJptE/1t1GXXUUaNZFdOpiRcL0qFtaqYC0iaQ3XgMMfqbbrppTJBYWRCMRRddNFx44YUx6Z1FAu0mgP/tmGOOCQcffHDM6lw9/tZaa61w4oknBk6rW8pDQAEpUF9z4vzoo48ewYzACpAfNocKOSBokUAnCLzwwgsxso8dcHX0H2bTiy66KIb0WspDQAEpSF+TpmSDDTYIf/3rX0fwf7DqY/exzDLLaL4qSH8WsZncZvn73/8+nHPOOSOMQVKccG5kpZVW0v9WxM5NbLMCkgiu29UwW6255prxcqjqssgii4Tzzz8/zDDDDN1ult9XIgKE9eJMR0SqrwogAvDwww+PEVnsiC3lIKCAFKSfcaBztuMf//jHCC1GWLh50HMfBenMgjaTXfDll18eQ8Wr/SAk5txzzz3DzjvvHO9Zt5SDgAJSkH5+8sknY2qSp59+eoQWb7zxxnFl+KMf/aggb2Mzi0gAAbnxxhvDb37zmxESLpKwc8cddwz777+/frgidm5imxWQRHDdrsbOg8t8SHZXXbbYYotw6qmnGkLZ7U4p2fdx9ujmm2+OAvL6668P9/aYrQghP/nkk13IlGhcKCAF6exeCwhRN6xA+YP9m8kkO2/C5MEfTiV7gLEgAyqhmQpIArRBXkUBKUgH90pAEA5ybnFHxPPPPx9zcXGojNPJ2c2G+F64oW666aaL51DGH398s/8WZFw100wFpBla5fisAlKQfu62gCAc3377bSD2/6677gr33ntveOaZZ+LtdThQK69B5ewJlwwhHlxYRUqV+eabL4w99tjuSAoyvvI0UwHJQ6lcn1FACtLf3RYQ7oTgsqpLL700HhzjutPq0M1qdOxISOs9yyyzhFVXXTVGjRFa7F0kBRlkAzRTARkc/djOt1BA2kmzg8/qpoCQMA+nPKHB//rXv2reeNjoVfGDYNZaYYUVYuZgLxzq4MDo4qMVkC7CLshXKSAF6ahuCQi+DbL9kp6bmw8b3bU+EDrOA3CVLjmSuIfdUmwCCkix+68TrVdAOkG1A8/shoCw8+A+7P322y9ea9qOQnQWpixyeJFyxUzB7aDam2coIL3h3s/fqoD0c+9UtK3TAoJT/P77748x/rUOK9IUTFM4zMcbb7zAdaaIAX4R7inBsU6Ib62CX2S33XaLp5S9+rQgA65GMxWQ4vZdp1qugHSKbJuf22kBef/992NGXxLl1bo0CEf4bLPNFpZccsmw4IILBu4fQVAI8eWUPJFaONtJuFfL7DXzzDPHZy+22GJtJuPjukVAAekW6eJ8jwJSkL7qpICw++DaUnYJiEFliC54MEMtvvjiMVXFEkssEc95VJqiCPelHhFbZAV+5513RqBKSC/XopKIz5QrBRl0Vc1UQIrZb51stQLSSbptfHYnBeSzzz4Lp5xySjj22GNjuG5lGXnkkeOOY5999okO8Xr3jSA6pLf44x//WHMXgwhxPoRLiWaaaaY2kvFR3SKggHSLdHG+RwEpSF91UkBeffXV6Di/7LLL4uHByoKpaq+99oo3IbKLaFSYYB5++OGwxx57RH9K5U6GHcuss84aBYbwXlOeFGTgVTRTASlen3W6xQpIpwm36fmdEhD8FUOGDIkO7nvuuWc4/wW7j6WWWipGUM0zzzy5IqiI3mInQygwO5vKMvnkk4cDDzww3mrnzYltGhhdfIwC0kXYBfkqBaQgHdUpAWFS+Nvf/hZ23XXX8Nhjjw1Hg3McZFg96KCDAjfO5SlEZV1yySXxbgjyZ1WWn/zkJ9HPQqTXQLuZPN/lZ7pLQAHpLu8ifJsCUoReCiFeJNWJdO5MCjjQOTHOTqSy4Ozm8qB9990392VV7GiuueaasNNOO8XEi5UF5zv3tu+www5h3HHHLQh5m5kRUEAcC9UEFJCCjIlOCgjX5LIDefzxx4ejgZlpk002iWYnfCF5CmdB8KUQbfXmm28OV4X0JnzPb3/7W3cgeWD22WcUkD7rkD5ojgLSB52QpwmdEhB2DAgHPhBMWZVnODj7gcP7qKOOimdA8hTOgXCpENFWH3/88XBVOImOsx5R4iCipVgEFJBi9Vc3WquAdINyG76jUwJC07hvfe+99w5XX331cIkTiZwiRfsBBxwQ05EMNOkTdcUpdqK2brnlluFOpvOsGWecMTrkydRrFFYbBkWXH6GAdBl4Ab5OASlAJ9HETgoIOwV2DOwc2EFUFiKxOP/Bv7MLaZTL6osvvojPYMdSvfvgOUsvvXSM0CI7r6V4BBSQ4vVZp1usgHSacJue30kBYedw7bXXxvMb//znP0dIRYIzfd111427FG4e5FBgpZBQn1xY+D4OPfTQEZznIOAZW265ZTj88MPDWGON1SYqPqabBBSQbtIuxncpIMXop47uQECAwxsBufzyy2ve/4FocIJ82223DYsuumiYaKKJohmKXQdX3SIet956ayCnVq1cWNNOO23cnay88soFIW4zqwkoII6JagIKSEHGRCd3ICBgcrjqqqti9NQrr7xS9x4QIqm4ZZAzHVkyRT7PxVP17g5h97HZZpvFaC6uvi1DgQVnYohK42/4wgshJjiBv4vmB1JAyjBym3tHBaQ5Xj37dKcFhBf78MMP4y7h+OOPjyna21GYLJdZZpnoF8H3UbRJM4UBJ/C5S/7FF1+MYkx+sW+++SaKBqnwp5566njt73TTTRcTU+IfKkJRQIrQS91towLSXd7J39YNAWHVzOE//BgXX3xx4HbCVgp+kvnnnz8cdthh0YHOBDqYCzuNZ555Jtx4443xDyfxEWVS3me7M073s3tDRBZZZJGw+uqrh3nnnbcQGYoVkME8etPeTQFJ49b1Wt0QEF4Khzgr5xNOOCH6Q1g9p1xry0SJeOBX4SwJ/38wF8QW0TjttNPiiX5ygjXixk6MdC4//elPwwYbbBCzDLA76eeigPRz7/SmbQpIb7g3/a3dEhAaxsSHMxzHOEkRa0VmNXoBJsJf/vKXYbvttgtzzDHHoN95ELJ8wQUXRPPfyy+/HP0deQtCMs4448T8YJzSx6TVr0UB6dee6V27FJDesW/qm7spIFnDML088MAD0ZxFpt733nsv2vIRmGx1jZmKP/g6WFGTsp0VNdFWZbgDnSi0K664Ipr9OJCZWrjqlxQv5Aojwq0f745XQFJ7d/DWU0AK0re9EBDQMGkwSXLCnJxZOIcREsQFcxemqcwxvMACCwy77na00UYrCNn0ZsLguuuuC0cccUR46qmnmtp51PpWdh+IyNZbbx2zH/dbwIECkj5WBmtNBaQgPdsrAanGw4FB/CKZgJBwkcy6hPcWJZqoHV3OTozDl4jH0KFDa4oHAkD6F0KX2WFwWRfiS5RWLTMXuw6EY4sttogXeOFo7ycRUUDaMXIG1zMUkIL0Z78ISEFwdbSZOMwRD0KT64kHYkruL/J+sTNDYKn37LPPhhtuuCHe3IgIVRcEg4u3Nt5447DVVlvFk//9Ys5SQDo6rAr5cAWkIN2mgPRHRzHpX3nllXHnQchuPYc5p/a5VGuVVVaJjnGEAb/R119/Hf1Kxx13XLjrrrtqigiCgYiQ+oWT/xNPPHFfvLwC0hfd0FeNUED6qjvqN0YB6X1HIR5clsW5lkbigRnqyCOPDGussUbNvF8856GHHor3w99+++11RQRnOrsQHOvsYHpdFJBe90D/fb8C0n99UrNFCkhvO4pJ//rrrw+HHHJIdJgTQFCrTDnllHF3sdpqq4VGgQRMxo888kjYf//9w9133x3TndQq+FC23377eJ6m1yG+Ckhvx2A/frsC0o+9UqNNCkjvOgqz02233Rb+8Ic/hEcffXS4e06yVmGi4u6Ugw8+ON6dkicKDdHgEi/q8Dd5s2oVzolwDTDnargZslc+EQWkd2OwX79ZAenXnqlqlwLSm45i53HHHXdEnwdmp1o7BRzmJJjcZZdd4onyZtLVIxqZiPz973+PkVq1CpFc+EPwi0wxxRQ9ic5SQHozBvv5WxWQfu6dirYpIN3vKCZzfBT4Mx588MG64kFiRM5vrLPOOtHM1OwOARHBsY5I4Vhnx1NdMsf65ptv3rMQXwWk+2Ow379RAen3Hvr/7VNAuttR7DwQD8xW+Cpq7TwwWxGqi3kJ8SBJYrPikb0Vzye0F7HCXDZQiC+7ESK1Ur8vhaYCkkJtcNdRQArSvwpI9zrqu+++i5djEW1Vz+dBa3CYc38KtzUSJdXqZM73shPhfMmdd95ZNzqLKC9Oq+MTQbS6VRSQbpEuzvcoIAXpKwWkOx3FJI7PA8d2I/HAJ3HAAQeEDTfcMOYAa1U8srfDbIavBRFhB1TLJ8J38f2E+O68885dC/FVQLozBov0LQpIQXpLAel8RyEeJI1EPPB51IuKIhIK8dhkk006co8HEzXfv++++zaMzuKmR86I7Lbbbl0J8VVAOj8Gi/YNCkhBekwB6WxHsdInCgqfByKCmFSXLM0IadfJV9VMtFWzrccnQjs4d4JZq945EZz2O+64Y9yNIGydzJ2lgDTbi4P/8wpIQfpYAelcRzE5M0kffvjhMQqqlngQqktyQ+7t4H73bpwMZwd0//33R1/MvffeW9echXAQ3kuEFrmzOiUiCkjnxmBRn6yAFKTnFJDOdFQmHoTQ4vuot/Pg/nImaZIcdvMwH5N2FuKLY71eiC9nQ8jg20kRUUA6MwaL/FQFpCC9p4C0v6MQD1b4XAbFYb56Dmuirdh5bLTRRvGSrE6t8Ou9YSZyWe6sWiKSmdcQEUJ8idRqd1FA2k20+M9TQArSh0UWELLQtitKqV3dhXkIn8dBBx0UL8qq52Mg2mmnnXaKK/tu7jyq3xNxYydy9NFHNwzxpY3bbLNNPJvS7txZCki7Rt/geY4CUpC+LIqAMNG9+eabYciQIeGxxx4Lr7zySrzRkKSA2OfnmWeeMO+888Z0HEQR9aIgHoTKEkmFb6GeeHBRFhFO7D64dbHXIoh5jXbjq8GcVcvcRhsRDkSE1Crt9NUoIL0Yrf39nQpIf/fPsNb1u4AwuXDdLfeDc4f666+/Hic4JutsB4Ijmitwp5122vCLX/wirLXWWmG22WbLlXiwXd2EWDz++OMxuokT3/UmYSZeopsIk+U2wX4pcGbnRIgvf9cLNUawERB2T+045Mj7KyD9Mgr6px0KSP/0RcOW9KuAIA6ffPJJjF467bTT4qTGzXsDFbLVzj333NHUstJKK8UVfqd9C4gHHDmkd+ONN9Z0SNMGzECE6dI2TFj9VngPUsDju+G8SC0RpM3cJ0KOLsxv7bhjXQHpt5HQ+/YoIL3vg1wt6EcBQTzeeeedcP7554fTTz897jrq3dBX6yUxt2DWIhUIEU7TTz99x8xEtOuJJ56I5zy4UrZRrikc0ZiAmHR7bbaqNzgQEcQDcxZiUut9sjvWERBCj1u9Y10ByfVTLdWHFJCCdHe/CQji8dZbb4XzzjsvnHrqqdHvkVrYfTDJsVpudZKr1QYmvieffDKep+BSqEaTLeKBmHXyPEUqp+p6mTkLUUREGoX4IiDsqogoSxVFBaRdPTd4nqOAFKQv+0lAsp3HOeecE84+++y486h3Q18evExomFs22GCDKCJczNQucxbtgh0O83rnKGgjpiqEgySFTLL4a4pQMF9hNjzmmGPiOZZ6Ib7sphBpAgIw0aUUBSSF2uCuo4AUpH/7SUDef//9cNZZZ8Wdx9tvv91QPDg3weT86aefhjfeeKOuiQsRISkh+aX23nvvMPHEE7fcM4jH0KFDwz777BMTE9bzFeAkRzhITNjPZqt6QLIEjKSCR0QaJWDkjAiBAez6mi0KSLPEBv/nFZCC9HG/CMjnn38ezjjjjHhvxQcffFCT3iijjBLvycC3sdRSS8UoIOpx3uLcc8+N0Vr1dizklyJNOSLCVa6phec/88wzYb/99osO83riMeaYY0bx2GuvvfrSYZ73/TOfCIkgyaFVLzQZpvBNScCogOTtjfJ8TgEpSF/3WkAwW7GLQABw3NYTD8J0F1544XhPxtJLLx3Pf2QF8wor5EaXNPHZ0UcfPZqydt9992jaatZmz0T37LPPxnZeffXVdX0DTKb4PPbff/+kFXm/DR3eG5HmfTh0WC/EF9EkISSM2R3m5auA9FuP9749Ckjv+yBXC3opIIgHZivEA1s7/7tWycSDif9nP/tZPPNRXdgJ3HLLLTEElfMY9SY56nIOg1Babt7L6xNh54F4kPbj8ssvD19++eUIbWDCZFe03nrrRZHC5zFYShbiS8AAUVr17ljHD8JOBJNh3jvWFZDBMkra9x4KSPtYdvRJvRIQxAM/x5///Odw/PHH1xWPUUcdNSy66KJx57HccsvVFI8MEFFQ7ETYITDJ1TNnYacn/xQiQjLDPCLy/PPPx+dyoLHeeRR8LZjXMOMQOpznuR3t3DY/HBHJTqxzPqde1FmzCRgVkDZ31CB4nAJSkE7shYBk4kGobnbOg/9WXfB5LLLIItFvscwyyzQUj6wukxxRUURHMdnVK1zZSggqq2VCfBuZWwgrPvDAA8NFF11UVzwwqa2yyipR6DjISNsHY2GyJ0EkWYbrnRNBOBERwnv5M1AAgQIyGEdKa++kgLTGr2u1uy0gCMV7770Xw3SJuKoXqssEvPjii8fUIAsuuGBTaUkwZ5GLirr10nJkIb5cHZuF+NYSESK8OGF+wQUXxJPxtQqn31ddddUYlTXHHHMEdk2DuWSXZGUhvvUOTyIcCAgijc+pXlFABvNoSXs3BSSNW9drdVtAPvzww3DmmWeGE088Mbz77rsxn1V1YQJebLHFoj8Dx3nK2Ql2IiRdZEeAA7hWQTDYOXCOgR1GdZZZ2odjHh/NZ599VrdvVlxxxXDccceFmWeeedCZreq9NCL98MMPR7NevftOsgSMhPjiXK8X4quAdP1n3/dfqID0fRf9XwO7KSA4ntl14IitF22FeCy00EIxHfqSSy7ZkikIEWFyI+SW96yXDoXoIc4w7LHHHjHBIaKGeJx88skxtLheWxG2JZZYIp5bmWWWWXJHHRVkaAzYTPiyw8NcyP0n9QIX8A0RuMB5mFqp4BWQAVGX7gMKSEG6vBsCwoT88ccfx/QkrOgHirbac889w7LLLtuU2aoebswtmWMdn0i9SY4U8JymZpKjIHT8ISdXrV0SZiuc+scee2zceeQNWS3IsMjdTHhiLkTwG2XxJbQZkSYXGIc5KwMMFJDcuEvzQQWkIF3daQHJVvNEWxECiwmrVmFCxmFOBNPyyy+fy2GeFzEr5Ztvvjn6RAjxrbcT4ZwI5izu6yCRI3m4aokHZi+c+pyLWGCBBUorHhl/RIRDhpiz2InUO7FO9gAEhBBfQpwzEVFA8o7k8nxOASlIX3dSQCpDdU855ZSYJLFWwWyFeGBCYufBRN7ugqOXtCNMctju64kI4oCY4fOoFQaMuQuB404MTG181hLiifxHHnkkmieJgqslIll0VnbHeiYiCogjqJqAAlKQMdEpAakUD5zmr732Ws3VPNFWOMyJYMLnUeuQYLtQMsnhUMcnwonqZgttw2zFIUEEr5NtbbZt/fB5diLwJWptoBBfEkzyh12JAtIPvddfbVBA+qs/6ramUwKSJUbknAemoFpk/0YpAAAgAElEQVSr+Uw8iLZiNd+N8FfMWZhbyO3UKC1HNTDayu4IoSOsuBO7pIIMmYbNZKeXZfFlJ1IvxBfh2GqrreJhTvwjmBjxQRHWXVkYExz6JKChV1cVD4Z+Kdo7KCAF6bFOCAi5rXBAH3300dFhXi9UlxBdTB6s5rt58C67uxyTGSKSJ2U8p+E5Mc+96ylhxQUZDm1pZp4EjAQdIBzbb799vB6XAAcFpC34B8VDFJCCdGO7BeSLL74If/rTn6IwcGCwVsFvwI6D+7dJjNgLPwLmLO4u5/xHoxBfhG2++eaLubpSz6QUZCi0tZmISBad1WinR4gvAkLqF0yL7kDa2g2FfZgCUpCua5eAsMsgwopoq0Yp2fEbIB5ZqG4v/QhZ7izScpA7qzrEF2HjNDwmNsxW7jyaG9RZiC/mQsxa9VLBczZkrrnmirc7Vp+50YTVHPPB8mkFpCA92Q4ByW4SRDxYqdcL1c2irXBCtztUNxU3kxz2d3ZMQ4YMGWazJxoLoeM+D3ZJ3TSxpb5LP9bLHOuc/8HBXssnQrsRZ8xa1SKugPRjr3a+TQpI5xm35RtaFZDKO8yzxIi1GpadMGdC7lSobiqQzPF76aWXxnMivBO+jrXXXjtGiFXePZL6HWWul/lEEJF6WXzr8VFAyjlyFJCC9HsrApLtPMgVhdOcUN1G0VakvMAZ3UuzVb1uIZSUU+ekmKdwWpo/vfDPFGToNNVMRIQdCIEV9UJ86y08jMJqCvWg+LACUpBubEVAssSI5ILikGAt8cju88AOjnhoCirIwOhAM9np4VAnI0G9O9arv9YdSAc6ogCPVEAK0Ek0MVVAiLYiJTsnu+vltsrMVjihMQUpHgUZFB1sJj4ORIQ0MNwrUi83WdYEBaSDndHHj1ZA+rhzKpuWIiCk+SBXFMJA1tpaBdMPkUv4PAa6SbAgqGxmmwgQQo0Zi11powSXfJ0C0iboBXuMAlKQDmtGQPB5EGZJtBXpKuqlOcfHgXgQqssd5voRCjIYutjMzCeSZQRAVPSBdLED+vyrFJA+76CseXkFJMttxc6Dy5PqHRLETIWvg6y6K6ywQl86zAvSNYO+mQQukL2XEGoOHdYK8XUHMuiHQc0XVEAK0u95BIQfMdFJ3OdBYsRXX321bmJETmuTL4qzE+aLKsgg6GEz2YkgIoT4kjvLcyA97Iw++moFpI86o1FTBhIQ0rBzGRTpSRCPRneY4yjHJIGIaLYqyADog2Z+/fXX4S9/+Uu8frj6EKo7kD7ooB40QQHpAfSUr2wkIFyuRJQVO48TTjgh7kLqJUYkISLiYbRVSi+Uuw6mrJtuuilst9125sIq91AY9vYKSEEGQiMBWW+99WIiQXJbNQrVxWHOlaZLLbWUoboF6fd+aqb3gfRTb/RHWxSQ/uiHAVvRSECmmGKKeLNcPfHIsuqSFp1oq348YT4gAD/QcwIKSM+7oO8aoID0XZfUblAjAWn0Ctk5D8SjXxIjFgS5zawioIA4JKoJKCAFGRMpAkKoLplqM/Ew2qognd2nzVRA+rRjetgsBaSH8Jv56ieeeCLg63juuedyVUM8iLLi8h/uMFc8cmHzQw0INBIQdrqbbLJJDOLwStvyDCMFpCB9zSU+6667bnjmmWcGbHF2n8chhxwSr6Htxh3mAzbKDxSeAAJy4403hm233TYm5awsY445Zthxxx0DmZz1sRW+q3O/gAKSG1VvP/jiiy+GddZZJyZVbFTYeSAaRFstscQSRlv1ttsG1bdzePDyyy8P22yzTfj888+HezfuTSclzi677OLZokHV641fRgEpSGdzcGuNNdaImVHrFcwICyywQMyguswyy7jzKEjfFqWZRPqdccYZgZsqq3NiTTDBBPEs0mabbea4K0qHtqGdCkgbIHbjEZgPVl999WhCqFUQD3we/XQNbTe4+B3dI/Dpp5/GrM1kOmA8VpbJJpssistKK63knfTd65Kef5MC0vMuyN+ATTfdNFx44YUj/Hh5wvTTTx8z76688so6zPMj9ZNNECCAgzH48MMPj5DpYPbZZ49jc84554x3plvKQUABKVA/n3baaTEkt9r+zCvMPffc4ZJLLgkzzzxzgd7IphaFALdYcqPlvvvuG9iJVBYEY8011wwnnXRSYCdiKQ8BBaRAff3000/HFeCjjz46QqsnmmiiQNQVebG8UbBAnVqAppJX7Y033ghbbbVVuPXWW0fYfRAiTn61HXbYwd1vAfqznU1UQNpJs8PPItsu0VXE2lcXQnVJU4IjEzPCSCON1OHW+PiyEMB5fvLJJ8fgjK+++mqE155hhhmi+YpDq5ZyEVBACtTf3Mlw9dVXh1133XWEbKi8xnjjjRe23377sNNOOwWiYiwSaJUAu4/77rsv7j5eeOGFER438sgjhw022CCcfvrpHiBsFXYB6ysgBes07vnAXHDRRRcF7meotkVPN9108b6GX//614HYfIsEUgkQqou5lMOBd911V83gjSmnnDJw+yUXk1nKR0ABKVifswshlBdnJqfScW5WFkxXs8wyS9h5552jY5NdieasgnVyj5vLroNra4m2IrLv9ttvH+HcB00kZQmHCrnqdowxxuhxq/36XhBQQHpBvcXv5MIo7js/55xzwkcffVTTrMBOZP311w+/+tWvYogvjk7DK1sEX4LqiAfji7vP2Vncc889Nf0eBGqw68DnNv/88zu2SjA2ar2iAlLAjucQ15AhQ2LUFTfE4eSsLojFuOOOG9OZrLbaavHHPvXUU3tKuID93Y0mIxyE55Iq57rrrovj6pVXXok7kVqFRQkBHWuttZaRV93ooD79DgWkTztmoGYhGqwOyT/UKD8W0VmTTjppjMxipUieLM6KkPwOB6jmrYFID85/RzAwf+LnYMcxdOjQcP/994dHHnkkvPzyy+Gzzz6r+eIsTCaZZJJouiKpIuHj7mwH5xjJ81YKSB5KffoZROSGG26IUVmsFusVfuCIBWYsHOvjjz9+mHzyyeMOBYFxAujTDu5gsxCPL774Irz77rvhvffei7sPDqjiY6v2q2XNYJxMOOGEYYsttojiwU2YLkA62EkFeLQCUoBOatREfvDXXHNN2HvvvcNLL71U98df8Ne0+X1AYKyxxgpbbrlljPJjV2uRgAIyCMYAIkKsPgcM+ZvVZL1V5CB4XV+hywS432OqqaYKG220UTwPggnLIgEIKCCDZBzgWCfZ3XnnnRfNWuxGsG9j67ZIIIUAkVaYO8nyjHAsu+yyhuumgBzEdRSQQdS5iAj2bHYhiMgDDzwQ3nzzzXjgUCEZRB3d4VfBL0Ymg9lmmy2suOKK8c+ss85qjrUOcy/i4xWQIvZagzYjFOw83nnnnXjQ8LbbbguPPfZYeP7558MHH3xQ8zTxIEPg6yQSIDIPU9Vcc80Vw7/JbTXjjDMGfB86yxOhDvJqCsgg7mD8IBw0JP0JAkIuI67G5f9zwyG+knpx/oMYi68WQtxNEJHHHxzi00wzTcxgwAFUkiMSnstJcyP0HC6NCCggJRgf7Eowb7EzQTAI/8Xxzh3XmrZKMADqvCIiwh9usyTEmz+eDSrveEh5cwUkhZp1JCABCUjAKCzHgAQkIAEJpBFwB5LGzVoSkIAESk9AASn9EBCABCQggTQCCkgaN2tJQAISKD0BBaT0Q0AAEpCABNIIKCBp3KwlAQlIoPQEFJDSDwEBSEACEkgjoICkcbOWBCQggdITUEBKPwQEIAEJSCCNgAKSxs1aEpCABEpPQAEp/RAQgAQkIIE0AgpIGjdrSUACEig9AQWk9ENAABKQgATSCCggadysJQEJSKD0BBSQ0g8BAUhAAhJII6CApHGzlgQkIIHSE1BASj8EBCABCUggjYACksbNWhKQgARKT0ABKf0QEIAEJCCBNAIKSBo3a0lAAhIoPQEFpPRDQAASkIAE0ggoIGncrCUBCUig9AQUkNIPAQFIQAISSCOggKRxs5YEJCCB0hNQQEo/BAQgAQlIII2AApLGzVoSkIAESk9AASn9EBCABCQggTQCCkgaN2tJQAISKD0BBaT0Q0AAEpCABNIIKCBp3IbV+v7778MHH3wQvvnmm/jfRhtttDDBBBOEUUYZpakn//vf/w7vvfde+N///hfrjTTSSGGcccYJY401VlPPqfXh//73v+HDDz+Mfz7//PPw7bffhjHHHDM+/yc/+UkYe+yxww9+8IOWvyflAfD76KOPwldffTWsOm0bf/zxcz+Oup988kngPbMy+uijh/HGG6/pfqj8Up73zjvvDOsT/o1n0r528PrPf/4T353+oPDOPLuThXf6+OOPw/vvvx/HAuPuRz/6Ufjxj38cJpxwwjgmWn03voPfxHfffdfyq4w88siRC/1p6T8CCkiLffLCCy+E008/Pbz11lvxST/84Q/DKqusEtZYY40oJnnLc889F4488sjw9ddfDxOiZZZZJvzyl7+MP+qUwrOYoO666674hzYyeSB2iAY/zOmmmy6stNJKYb755ouTyKijjpryVcl1mDzh98ADDwx7xtRTTx122GGHMMUUU+R67v333x8uvPDC+G5ZmXHGGcNmm20Wpp122qQJEWG7/fbb43OzCZ6JddVVVw1rrrlmGGOMMXK1rd6HEI877rgj/PWvfw2fffZZ/NgMM8wQdtpppziRt7PwLrwDfK666qrw2GOPhbfffjuODSZ5RAthhPecc84ZllpqqTD99NPHsZAiJjz7+OOPD6+++mrLrwHnX/ziF2GFFVaIQmfpLwIKSIv9wSTzm9/8ZtiPhR/cbLPNFs4666ww77zz5voB8gO/5557wlprrRVXhZkQrb/++mH//fcPk08+eVOtzFbOF1xwQbj88suHTRb8d3Y4fB87HP4wSUw00URhjjnmCJtuumn42c9+FsWlW4Xdw1ZbbRXbmZVpppkmXHzxxWH++efP1YxLLrkk7LHHHvE9szLVVFOFAw88MKy99tpR1Jst7Aa32267cP311w+3K6SvDzjggDDuuOM2+8jhPs/zDznkkHDeeecN270iHGeeeWZYeeWVc42bPA2gv19//fXIl3d5+umn4xirHAuMWcYCq30WEbPOOmtg7K222mph0kknbbotLIY22GCD8NRTT8Wx1kphB85iYuedd26ZeSvtsG5tAgpIiyPjlltuCVtvvXV47bXXhnsSYvDnP/85lwmKHxk7BHYtlQLCj/Cggw7KvRKnAUwMTzzxRDj88MPDTTfdNGxHM9BrMolMMskkUQz5wbY6QQ70fdm/f/nll2GLLbYIl1566bAq7EAuu+yysOCCC+Z6zF/+8pew6667Dicg7P7gd/DBBzfFjy9k0r366qvDb3/722jCygqTLKLCM1mxt1IefvjhuNvg78xsiZmG5//hD39oavdarx08l8n8j3/8Y7jyyivDp59+mrvJvN8mm2wSuebdCWYPf/bZZ8Ovf/3r8OSTT+b+vnofREB23HHHsNtuu7XMvOXG+IARCCggLQ6KegLCKv6oo44KG2200YDmjnYJCGaRRx55JE5At9566zDTC6+IQDCpZmYJJhfMGtSpLKxAt9lmm7jim2yyyVqkM3D1TgkI74sZ6+ijj44mumZMc4gGOxp2QZV82iUg7LrOP//8uDioFqjFF188nHjiiWGuueYaGF6DTzCmhg4dGndLjIXMNJpVYVdWORbwhfCncseAiZNdKUI35ZRT5t6J1BIQ2OEX5O9mCgKy/fbbxzZ0a1HTTPvK/lkFpMURUE9AmMCwJx977LHRpox5oF5ph4DwjH/961/hiCOOCKzIv/jii2Ffh3BgX6c9rO75/0zczzzzTFwlMolVOqARv3333TeuwFu19Q+Et1MCwvdiM8cPghlw4oknHqgp8d8RVvqUd4dnZWmXgGBS2m+//WI/VTuaMRkhLKz+m/GhVb8cQQX77LNPOOecc4ZbSCAciAHmQUyFfAfiwrv+4x//iDtphCQrBFnsvvvucReQ15FdLSD8FjCTLrDAAjHApJnC+Ft99dUD/sAUU2Qz3+VnmyeggDTPbLga9QSEDzHgMz8GP9ZOCgiTAL4AVpxvvPHGsJUkP8Dll18+TkjzzDNPdJwjZkxcb775Zrj33nujqY3JI1tt84PHqY4jdJFFFml61dgM0k4KCO2YaaaZwqmnnhqWXXbZXCtoItXwTZx99tlRZNstIAjUnXfeGQWKAIzqQn9tvPHGUcCb9X1lz+I7cM6zaq/0C7G7XHHFFcO6664b/XNZtCBjgaipRx99NJoSb7vttuHefe655448GBN5SrWAILyYIxFNFjHNFMYq5rS84tXMs/1s6wQUkBYZNhIQJmJWlHvuuWfYcsst60aRtGMHQoQV9mp8B5lNHRMFEUN77bVXdIxWr2j5XnwuN954Y7ST4zvJdiKYCzBj8YeJp1Ol0wLCBIRfB1PWQJMQ705kFP01ZMiQ4cJ3ef927EAwGx533HFRICp3fRlfxgyTLe1ddNFFG+5c6/XJu+++G30p11xzzbDvoO/xy/FuP/3pT2ua9BASRI2dS2XwANwQPPxqeXZF1QJCH2CaO+aYY3KLUKfGm89tLwEFpEWejQSER2P3XWKJJaLjdeGFF655LqEdAsLkz8ry+eefH/ZG+DBYiTIhNbI9E86J3f2kk06KoZ1ZuwlHPvnkk5t2ojaDtNMCQlsIVSZ8daDVL+8OA1hkHNq9AyGUdp111okhwlnBvMP3ZTtAzEZEkG2++eZJoat///vfw4YbbjicCW7mmWeOPrmB/EG0gTGD05qdLAVRY/eKyY0d3UBFARmI0OD5dwWkxb4cSEB4PCs4zBL1QnJbFRDqM0ESDYYJJiusOAnlHSh+nvo4Wpk0CPPMHKnYyTmjkTccOQVlNwQEESfSC2Got4Jm18b5iN///vfRrJft4totIPfdd1+MUKo0LTE2COPOzk3QXiLIWPE3G8jAroaJnh1vdn6FxQN+BHaZnO9oVOj7l156Ke5mr7322mEfZUeKP4VzSQMVBWQgQoPn3xWQFvuyloAwATABVU5ChEIeeuihcZdQ7QxsVUD4HlbO2JizMGBe67DDDosTYp5T8fzoCd+9++67h5k9MHXgB+FsSLPRM3mxdkNAaAsmPMQUMaxV8CFh54dhvXDXVk1YTO577713ZJo5zzn7gbARMUX0XLbi5ywRZ0LYtTZzmI9Dojy/0kSGCRITFAuEPE5s+gSzZnUkH0K33HLLDdgeBSTv6C/+5xSQFvuwloBgsuKHjFMyW80z+Sy00ELhjDPOCLPPPvtwP8J2CAirVSagypQgOMcJI84z+bMixldwww03DDOlELmF3ZrT13mekYKyUwLCpMufSn8Qobn8qZUe5pVXXomTLGdnsj7jc/CsTC/TyjmQf/7zn3En+uCDDw4TCsT5hBNOiOYmdh1ET1HIPoAvotlIOHiycCCrQdZuRAPfB+HZef1ZmLJ4VqWfhhPreSKhFJCUX0Ix6yggLfZbLQHBXIKIsPrnxHFW+AESV48/pDLXU6sCwo8cmzmTfWW8/xVXXBFNDnlWsNjgmWA4QJfZ4vEd4MzlgGPRBIQJmMmO6KJsIiWa6Nxzzw38XVn4d6KPiFoiRxSFAARW/ywCMqat7EBgSpQcgpClLskOyREmy3cgLplvhD7DX0EEGaHXeQvh24wFHPXZe+NjwXxKSHOnw7JppwKSt7eK/zkFpMU+rCUgpOYglp8zGUxYlWYlhIMVJ47UzB7fDgFhtcpzs6SOvNZ1110Xdw95CpMaAoLoZAJC6DErWXwpjc6x5Hl+vc90agdCahYEkJDZjD+rb0w7CEXlShqRZ2KvFE+czrw3QQTZhN+KgOCbwkfFifCswBdzE8EKCAYLCxzdWR+SjoUdK6G3eRYBPJd35R1pdyYgnIHh2QjUQJForfRlVrdWGC/+NHZB7L7zFFizc2pHcsc83+dn0ggoIGnchtWqJyBM5oREYjJhVVlpCuDHhN2bMxaUdggIu51TTjlluENjmGN+/vOf53rDLCcVYcCZgHDgDBHE6Vs0AVl66aXj7osVPOk8KLwDB9LYqSEwmYmLqKNtt912WOQVws65GZ6BySrzibQiICSL/NWvfjUs6SZtYYeBYxuxohA9Re6uLDEnn6FfOduTx3TEMxA7JmqEJxMQQskxa2EiqwwiYNyx46rOOFxvwODHI0JsoFLrICGHU3Hg5zWhsVsnkgwRzxM6PFCb/PfOEFBAWuTaSECYcFjVcg6j8lQz5hHMCfyo+UG2Q0B4Hqk3KoXq5ptvjqvXPIWIHSJ3MLNkAsKEgW+Fw5BFExB8C6zE//SnP0XzVBaRxGTKbi0z57Az4P1wGGeF98aBzQTMpNuqgNC/CDFBFJmPigmVSKff/e53w5JXshNi0uQgX1Y4vIdfKu9JetqKs5z3zgSESC6+nwCOypQuvDtJP3l+5enzeuMFMYXVQEEZ9XJh5d1F8f3sPFh8wacbu6Y8vxE/MyIBBaTFUdFIQAif5VAX5oPqlBKcMua/Z6vCVpIpMuFzYJDDX5WlGQEhKggBIQQ0ExDaiGO+qALC7oMT9kyopA/JdiGs/PHtsPKn/zAnZmYuhJJJnAk3O1vTqoBw4p/Jl4k6E3gi3DBXsUPMJmT8IOxcEbhs8kdoGDvsXvIUnPAIEwEU2TMQRL6L3U3l5P/yyy/H3QoHDvMICDshPj/QbqgdyRQREL5LAcnT6737jALSIvuBBIQJ46GHHorhoZwByH6oTFTkyMKEwQE3zgGkZuPlO3Dcc3dFu3cgCMh6661XyB0IZ1jY4eHbIZ15pUkH8eZsBKtcwnszbpjtmGwxf+E/YdXeioDwnQgHIkYUFrsRdgH4phCxynMZCDeijz8my+7MOMGEyE4hjwOctuKUR3QqdyBZP1buQBAQ3j+vgOCcTxWQ7OqAvMEYCCfvAQt3IC1OUh2sroC0CHcgAeHxRMaQfZVVbWWeKg5nETqLU5e7E9hFpKRzZ/JjIsBxmplq+N5mfCA4s3HyVvpAcOLSZlboRTRhISBM0Pg4CGzILpxiFQ5rzHsIeOYjwdbOfycXFiHM9G2rAsKOgISa+LwyIcI5zC6BLLOVPgHEhUkdkycHQ7OdIG1h/OQ5E4IPhPq8e6VgYj5jt1u5eyB0GSHlzEdl1uHsAip2RJVnmVIFBNMVu1n8T3lNcezeuUSKdC55RafFn7LVEwgoIAnQKqvkERA+zyljdiHY47NDZPwwODDGD56JBFNRqoBg7yeipzIKi5PEXAqUpzDxICBMtpVRWNlqvMgCQigvAoI/Kisc4ENcyHnFRMkkR7gsHOkHJjB2A60ICBMxJ/tZSRNIAdfswjHCbGsdyqMfmPzZndBuCrsGJvo85hzGD+OMg6WVUVhZht/K1TzfheMe/1ylUDA+cfrz/pURhKkCwtghYIRdEClR8pTs+oGB/C15nuVnOkdAAWmRbV4BYZeASYSoGmzrWWHVy0qLyYTJK8sAy0ox74VS/Pj5cbOabvc5EJ7JlaKdWgV2KowXJ3q2A4EP/iEirbIUIplJhckyMyvhG0EwyffEBNaqgPBsFgz0a2aS4nvJjoyAcD6jumTjBMFgZ0TbaAu7JRz7mNgaFXa7iAW7nspzIIgKubXymMHoE5zw7FoqzzHRJna6A0VFeQ6kxUmlQNUVkBY7K6+A8DVE4DAJ8GOuvK8DhyGhvfhIst1JswLC6o6IqcqT6EwChKPmmfwJHcWcVmnO4EImQl45p5DnGSkouyEgtAvzEalaKoMEKtvL+RxMVwQSZBNkqwJCiCyRdvR5JuzZzY+EEddiimDQVsSDv7NT8QhHdiakUV/Ak3GA6bHyJDoTPwKaJ4yWsUmbGVPZLghWLCbYBQ20G1VAUn4JxayjgLTYb80ICF/FpMLlPJUH9phUMFNU3gjXrIBwBoTonUqTAytGci8N9IOnXVwuhU2eRIKZQ5n8UZjF2B0VXUB4R0J1Se1Suarmv8Ofy46IXCI6KiutCgjmMUTr/vvvH85ElKVZaTT0qpM5cmqdyZvdTKMoKHxgRHLR71k/IhpEgWFKy5MLi/BeROi0004bJnyMT3Z07GIGKgrIQIQGz78rIC32ZbMCwtdxCyARQDgx65VmBIRVKqfO+XFXZuPlO1hxD2S2oD4OdyYYfvzZqpc08Kx6uV61mRj+ZpB2awdCm2CDeHNeprLAGrMP/1aZubgVAWEi50wN/q3KzLvNsKn8LIsALsXC9IXfrF5BePhexkJlNl6ivthN4pBvVLKbLXHyV/qMMLedd955uQ6mKiCpvVy8egpIi32WIiCYqTAv4bfgnEit0oyAUJ8oLsI92UlkhR89kwl5ueo5I7PTyExMrDizSCE+jwDhjG02pXgzSLspIOzwiG5iJV85qZOhl1BedlyVpRUB4XQ3pkqipzKzZJ6dR+X30zeZmPPf6QfMbOyiGt3xTtg4nyFsOCsEDJCWhqCKRj4MGBHyTNhxJSOiodg1cxBzoKKADERo8Py7AtJiX6YICF9JVBYHswibrXR8Z81pVkCYsIjRrzwLggjgGMacwS6i+l4QJidCWzkHgIAgPpnZA58AOxJMMKSV6FTppoDwvi+++GKMaOK0N1FRMMJPxMRcPbGmCgjfg9kKnxLCnhVCWDGV5Y0sIuSb3Wq2k8CMhY8Gf8Ykk0xSt0vwW7CbYmxl/YngsCBgLJCPqtbtlIxDxgDCx7jOxIuxyHkMdjB5igKSh9Lg+IwC0mI/pgoIkxf+Bn7QDz/88HArTZrUrIAQvksILllXCcvMfvyEbZLTidPV2T3YmENYaXI6m/s/MOkwUWWTDf6OxRZbLDpNce53yv/Be3ZTQPg+OOGbYKJkZ8BEyoFOEi9Wl1QBoW85k4MAZyHRMCckGKYDRTHRDvqPviFqj7MhFHYw9Ashvo1umaQuIdyIf3YCn/osBIgA41wP4bT4Q2gXHAiieOSRR+IuA/GrXNSwM+OulMHN7JIAAAjkSURBVCx320A/mXrJFDHn5U2mmH0HYkvIdScXMQO9j/9en4AC0uLoSBUQvpZDZjgmWf3jXK80VzQrINRlsiB8E1t1dq8E38Pqk8yvTAQc6OJHyUSKiYMfO07lSqctp7eJwEF0On0KuNsC0kx3pwoI5ys4vU9EW1Y4NIqJEBHJW0iBwvkV2pGNDcySRHYN1De0AUc46VwqAysQL1KbkP2geixwHTJmq2wsIFh8HwddMfsNdLNl9l61kikypvjO8cYbL+/rx88hHKRxISy702OxqYb54f9b1HxfOWsJpWkCrQgIP1Qy9mI+wTZfueprVkBoOKtdbrbjLAPnHrIzJdnqFeFATLIstKw8K1Of8N9ZlbJyJWonT+bVpoFVVRiMAsKFUWSRzbLq8sqIN30y7bTT5kZGf9KXmNwyMxY7BtLWMGZqnSOpfHg2ttiNICKVP3WEhPHQaCyw8scZjymOMOK8gRS1cmGxi6XteZ+RvUd2Zwoihghb+ouAAtJif7QiIHw1EzgrVUwVrAAr7c55DxJWvgKTDj9gUmfgQK88b9LoVflh42jlh4oDllxEzf7YU1AONgGh/wi1xV9QmVaGFTwH85o1xWBWIuEiF35lCwFW8uwy+btRH7FAwfzFzgdnfuWZjoH6CnFCqFhIsFNpZiy0I5litYDg1G929zLQO/rvrRNQQFpkiDOWFVp20pjH8cPDLJV3y83hP85bcPgrS0XCDgQzCI52fsDNlMw5zuVFRHvhOMakgVhVmiey8yc4d7Fv025s7Hnb3Uyb6n02u4eEyJ+skFKE8GP8L3kKQoljuTJqiLMrnI2p5dvI80w+w7kR0ppkF0rBiwmVPqm3GiY0u/LaWp6D6Ydotjyp0KvbhimS52HGygoHT9mB0F+NorH4PGMB4WD3g3/jsccei4ETjIPqscCOhPfCP8LOg7BhJu1mxIPv5BAk71oZQJCXefXn2IFwPmmXXXZxB5IKsYP1FJAW4TI5sxqsDMddcsklo607b7QNTSDihtO/RFNRmBgWX3zxeAqc3UBKQTCYVMn0y9Ws+EgI02WXgkBhomCC5XuYrJmYOukwr/UOmNE4wEf7soJgYvvPGz5MEAIClIUg8xwOBOIn4B1TCyYgfAjZ6X4mUpzQ9Ek9fwCTJ5lzK/0O+J8YD5ivmp2M6SuErPJMBu+DEx1hyeOQ5/OMBXZ7CBG8WPAgJNlYIOqO9nH/CIsJFhWpY4HfAueHGNOtFjiTxgUx6+bCptV2l6W+AtJiT7PCY7LIYv2zFWezpgrq4QPJ/BZMNDyjHT8aVpqYspgwmAyZTBAohIkVJ9/R7MTWIrZh1eFH2yrNPbSHlWfeQl24VQYC8H48I88p/Hrfw/PYAVQ+l2civvV40ZZK8eDZfJ6+TJ2QGVvZLihrK8+kLc32G7wZAxyqhFk2FngWIpLXUd6ob+BFeysz/Obty+rPwYy25RXK1O+xXhoBBSSNm7UkIAEJlJ6AAlL6ISAACUhAAmkEFJA0btaSgAQkUHoCCkjph4AAJCABCaQRUEDSuFlLAhKQQOkJKCClHwICkIAEJJBGQAFJ42YtCUhAAqUnoICUfggIQAISkEAaAQUkjZu1JCABCZSegAJS+iEgAAlIQAJpBBSQNG7WkoAEJFB6AgpI6YeAACQgAQmkEVBA0rhZSwISkEDpCSggpR8CApCABCSQRkABSeNmLQlIQAKlJ6CAlH4ICEACEpBAGgEFJI2btSQgAQmUnoACUvohIAAJSEACaQQUkDRu1pKABCRQegIKSOmHgAAkIAEJpBFQQNK4WUsCEpBA6QkoIKUfAgKQgAQkkEZAAUnjZi0JSEACpSeggJR+CAhAAhKQQBoBBSSNm7UkIAEJlJ6AAlL6ISAACUhAAmkEFJA0btaSgAQkUHoCCkjph4AAJCABCaQRUEDSuFlLAhKQQOkJKCClHwICkIAEJJBGQAFJ42YtCUhAAqUnoICUfggIQAISkEAaAQUkjZu1JCABCZSegAJS+iEgAAlIQAJpBBSQNG7WkoAEJFB6AgpI6YeAACQgAQmkEVBA0rhZSwISkEDpCSggpR8CApCABCSQRkABSeNmLQlIQAKlJ6CAlH4ICEACEpBAGgEFJI2btSQgAQmUnoACUvohIAAJSEACaQQUkDRu1pKABCRQegIKSOmHgAAkIAEJpBFQQNK4WUsCEpBA6QkoIKUfAgKQgAQkkEZAAUnjZi0JSEACpSeggJR+CAhAAhKQQBoBBSSNm7UkIAEJlJ6AAlL6ISAACUhAAmkEFJA0btaSgAQkUHoCCkjph4AAJCABCaQRUEDSuFlLAhKQQOkJKCClHwICkIAEJJBGQAFJ42YtCUhAAqUnoICUfggIQAISkEAaAQUkjZu1JCABCZSegAJS+iEgAAlIQAJpBBSQNG7WkoAEJFB6AgpI6YeAACQgAQmkEVBA0rhZSwISkEDpCSggpR8CApCABCSQRkABSeNmLQlIQAKlJ6CAlH4ICEACEpBAGgEFJI2btSQgAQmUnoACUvohIAAJSEACaQQUkDRu1pKABCRQegIKSOmHgAAkIAEJpBFQQNK4WUsCEpBA6QkoIKUfAgKQgAQkkEZAAUnjZi0JSEACpSeggJR+CAhAAhKQQBoBBSSNm7UkIAEJlJ6AAlL6ISAACUhAAmkEFJA0btaSgAQkUHoCCkjph4AAJCABCaQRUEDSuFlLAhKQQOkJKCClHwICkIAEJJBGQAFJ42YtCUhAAqUnoICUfggIQAISkEAaAQUkjZu1JCABCZSegAJS+iEgAAlIQAJpBBSQNG7WkoAEJFB6AgpI6YeAACQgAQmkEVBA0rhZSwISkEDpCSggpR8CApCABCSQRkABSeNmLQlIQAKlJ6CAlH4ICEACEpBAGgEFJI2btSQgAQmUnoACUvohIAAJSEACaQQUkDRu1pKABCRQegIKSOmHgAAkIAEJpBFQQNK4WUsCEpBA6QkoIKUfAgKQgAQkkEZAAUnjZi0JSEACpSeggJR+CAhAAhKQQBoBBSSNm7UkIAEJlJ7A/wNiYUz0d1s0gAAAAABJRU5ErkJggg==');
    const chosePic = ref();
    const sendPicPath = reactive({newItemNo: '', itemNo: ''});
    const mainPic = computed(() => (picPath) => {//顯示照片的地方
      return picPath === '' ? defaultPicUrl.value : picPath;
    });
    const thisPhoto = computed(() => {//編輯照片的model預設值
      // return [sendPicPath.value] === '' ? null : [sendPicPath.value];
      return null;
    });
    const generateImage = function () {//編輯照片的modal
      let url = chosePic.value.generateDataUrl();
      if (!url) {
        alert('no image');
        return;
      }
      changeObj(url);
      this.$refs['mainPic-modal'].hide();
      console.log(productObj.value);
    }
    const noImageButton = function () {//刪除照片的按鈕
      [sendPicPath.value] = '';
      this.$refs['mainPic-modal'].hide();
    }
    const editImageButton = function (type, no) {//click pic open modal--編輯照片的按鈕
      this.$refs['mainPic-modal'].show();
      sendPicPath.type = type;
      sendPicPath.no = no;
    }
    const changeObj = function (urlStr) {
      if (sendPicPath.type === 'A') {
        //大照片
        productObj.value.productPic = urlStr;
        console.log(productObj.value.productPic);
      } else if (sendPicPath.type === 'B') {
        //規格小照片
        productObj.value.list.forEach(f => {
          if (f.itemNo === sendPicPath.no || f.newItemNo === sendPicPath.no) {
            f.itemPic = urlStr;
          }
        });
      }
    }

    return {
      generateImage, noImageButton, mainPic, editImageButton, chosePic, thisPhoto,
      add, count, ObjectItem,
      fileList,
      stickyHeader,
      checked,
      addRow,
      brandTableObj,
      newItem,
      submit,
      productObj, mainTableObj, rowClass, rowIconClick, isPromo,
      sizeArray, sizeButton,
      colorButtonGroupObj, colorButton, buttonVariant,
      colorArray, onOptionClick,
      options, search, selectedValue, availableOptions,
      addNewTag, getSelectedResult, computedList, modelMoney, modifyCount
    }
  },
}
</script>