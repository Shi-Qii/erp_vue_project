<template>
  <div class="container">
    <div style="background-color: white" class=" col-12 mt-3 pt-3 mb-3 pb-3 justify-content-md-center">
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

                </div>
              </b-col>
            </div>
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
        </p>
        <div>

          <my-image-cropper v-model="myCroppa"></my-image-cropper>
          <button @click="generateImage">Generate</button>
          <br>
          <img class="output" :src="imgUrl">
        </div>

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
          itemNo: '2200001-01',
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
          itemNo: '2200001-02',
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
        {label: '照片', key: 'pic', sortable: false},
        {label: '顏色', key: 'itemColor', sortable: true},
        {label: '尺寸', key: 'itemSize', sortable: true,},
        {label: '廠商編號', key: 'itemManufacturerNo', sortable: true},
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
            itemIsActive: true,
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
            newItemNo: productObj.value.list.length + 1
          })
        })
      })
      this.$refs['newItem-modal'].hide()
    }
    //新增品項modal--end

    const modifyCount = function () {
      alert("修改利潤");
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

    const ObjectItem = ref(computedList)
    const myCroppa = ref()
    const imgUrl = ref('')
    const generateImage = function () {
      let url = myCroppa.value.generateDataUrl()
      if (!url) {
        alert('no image')
        return
      }
      imgUrl.value = url
    }
    return {
      myCroppa, imgUrl, generateImage,
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

<style scoped>
.croppa-container {
  background-color: white;
  border: 3px solid black
}
</style>