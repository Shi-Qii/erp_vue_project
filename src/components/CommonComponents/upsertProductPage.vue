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
                            v-for="tag in tags"
                            @remove="removeTag(tag)"
                            :key="tag"
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
                  <label>規格樣式</label>
                  <div>
                    <b-button variant="outline-secondary" @click="addRow()">單筆新增</b-button>
                    <b-button variant="outline-secondary" class="ml-2">批次新增</b-button>
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
                    >
                      <template #cell(isActive)="row">
                        <b-form-checkbox v-model="row.isActive" switch>
                          <b> ({{ row.isActive ? '上架' : '下架' }})</b>
                        </b-form-checkbox>
                        </template>
                    </b-table>
                    <div>
                      Sorting By: <b>{{ tableObj.sortBy }}</b>, Sort Direction:
                      <b>{{ tableObj.sortDesc ? 'Descending' : 'Ascending' }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div style="text-align:center" class="mt-3">
              <div>
                <div>
                  <b-button variant="info" @click="printModal">列印條碼</b-button>
                  <b-button variant="outline-info" class="ml-2">新增商品</b-button>

                  <b-modal ref="print-modal" hide-footer title="請填寫標籤數量">
                    <div class="d-block text-center">
                      <h3>Hello From My Modal!</h3>
                    </div>
                    <b-button class="mt-2" variant="outline-warning" block @click="print">列印</b-button>
                  </b-modal>

                </div>
              </div>
            </div>


          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {reactive, ref} from "@vue/composition-api/dist/vue-composition-api";

export default {
  name: "MainFormPage",
  setup() {
    const tagsValue = ref(['男生上衣', '個性', '襯衫']);
    const checked = ref(true);
    const isActive = ref(true);

    const tableObj = reactive({
      'items': [{isActive: isActive, color: '黑色', size: 'F', ManufacturerNo: '1253',cost:'200',price:500,selfNo:'123456789',brandNo:'123456789'}],
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
      tableObj.items.push({isActive: true, color: '白色', size: 'F', ManufacturerNo: '1253',cost:'200',price:500,selfNo:'223456702',brandNo:'223456702'}
      )
    }
    return {tagsValue, checked, tableObj, addRow}
  },


  methods: {
    printModal() {
      this.$refs['print-modal'].show()
    }
  }


}
</script>

<style scoped>

</style>