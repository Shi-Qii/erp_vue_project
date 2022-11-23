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
                    <!--                      <b-form-checkbox class="pt-2" v-model="productObj.productIsActive" name="check-button" switch>-->
                    <!--                        <b> (狀態: {{ productObj.productIsActive ? '上架' : '下架' }})</b>-->
                    <!--                      </b-form-checkbox>-->
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

                      <div class="form-group">
                        <b-form-file accept="image/jpeg, image/png, image/gif" @change="uploadFile">
                          <b-button @click="uploadFile">
                            <b-icon icon="search"></b-icon>
                          </b-button>
                        </b-form-file>
                        <div class="border p-2 mt-3">

                          <template v-if="preview">
                            <img :src="preview" class="img-fluid"/>
                            <p class="mb-0">file name: {{ image.name }}</p>
                            <p class="mb-0">size: {{ image.size / 1024 }}KB</p>
                          </template>
                        </div>
                      </div>

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
                      <b-button variant="outline-secondary" @click="addRow()">單筆新增</b-button>
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
                          :items="productObj.list"
                          :fields="mainTableObj.fields"
                          :tbody-tr-class="rowClass"
                          sort-icon-rigth
                          sticky-header="1000px"
                          responsive
                      >
                        <template #cell(itemIsActive)="data">
                          <toggle-button :value="data.item.itemIsActive" color="#12A3B8" :sync="true" :labels="true"
                                         v-model="data.item.itemIsActive"
                                         :disabled="productObj.productIsActive===true?false:true "/>
                        </template>
                        <template #cell(itemIsDelete)="data">
                          <b-form-checkbox v-model="data.item.itemIsDelete"
                                           v-if="data.item.itemInStock===false">
                          </b-form-checkbox>
                          <b-form-checkbox v-else
                                           disabled="disabled">
                          </b-form-checkbox>
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
              1. 表頭固定(2張table) <br>
              2.button-將成本售價試算數字存於前端，並且帶入試算 <br>
              3.照片 <br>
              4.條碼列印 <br>
              5.新增規格 <br>
              6.顏色的dropdown不要自動收起 <br>
            </p>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal ref="newItem-modal" size="xl" hide-footer scrollable title="新增規格">
      <div class="row justify-content-md-center">
        <div class="col-2">
          <h5>尺寸</h5>
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
            <b-button-group vertical>
              <b-button v-for="(btn, idx) in colorButtonGroupObj" :key="idx" class="item "
                        :variant="buttonVariant(btn, idx)" @click="colorButton(btn,idx)">
                {{ btn.name }} ( {{selectedTagValue.index===idx?selectedTagValue.color.length:selectedvalue[idx].color.length}} )
              </b-button>
            </b-button-group>
            <div class="col-8 item"
                 :style="{'padding':'5px','width':'100%'}"
            >
              <div class="ml-3">
                {{ selectedColorButton.name }}
                <template>
                  <div class="mt-2">
                    <b-form-group label-for="tags-withﬁ-dropdown">
                      <b-form-tags id="tags-with-dropdown"  v-model="selectedTagValue.color"
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

                          <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100"
                                      :disabled="selectedColorButton===''">
                            <template #button-content>
                              <b-icon icon="tag-fill"></b-icon>
                              Choose tags
                            </template>
                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                  label="Search/add tags"
                                  label-for="tag-search-input"
                                  label-cols-md="auto"
                                  class="mb-0"
                                  label-size="sm"
                                  :description="searchDesc"
                                  :disabled="disabled"
                              >
                                <b-form-input
                                    v-model="search"
                                    id="tag-search-input"
                                    type="search"
                                    size="sm"
                                    autocomplete="off"
                                ></b-form-input>
                              </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button
                                v-for="option in availableOptions"
                                :key="option"
                                @click="onOptionClick({ option, addTag },true)"
                            >
                              {{ option }}
                              <b-icon icon="trash" @click="onOptionClick({ option, addTag },false)"
                                      class="float-right"></b-icon>
                            </b-dropdown-item-button>
                            <b-dropdown-text v-if="availableOptions.length === 0">
                              no tag
                              <b-button class="float-right" size="sm" variant="outline-info" @click="addNewTag()" v-if="search.trim().length>0">add</b-button>
                            </b-dropdown-text>
                          </b-dropdown>
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
            {{ sizeArray }} <br>
            {{ selectedvalue }} <br>
            {{selectedTagValue}}
            <b-button class="mt-5" variant="outline-info" block @click="addItem()">確定新增</b-button>
          </div>
        </div>
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
          :items="productObj.list"
          :fields="brandTableObj.fields"
          sort-icon-left
          responsive="sm"
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

