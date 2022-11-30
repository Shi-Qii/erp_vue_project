<template>
  <div>
    <div class="not_print">
      <div>
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

export default {
  name: "PrintViewFunction",
  setup() {
    const makePrint = function () {
      window.print();
    }
    return {makePrint}
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