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
              <div class="col-md-6 pr-1">
                <div class="form-group">
                  <label>商品編號</label>
                  <input type="text" class="form-control" placeholder="商品編號">
                </div>
              </div>
              <div class="col-md-6 px-1">
                <div class="form-group pl-3">
                  <label>狀態</label>
                  <div class="pl-3 pt-2">
                    <b-form-checkbox v-model="checked" name="check-button" switch>
                      商品狀態 <b> (狀態: {{ checked ? '上架' : '下架' }})</b>
                    </b-form-checkbox>
                  </div>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>商品名稱</label>
                  <input type="text" class="form-control" placeholder="商品名稱">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 pr-1">
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
                        :items="tableObj.items"
                        :fields="tableObj.fields"
                        :sort-by.sync="tableObj.sortBy"
                        :sort-desc.sync="tableObj.sortDesc"
                        sort-icon-left
                        responsive="sm"
                        selectable
                        @row-selected="onRowSelected"

                    >
                      <template #cell(isActive)="data">
                        <b-form-checkbox v-model="data.item.isActive" switch>
                          <b> ({{ data.item.isActive ? '上架' : '下架' }})</b>
                        </b-form-checkbox>
                      </template>
                      <template #cell(isDelete)="data">
                        <b-form-checkbox v-model="data.item.isDelete" v-if="data.item.inStock===false">
                        </b-form-checkbox>
                      </template>
                      <template #cell(ManufacturerNo)="data">
                        <input v-model="data.item.ManufacturerNo">
                      </template>
                    </b-table>
                    <div>

                    </div>
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
                    <h5>{{ dataObj.dataItems.productId }} - {{ dataObj.dataItems.productName }}</h5>
                    <h5></h5>
                    <b-table
                        :items="tableObj.items"
                        :fields="brandTableObj.fields"
                        sort-icon-left
                        responsive="sm"

                    >
                      <template #cell(printNum)>
                        <b-form-input
                            placeholder="列印張數限制1～100"
                            trim
                            v-model="brandNum"
                            aria-describedby="input-live-help input-live-feedback"
                            :state="brandNumState"
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-live-feedback">
                          輸入值有誤
                        </b-form-invalid-feedback>
                        <b-form-text id="input-live-help"></b-form-text>
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
          {{selected}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {computed, reactive, ref} from "@vue/composition-api/dist/vue-composition-api";
import VueBarcode from 'vue-barcode';

export default {
  name: "MainFormPage",
  components: {
    'barcode': VueBarcode
  },
  setup() {
    const newItem = function () {
      this.$refs['newItem-modal'].show()
    }
    const brandNum = ref('0')
    const dataObj = reactive({
      dataItems: {
        productName: "上衣",
        productId: "0123456789",
        checked: true,
        startNum: 0,
        list: [{
          isActive: true,
          color: '黑色',
          size: 'F',
          ManufacturerNo: '1253',
          cost: '200',
          price: 500,
          selfNo: '123456789',
          brandNo: '123456789',
          inStock: false
        }, {
          isActive: false,
          color: '黑色',
          size: 'F',
          ManufacturerNo: '1253',
          cost: '200',
          price: 500,
          selfNo: '123456789',
          brandNo: '123456789',
          inStock: true
        }]
      }
    })
    const brandNumState = computed({
      get: () => brandNum.value > -1 && brandNum.value<101 ? true : false,
    })
    const tagsValue = ref(['男生上衣', '個性', '襯衫']);
    const checked = ref(dataObj.dataItems.checked);
    const barcodeValue = ref('CODE39 Barcode');

    const tableObj = reactive({
      'items': dataObj.dataItems.list,
      'fields': [
        {label: '顏色', key: 'color', sortable: true},
        {label: '尺寸', key: 'size', sortable: true},
        {label: '廠商編號', key: 'ManufacturerNo', sortable: true},
        {label: '成本', key: 'cost', sortable: true},
        {label: '售價', key: 'price', sortable: true},
        {label: '內部編號', key: 'selfNo', sortable: false},
        {label: '條碼編號', key: 'brandNo', sortable: false},
        {label: '狀態', key: 'isActive', sortable: false},
        {label: '刪除', key: 'isDelete', sortable: false}
      ],
      'sortBy': 'age',
      'sortDesc': false

    })

    const addRow = () => {
      //後面補上畫面輸入匡對應回來物件，從這裡推近table
      tableObj.items.push({
            isActive: true,
            color: '白色',
            size: 'F',
            ManufacturerNo: '1253',
            cost: '200',
            price: 500,
            selfNo: '2',
            brandNo: '0',
            inStock: false
          }
      )
    }
    const brandTableObj = reactive({
      'fields': [
        {label: '顏色', key: 'color', sortable: true},
        {label: '尺寸', key: 'size', sortable: true},
        {label: '售價', key: 'price', sortable: true},
        {label: '內部編號', key: 'selfNo', sortable: false},
        {label: '條碼編號', key: 'brandNo', sortable: false},
        {label: '狀態', key: 'isActive', sortable: false},
        {label: '列印張數', key: 'printNum', sortable: false}
      ],
      'sortBy': 'age',
      'sortDesc': false

    })


    const submit = () => {

    }
    const selected = ref([])

    const onRowSelected = (items) => {
      console.log('item:',items)
      selected.value = items

    }

    return {tagsValue, checked, tableObj, addRow, barcodeValue, brandTableObj, dataObj, brandNum, brandNumState, newItem,submit,onRowSelected,selected}
  },


}
</script>

<style scoped>

</style>