<template>
  <div>
    <div style="background-color: white" class=" col-12 m-3 p-3 ">
      <div v-if="false" class="card card-user">
        <div class="card-header">
          <h5 class="card-title">新增品項頁面</h5>
        </div>
        <div class="card-body">
          <div v-if="false" class="mt-3">
            <input v-model="barcodeValue"/><br>
            <barcode v-bind:value="barcodeValue" format="CODE39" width="1.5" height="35">
            </barcode>
          </div>
        </div>
      </div>
      <b-tabs content-class="mt-3">
        <b-tab title="新增品項頁面1" active>
          <p>新增品項頁面</p>
          <div class="row">
            <b-col class="col-md-7">
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
              <!--                <div class="row">-->
              <!--                  <div class="col-12">-->
              <!--                    <div class="form-group">-->
              <!--                      <label>Tag</label>-->
              <!--                      <b-form-tags v-model="tagsValue">-->
              <!--                        <template v-slot="{ tags, inputAttrs, inputHandlers,  addTag, removeTag }">-->
              <!--                          <b-input-group class="mb-2">-->
              <!--                            <b-form-input-->
              <!--                                v-bind="inputAttrs"-->
              <!--                                v-on="inputHandlers"-->
              <!--                                placeholder="New tag - Press enter to add"-->
              <!--                                class=" col-12"-->
              <!--                            ></b-form-input>-->
              <!--                            <b-input-group-append>-->
              <!--                              <b-button @click="addTag()" variant="outline-secondary">Add</b-button>-->
              <!--                            </b-input-group-append>-->
              <!--                          </b-input-group>-->
              <!--                          <div class=" " style="font-size: 1.5rem;">-->
              <!--                            <b-form-tag-->
              <!--                                v-for="(tag,index) in tags" :key="index+'_'"-->
              <!--                                @remove="removeTag(tag)"-->
              <!--                                :title="tag"-->
              <!--                                variant="secondary"-->
              <!--                                class="mr-1"-->
              <!--                            >{{ tag }}-->
              <!--                            </b-form-tag>-->
              <!--                          </div>-->
              <!--                        </template>-->
              <!--                      </b-form-tags>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <div class="row" v-if="isPromo">
                <div class="col-12">
                  <div class="form-group"><label>促銷說明</label>
                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <div :style="{'width':'100%' }">
                        <b-row>
                          <b-col cols="1">
                            <b-icon icon="info-circle-fill" scale="2" variant="info"></b-icon>
                          </b-col>
                          <b-col cols="3">促銷中</b-col>
                          <b-col cols="3">商品{{ productObj.promoInfo.promoDiscount }}折</b-col>
                          <b-col cols="5">{{ productObj.promoInfo.promoName }}</b-col>
                        </b-row>
                      </div>
                    </b-list-group-item>
                  </div>
                </div>
              </div>
              <!--                info end-->
            </b-col>
            <b-col class="col-md-5">
              <!--                pic start-->
              <div>
                <div class="form-group">
                  <b-col>
                    <label>商品照片</label>
                    <text style="color:lightskyblue"></text>
                    <div class="col-md-5 offset-md-1">

                      <uploader
                          v-model="fileList"
                      ></uploader>
                    </div>
                  </b-col>
                </div>
              </div>
              <!--                pic end-->
            </b-col>
          </div>
        </b-tab>
        <b-tab title="新增品項頁面2">
          <p>新增品項頁面</p>
          <div class="row">
            <!--             add button start-->
            <b-col>
              <div class="row mt-3">
                <div class="col-12 pr-1">
                  <div class="form-group">
                    <label>項目列表</label>
                    <div>
                      <b-button variant="outline-secondary" class="ml-2" @click="newItem()">新增規格</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
            <!--             add button end-->
          </div>
          <div class="row">
            <b-col>
              <div class="row">
                <div class="col-12 pr-1">
                  <div class="form-group">
                    <div>
                      <b-table
                          class="text-center text-nowrap"
                          :items="computedList"
                          :fields="mainTableObj.fields"
                          sort-icon-rigth
                          sticky-header="1000px"
                          responsive
                          fixed
                          id="mainTable"
                      >
                        <template #cell(itemIsActive)="data">
                          <toggle-button :value="data.item.itemIsActive" color="#12A3B8" :sync="true" :labels="true"
                                         v-model="data.item.itemIsActive"
                                         :disabled="productObj.productIsActive===true?false:true "/>
                        </template>
                        <template #cell(itemIsDelete)="data">
                          <b-icon icon="trash-fill" v-if="data.item.itemInStock===false"
                                  @click="rowIconClick(data)"></b-icon>
                        </template>
                        <template #cell(itemManufacturerNo)="data">
                          <input class="col-10" v-model="data.item.itemManufacturerNo">
                        </template>
                        <template #cell(itemCost)="data">
                          <input class="col-10" v-model="data.item.itemCost"
                                 :disabled="data.item.itemNo===''?false:true ">
                        </template>
                        <template #cell(itemPrice)="data">
                          <input class="col-10" v-model="data.item.itemPrice"
                                 :disabled="data.item.itemNo===''?false:true ">
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
                    <b-button @click="submit()" variant="info" class="ml-3"> 儲存資訊</b-button>
                  </div>
                </div>
              </div>
            </b-col>
          </div>
          <div class="mt-3">
            <p class="text-justify">
              1.button-將成本售價試算數字存於前端，並且帶入試算 <br>
              2.照片 <br>
              3.條碼列印 <br>
              4.送出時驗證次否有重複資料<br>
            </p>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal ref="newItem-modal" size="xl" hide-footer scrollable title="新增規格">
      <div class="row justify-content-md-center">
        <div class="col-2">
          <h5 class="ml-4">尺寸</h5>
          <div class="mr-5 ml-2 mt-3">
            <b-button v-for="(btn, idx) in sizeArray" :key="idx" class="item mt-2 ml-2" :variant="btn.variant"
                      @click="sizeButton(btn)" block>
              {{ btn.size }}
            </b-button>
          </div>
        </div>
        <div class="col-5">
          <h5>顏色</h5>
          <div class="row mt-3">
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
                                label="Search/add tags"
                                label-for="tag-search-input"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="sm"
                                :disabled="disabled"
                            >
                              <b-form-input
                                  v-model="search"
                                  id="tag-search-input"
                                  type="search"
                                  size="sm"
                                  autocomplete="off"
                                  class="mb-3"
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
                              <b-button class="float-right" size="sm" variant="outline-info" @click="addNewTag()"
                                        v-if="search.trim().length>0">add
                              </b-button>
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
        <div class="col-4" :style="{'border-radius':'12px','background-color':'#F5F5F5'}">
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
        <template #cell(itemIsActive)="data">
          <b> {{ data.item.itemIsActive ? '上架' : '下架' }}</b>
        </template>
        <template #cell(printNum)="data">
          <b-input
              trim
              v-model="data.item.brandNum"
              :state="data.item.brandNum>=0 && data.item.brandNum<=50 && data.item.brandNum!=='' "
          ></b-input>
        </template>
      </b-table>
      <b-button class="mt-2" variant="outline-info" block>列印</b-button>
    </b-modal>
  </div>