export default {
  name: "upsertProductPage",
  components: {
    'barcode': VueBarcode,
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
          itemColorNO: '123',
          itemSize: 'F',
          itemSizeNo: '123',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '123456789',
          itemBrandNo: '123456789',
          itemInStock: false
        }, {
          itemIsActive: true,
          itemColor: '藍色',
          itemColorNO: '123',
          itemSize: 'F',
          itemSizeNo: '123',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '123456789',
          itemBrandNo: '123456789',
          itemInStock: true
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
      let ColorArr = reactive(
          [{name: 'blackAndGray', color: ['黑色', '灰色']},
            {name: 'lightColor', color: ['白色', '杏色', '奶茶']},
            {name: 'yellowAndBrown', color: ['黃色','橘紅', '卡其']},
            {name: 'redAndPink', color: ['紅色', '粉紅']},
            {name: 'purpleAndBlue', color: ['紫色', '藍色']},
            {name: 'green', color: ['綠色']},
            {name: 'otherColor', color: []}]
      )
      colorArray.value = ColorArr;
    });

    let productObj = ref([]);
    let isPromo = ref([]);
    let stickyHeader = ref(true);
    const checked = ref(productObj.value.checked);
    let sizeArray = ref([]);
    let colorArray = reactive([]);
    const mainTableObj = reactive({
      'fields': [
        {label: '照片', key: 'pic', sortable: true},
        {label: '顏色', key: 'itemColor', sortable: true},
        {label: '尺寸', key: 'itemSize', sortable: true,},
        {label: '廠商編號', key: 'itemManufacturerNo', sortable: true},
        {label: '成本', key: 'itemCost', sortable: true},
        {label: '售價', key: 'itemPrice', sortable: true},
        {label: '內部編號', key: 'itemNo', sortable: true},
        {label: '條碼編號', key: 'itemBrandNo', sortable: true},
        {label: '狀態', key: 'itemIsActive', sortable: true},
        {label: '刪除', key: 'itemIsDelete', sortable: true}
      ],
    })

    const addRow = () => {
      productObj.value.list.push({
            itemIsActive: true,
            itemColor: '白色',
            itemSize: 'F',
            itemManufacturerNo: '1253',
            itemCost: '200',
            itemPrice: 500,
            itemNo: '',
            itemBrandNo: '',
            itemInStock: false,
            itemIsDelete: false,
          }
      )
    }

    const brandTableObj = reactive({
      'fields': [
        {label: '顏色', key: 'itemColor', sortable: true},
        {label: '尺寸', key: 'itemSize', sortable: true},
        {label: '成本', key: 'itemCost', sortable: true},
        {label: '售價', key: 'itemPrice', sortable: true},
        {label: '內部編號', key: 'itemNo', sortable: true},
        {label: '條碼編號', key: 'itemBrandNo', sortable: false},
        {label: '列印張數 (max:50)', key: 'printNum', sortable: false}
      ],
      'sortBy': 'age',
      'sortDesc': false

    })

    const rowClass = function (item, type) {
      if (!item || type !== 'row') return
      if (item.itemIsDelete === true) return 'table-secondary'
    }

    //新增品項modal--start
    const sizeButton = function (btn) {
      btn.state = btn.state === true ? false : true;
      if (btn.state) {
        btn.variant = "secondary";
      } else {
        btn.variant = 'outline-secondary';
      }
    }

    let selectedColorButton = ref('');  //顏色-分類群組的按鈕-目前點選
    const colorButton = function (btn,idx) { //顏色-分類群組的按鈕 ＠onclick
      //把目前點選的按鈕狀態存在selectedColorButton
      selectedColorButton.value = btn;
      //1. "已選取的tag"v-model綁定selectedTagValue，需把所選顏色資料存回selectedvalue
      if (selectedTagValue.index>-1){selectedvalue[selectedTagValue.index].color=selectedTagValue.color}
      //2. 存取現在按下的button的index（同顏色資料的順序）
      selectedTagValue.index=idx;
      //3. 把已經點選過的顏色撈出來到畫面上
      selectedTagValue.color=selectedvalue[selectedTagValue.index].color;
    }

    const buttonVariant= function (btn,idx) { //顏色的分類按鈕-選取變色
      if (idx===selectedTagValue.index) {
        return 'secondary';
      }else {
        return 'outline-secondary';
      }
    }

    const colorButtonGroupObj = [{
      name: '黑灰色系',value: 'blackAndGray', selected: false
    }, {
      name: '白杏淺系',value: 'lightColor', selected: false
    }, {
      name: '橘黃咖系',value: 'yellowAndBrown', selected: false
    }, {
      name: '紅粉色系',value: 'redAndPink', selected: false
    }, {
      name: '紫藍色系',value: 'purpleAndBlue', selected: false
    }, {
      name: '綠色色系',value: 'green', selected: false
    }, {
      name: '其他分類',value: 'otherColor', selected: false
    }]

    const options = ref();
    const search = ref('');
    const selectedTagValue=reactive({index:-1,color:[]})
    let selectedvalue = reactive(
        [{name: 'blackAndGray', color: []},
          {name: 'lightColor', color: []},
          {name: 'yellowAndBrown', color: []},
          {name: 'redAndPink', color: []},
          {name: 'purpleAndBlue', color: []},
          {name: 'green', color: []},
          {name: 'otherColor', color: []}]
    )

    const availableOptions = computed(() => {
      options.value = getColorArr();
      const criteria = search.value.trim().toLowerCase();
      const opts = options.value.filter(opt => selectedTagValue.color.indexOf(opt) === -1)
      if (search.value.trim() !== '') {
        return opts.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      return opts
    })

    const getColorArr = function () {
      let result = colorArray.value.filter(f => {
        return f.name===(selectedColorButton.value).value;
      })[0]
      return result.color;
    }

    const searchDesc = computed(() => {
      if (search.value.trim().toLowerCase() && selectedvalue.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    })

    let delState = true;
    const onOptionClick = function ({option, addTag}, isSelect) {
      if (isSelect) {
        if (delState) {
          addTag(option)
        }
        delState = true;
      } else {
        delState = false;
        alert("index"+selectedTagValue.index+" "+"tag:"+option+" ---delete")
      }
      this.search = ''
    }

    const addNewTag = function (){
      colorArray.value[selectedTagValue.index].color.push(search.value);
      selectedTagValue.color.push(search.value);
      search.value=''
    }

    //新增品項modal--end


    const barcodeValue = ref('CODE39 Barcode');

    const newItem = function () {
      this.$refs['newItem-modal'].show();
      selectedColorButton.value = '';
      selectedTagValue.index=-1
    }

    const submit = function () {
      //打api儲存更新資料，並把確認的資料往再往前端送
      let flag = true;
      if (flag) {
        this.$refs['submit-modal'].show()
      } else {
        alert("error - 上傳失敗！")
      }
    }
    const preview = ref(null)
    const image = ref(null)

    const uploadFile = function (event) {
      var input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          preview.value = e.target.result;
        }
        image.value = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    }

    return {
      image,
      preview,
      uploadFile,
      stickyHeader,
      checked,
      addRow,
      barcodeValue,
      brandTableObj,
      newItem,
      submit,
      productObj, mainTableObj, rowClass, isPromo,
      sizeArray, sizeButton,
      colorButtonGroupObj, colorButton, selectedColorButton,buttonVariant,
      colorArray, onOptionClick,
      options, search, selectedvalue, availableOptions, searchDesc,selectedTagValue,
      addNewTag
    }
  },


}
</script>

<style scoped>

</style>