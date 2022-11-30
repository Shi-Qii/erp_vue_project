<template>
  <div>
    <div class="not_print">
      <div>

        <div class="mt-3 barcodeClass">
          <div v-for="(item, idn) in tableArr" :key="idn">
            <barcode v-bind:value="item.itemBrandNo" format="CODE39" width="1.5" height="35">
            </barcode>
          </div>

        </div>
        <a href="javascript:void(0)"
           @click="makePrint();">
          <b-icon icon="printer"></b-icon>
          列印
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import VueBarcode from 'vue-barcode';

import {ref} from "@vue/composition-api/dist/vue-composition-api";

export default {
  name: "PrintViewFunction",
  components: {
    'barcode': VueBarcode
  },
  props: {
    ObjectItem: Array
  },
  setup(props) {
    let tableArr = ref(props.ObjectItem);

    //itemBrandNo 要列印的對象
    //brandNum 要列印的數量

    const makePrint = function () {
      const pringObject = document.getElementsByClassName('barcodeClass')
      let bdhtml = pringObject[0].innerHTML;

      window.document.body.innerHTML = bdhtml;
      window.print();

    }
    return {makePrint, tableArr}
  }
}
</script>

<style scoped>
@media print {
  .not_print {
    display: none;
  }
}

@page {
  size: A4 portrait;
  margin: 1cm;
}
</style>