<template>
  <div>
    <div class="col-12 mt-3 ml-3 mb-3 pt-3 pl-3 pb-3 ">
      <div class="card card-user">
        <div class="card-header">
          <h5 class="card-title">新增品項頁面</h5>
        </div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <b-col>
                    <label>商品編號</label>
                  </b-col>
                  <b-col>
                    <b-input v-model="productObj.productId" disabled="disabled"></b-input>
                  </b-col>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <b-col>
                    <label>商品狀態</label>
                    <b-form-checkbox class="pt-2" v-model="productObj.productIsActive" name="check-button" switch>
                      <b> (狀態: {{ productObj.productIsActive ? '上架' : '下架' }})</b>
                    </b-form-checkbox>

                  </b-col>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <b-col>
                    <label>商品名稱</label>
                  </b-col>
                  <b-col>
                    <b-input type="text" class="form-control" v-model="productObj.productName"
                             placeholder="商品名稱"></b-input>
                  </b-col>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 ">
                <div class="form-group">
                  <b-col>
                    <label>廠商編號</label>
                  </b-col>
                  <b-col>
                    <b-input v-model="productObj.productManufacturerNo" placeholder="廠商編號"></b-input>
                  </b-col>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <b-col>
                    <label>廠商名稱</label>
                  </b-col>
                  <b-col>
                    <b-input type="text" class="form-control" v-model="productObj.productManufacturerName"
                             placeholder="廠商名稱"></b-input>
                  </b-col>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-7 pr-1">
                <div class="form-group">
                  <b-col>
                    <label>Tag</label>
                  </b-col>
                  <b-col>
                    <b-form-tags v-model="tagsValue">
                      <template v-slot="{ tags, inputAttrs, inputHandlers,  addTag, removeTag }">
                        <b-input-group class="mb-2">
                          <b-form-input
                              v-bind="inputAttrs"
                              v-on="inputHandlers"
                              placeholder="New tag - Press enter to add"
                              class=" col-12"
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button @click="addTag()" variant="outline-secondary">Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                        <div class=" " style="font-size: 1.5rem;">
                          <b-form-tag
                              v-for="(tag,index) in tags" :key="index+'_'"
                              @remove="removeTag(tag)"
                              :title="tag"
                              variant="secondary"
                              class="mr-1"
                          >{{ tag }}
                          </b-form-tag>
                        </div>
                      </template>
                    </b-form-tags>
                  </b-col>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12 pr-1">
                <div class="form-group">
                  <label></label>
                  <div>
                    <b-button variant="outline-secondary" @click="addRow()">單筆新增</b-button>
                    <b-button variant="outline-secondary" class="ml-2" @click="newItem()">新增規格</b-button>

                    <b-modal ref="newItem-modal" hide-footer title="新增規格">
                      <div id="editSize" class="mt-2">
                        <h5>尺寸</h5>
                      </div>
                      <div id="editColor" class="mt-2">
                        <h5>顏色</h5>
                        <div>
                          <b-button v-b-toggle.collapse-3 class="m-1">黑白灰系</b-button>
                          <b-collapse visible id="collapse-3">
                            <b-card>I should start open!</b-card>
                          </b-collapse>
                        </div>
                        <div>
                          <b-button v-b-toggle.collapse-3 class="m-1">米杏淺系</b-button>
                          <b-collapse visible id="collapse-3">
                            <b-card>I should start open!</b-card>
                          </b-collapse>
                        </div>
                        <div>
                          <b-button v-b-toggle.collapse-3 class="m-1">橘黃咖系</b-button>
                          <b-collapse visible id="collapse-3">
                            <b-card>I should start open!</b-card>
                          </b-collapse>
                        </div>
                        <div>
                          <b-button v-b-toggle.collapse-3 class="m-1">紅粉色系</b-button>
                          <b-collapse visible id="collapse-3">
                            <b-card>I should start open!</b-card>
                          </b-collapse>
                        </div>
                        <div>
                          <b-button v-b-toggle.collapse-3 class="m-1">藍紫綠系</b-button>
                          <b-collapse visible id="collapse-3">
                            <b-card>I should start open!</b-card>
                          </b-collapse>
                        </div>
                        <div>
                          <b-button v-b-toggle.collapse-3 class="m-1">其他分類</b-button>
                          <b-collapse visible id="collapse-3">
                            <b-card>I should start open!</b-card>
                          </b-collapse>
                        </div>
                      </div>
                      <div id="editResult" class="mt-2">
                        <h5>結果</h5>
                      </div>
                      <b-button class="mt-2" variant="outline-warning" block @click="addItem()">確定新增</b-button>
                    </b-modal>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 pr-1">
                <div class="form-group">
                  <div>
                    <b-table
                        :items="productObj.list"
                        :fields="mainTableObj.fields"
                        sort-icon-left
                        responsive="sm"
                    >
                      <template #cell(itemIsActive)="data">
                        <b-form-checkbox v-model="data.item.itemIsActive" v-if="productObj.productIsActive===true"
                                         switch>
                          <b> ({{ data.item.itemIsActive ? '上架' : '下架' }})</b>
                        </b-form-checkbox>
                        <b-form-checkbox v-else switch disabled="disabled">
                          <b> (N/A)</b>
                        </b-form-checkbox>
                      </template>
                      <!--                      <template #cell(itemIsDelete)="data">-->
                      <!--                        <b-form-checkbox v-model="data.item.itemIsDelete"-->
                      <!--                                         v-if="data.item.itemInStock===false">-->
                      <!--                        </b-form-checkbox>-->
                      <!--                        <b-form-checkbox v-else-->
                      <!--                                         disabled="disabled">-->
                      <!--                        </b-form-checkbox>-->
                      <!--                      </template>-->
                      <template #cell(itemIsDelete)="data">
                        <b-button :pressed.sync="data.item.itemIsDelete" variant="primary"
                                  v-model="data.item.itemIsDelete"
                                  v-if="data.item.itemInStock===false"
                                  @click="deleteItemButton"
                        >刪除
                        </b-button>
                        <b-button :pressed.sync="data.item.itemIsDelete" variant="primary"
                                  v-else
                                  disabled="disabled"
                        >刪除
                        </b-button>
                        {{ data.item.itemIsDelete }}
                      </template>
                      <template #cell(itemManufacturerNo)="data">
                        <input v-model="data.item.itemManufacturerNo">
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>


            <div style="text-align:center" class="mt-3">
              <div>
                <div>
                  <b-button v-b-modal.print-modal>列印條碼</b-button>
                  <b-button @click="submit()" variant="outline-info" class="ml-2">新增商品</b-button>
                  <b-modal size="lg" id="print-modal" hide-footer title="請填寫標籤數量">
                    <h5>{{ productObj.productId }} - {{ productObj.productName }}</h5>
                    <h5></h5>
                    <b-table
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
                    <b-button class="mt-2" variant="outline-warning" block>列印</b-button>
                  </b-modal>
                </div>
              </div>
            </div>


          </form>
          <input v-model="barcodeValue"/><br>
          <barcode v-bind:value="barcodeValue" format="CODE39" width="1.5" height="35">
          </barcode>
          {{ selected }}
          productObj={{ productObj.list }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {reactive, ref, onBeforeMount} from "@vue/composition-api/dist/vue-composition-api";
import VueBarcode from 'vue-barcode';

export default {
  name: "upsertProductPage",
  components: {
    'barcode': VueBarcode
  },
  setup() {
    onBeforeMount(() => {
      let dataObj = {
        upsertType: "U",
        productName: "上衣",
        productId: "0123456789",
        productManufacturerNo: "0123456789",
        productManufacturerName: "衣蕾",
        productIsActive: true,
        list: [{
          itemIsActive: true,
          itemColor: '黑色',
          itemSize: 'F',
          itemManufacturerNo: '1253',
          itemCost: '200',
          itemPrice: 500,
          itemNo: '123456789',
          itemBrandNo: '123456789',
          itemInStock: false
        }, {
          itemIsActive: true,
          itemColor: '藍色',
          itemSize: 'F',
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
      // sizeList
      // colorList
      //tagsValue
    })

    const tagsValue = ref(['男生上衣', '個性', '襯衫']);
    let productObj = ref([]);
    const checked = ref(productObj.value.checked);

    const mainTableObj = reactive({
      'fields': [
        {label: '顏色', key: 'itemColor', sortable: true},
        {label: '尺寸', key: 'itemSize', sortable: true},
        {label: '廠商編號', key: 'itemManufacturerNo', sortable: true},
        {label: '成本', key: 'itemCost', sortable: true},
        {label: '售價', key: 'itemPrice', sortable: true},
        {label: '內部編號', key: 'itemNo', sortable: false},
        {label: '條碼編號', key: 'itemBrandNo', sortable: false},
        {label: '狀態', key: 'itemIsActive', sortable: false},
        {label: '刪除', key: 'itemIsDelete', sortable: false}
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
        {label: '售價', key: 'itemPrice', sortable: true},
        {label: '內部編號', key: 'itemNo', sortable: false},
        {label: '條碼編號', key: 'itemBrandNo', sortable: false},
        {label: '列印張數 (max:50)', key: 'printNum', sortable: false}
      ],
      'sortBy': 'age',
      'sortDesc': false

    })

    const deleteItemButton=function (){
      alert("aaaa");
    }

    const barcodeValue = ref('CODE39 Barcode');

    const newItem = function () {
      this.$refs['newItem-modal'].show()
    }


    const submit = () => {
    }
    const selected = ref([])

    const onRowSelected = (items) => {
      console.log('item:', items)
      selected.value = items

    }

    return {
      tagsValue,
      checked,
      addRow,
      barcodeValue,
      brandTableObj,
      newItem,
      submit,
      onRowSelected,
      selected,
      productObj, mainTableObj,deleteItemButton
    }
  },


}
</script>

<style scoped>

</style>