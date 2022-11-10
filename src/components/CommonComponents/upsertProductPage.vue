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
                    <div class="form-group">
                      <label>商品狀態</label>
                      <b-form-checkbox class="pt-2" v-model="productObj.productIsActive" name="check-button" switch>
                        <b> (狀態: {{ productObj.productIsActive ? '上架' : '下架' }})</b>
                      </b-form-checkbox>
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
                    <div class="form-group">
                      <label>Tag</label>
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
                    </div>
                  </div>
                </div>
                <div class="row" v-if="isPromo">
                  <div class="col-12">
                    <div class="form-group">

                      <b-list-group>
                        <b-list-group-item class=" justify-content-between align-items-center">
<!--                          <b-icon icon="info-circle-fill" scale="2" variant="info"></b-icon>-->
                         <div>
                           <b-list-group>
                             <b-list-group-item class="d-flex justify-content-between align-items-center">
                               <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
                               Cras justo odio
                             </b-list-group-item>
                             <b-list-group-item class="d-flex justify-content-between align-items-center">
                               <b-icon icon="exclamation-triangle-fill" scale="2" variant="warning"></b-icon>
                               Dapibus ac facilisis in
                             </b-list-group-item>
                             <b-list-group-item class="d-flex justify-content-between align-items-center">
                               <b-icon icon="info-circle-fill" scale="2" variant="info"></b-icon>
                               Morbi leo risus
                             </b-list-group-item>
                             <b-list-group-item class="d-flex justify-content-between align-items-center">
                               <b-icon icon="check-square" scale="2" variant="success"></b-icon>
                               Incididunt veniam velit
                             </b-list-group-item>
                           </b-list-group>

                         </div>
                          促銷中：{{ productObj.promoInfo.promoName }} <a
                            href="https://bootstrap-vue.org/docs/icons/#icons-1"
                            style="color:black">我的icon勒？？？？</a><br>
                          折扣數：{{ productObj.promoInfo.promoDiscount }}
                        </b-list-group-item>
                      </b-list-group>
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
                  <div class="col-12 pr-1">
                    <div class="form-group">
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
                          <b-button class="mt-2" variant="outline-info" block @click="addItem()">確定新增</b-button>
                        </b-modal>
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
                            :items="productObj.list"
                            :fields="mainTableObj.fields"
                            :tbody-tr-class="rowClass"
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
                          <template #cell(itemIsDelete)="data">
                            <b-form-checkbox v-model="data.item.itemIsDelete"
                                             v-if="data.item.itemInStock===false">
                            </b-form-checkbox>
                            <b-form-checkbox v-else
                                             disabled="disabled">
                            </b-form-checkbox>
                          </template>
                          <template #cell(itemManufacturerNo)="data">
                            <input v-model="data.item.itemManufacturerNo">
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
                      <b-button @click="submit()" variant="info" class="ml-3" >  儲存資訊  </b-button>
                      <b-modal id="submit-modal" ref="submit-modal" hide-footer title="資料儲存成功！">
                        <h5>{{ productObj.productId }} - {{ productObj.productName }}</h5>
                        <div class="float-right">
                          <b-button class="mt-2" v-b-modal.print-modal>列印條碼</b-button>
                          <b-button class="mt-2 ml-2" variant="outline-info" @click="$bvModal.hide('submit-modal')">返回頁面
                          </b-button>
                        </div>
                      </b-modal>
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
                        <b-button class="mt-2" variant="outline-info" block>列印</b-button>


                      </b-modal>
                    </div>
                  </div>
                </div>
              </b-col>
            </div>
          </form>

          <div class="mt-3">
            <input v-model="barcodeValue"/><br>
            <barcode v-bind:value="barcodeValue" format="CODE39" width="1.5" height="35">
            </barcode>
          </div>

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
    'barcode': VueBarcode,
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
        promoInfo: {
          promoId: 'jhjhj',
          promoName: '全部九折',
          promoDiscount: '0.9',
        },
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
      isPromo.value = dataObj.promoInfo.promoId === '' ? false : true;
      // sizeList
      // colorList
      //tagsValue
    })

    const tagsValue = ref(['男生上衣', '個性', '襯衫']);
    let productObj = ref([]);
    let isPromo = ref([]);
    const checked = ref(productObj.value.checked);

    const mainTableObj = reactive({
      'fields': [
        {label: '顏色', key: 'itemColor', sortable: true},
        {label: '尺寸', key: 'itemSize', sortable: true},
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
      console.log(item);
      console.log(type);
      if (!item || type !== 'row') return
      if (item.itemIsDelete === true) return 'table-secondary'
    }


    const barcodeValue = ref('CODE39 Barcode');

    const newItem = function () {
      this.$refs['newItem-modal'].show()
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



    return {
      tagsValue,
      checked,
      addRow,
      barcodeValue,
      brandTableObj,
      newItem,
      submit,
      productObj, mainTableObj, rowClass, isPromo
    }
  },


}
</script>

<style scoped>

</style>