</template>

<script>
import {reactive, ref, onBeforeMount, onMounted, computed} from "@vue/composition-api/dist/vue-composition-api";
import VueBarcode from 'vue-barcode';
import Uploader from "vux-uploader-component";

export default {
  name: "upsertProductPage",
  components: {
    'barcode': VueBarcode,
    Uploader
  },
  setup() {
    onMounted(() => {
      //統一命名$UseAxios
      // this.$UseAxios.Post('',{})

    })
    onBeforeMount(() => {

      let dataObj = {
        upsertType: "U",
        productName: "上衣",
        productId: "0123456789",
        productManufacturerNo: "0123456789",
        productManufacturerName: "衣蕾",
        productIsActive: true,
        promoInfo: {
          promoId: '123456',
          promoName: '換季大拍賣',
          promoDiscount: '95',
        },
        list: [{
          itemIsActive: true,
          itemColor: '黑色',
          itemColorCategory: 'blackWhiteAndGray',
          itemSize: 'F',
          itemSizeNo: '123',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '123456789-1',
          itemBrandNo: '123456789',
          itemInStock: false
        }, {
          itemIsActive: true,
          itemColor: '藍色',
          itemColorCategory: 'purpleAndBlue',
          itemSize: 'F',
          itemSizeNo: '123',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '123456789-2',
          itemBrandNo: '123456789',
          itemInStock: true,
        }]
      }
      dataObj.list.forEach(f => {
        f.itemIsDelete = false;
        f.brandNum = 0;
      })
      productObj.value = dataObj
      isPromo.value = dataObj.promoInfo.promoId === '' ? false : true;
      // sizeList
      let size = ['F', '2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
      let sizeArr = []
      size.forEach((f, idx) => {
        sizeArr.push({size: f, state: false, variant: 'outline-secondary', id: idx})
      })
      sizeArray.value = sizeArr;
      // colorList
      let ColorArr = reactive(     //所選清單-各分類目前所選取的顏色清單
          {
            'blackWhiteAndGray': {color: ['黑色', '白色', '灰色']},
            'lightColor': {color: ['杏色', '奶茶']},
            'yellowAndBrown': {color: ['黃色', '橘紅', '卡其']},
            'redAndPink': {color: ['紅色', '粉紅']},
            'purpleAndBlue': {color: ['紫色', '藍色']},
            'green': {color: ['綠色']},
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
        {label: '照片', key: 'pic', sortable: false},
        {label: '顏色', key: 'itemColor', sortable: true},
        {label: '尺寸', key: 'itemSize', sortable: true,},
        {label: '廠商編號', key: 'itemManufacturerNo', sortable: false},
        {label: '成本', key: 'itemCost', sortable: true},
        {label: '售價', key: 'itemPrice', sortable: true},
        {label: '內部編號', key: 'itemNo', sortable: true},
        {label: '條碼編號', key: 'itemBrandNo', sortable: true},
        {label: '狀態', key: 'itemIsActive', sortable: true},
        {label: '刪除', key: 'itemIsDelete', sortable: false}
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
        {label: '列印張數 (max:50)', key: 'printNum', sortable: false}
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
      let isExit = options.color.some((f) => f === search.value);
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
            itemIsActive: true,
            itemColor: color.color,
            itemColorCategory: 'color.ref',
            itemSize: size.size,
            itemSizeNo: size.id,
            itemManufacturerNo: productObj.value.productManufacturerNo,
            itemCost: '',
            itemPrice: '',
            itemNo: '',
            itemBrandNo: '',
            itemInStock: false,
            itemIsDelete: false,
            newItemNo: productObj.value.list.length + 1
          })
        })
      })
      this.$refs['newItem-modal'].hide()
    }
    //新增品項modal--end


    const barcodeValue = ref('CODE39 Barcode');
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


    return {
      fileList,
      stickyHeader,
      checked,
      addRow,
      barcodeValue,
      brandTableObj,
      newItem,
      submit,
      productObj, mainTableObj, rowClass, rowIconClick, isPromo,
      sizeArray, sizeButton,
      colorButtonGroupObj, colorButton, buttonVariant,
      colorArray, onOptionClick,
      options, search, selectedValue, availableOptions,
      addNewTag, getSelectedResult, computedList
    }
  }
  ,


}
</script>

<style scoped>

</style>