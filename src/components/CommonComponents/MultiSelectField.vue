<template>
  <div>
    <div style="display: flex; border: solid 1px #cccccc; border-radius: 1px" class="py-1 px-2">
      <b-form-checkbox v-model="isExclude">排除行業代號</b-form-checkbox>
    </div>
    <div style="border: solid 1px #cccccc; border-radius: 1px" class="py-1 px-2">
      <b-form-radio class="col-sm-3" v-model="codeSelect" value="code" @change="radioChange">1.依據分類選擇行業代號 </b-form-radio>
      <b-form inline class="m-3">
        <b-form-select
          @change="changeBscd4(selectedLrgBscd)"
          v-model="selectedLrgBscd"
          :options="LrgBscdOptions"
          :select-size="7"
          class="col-2"
        ></b-form-select>
        <b-form-select
          @change="changeBscd6(selectedBscd4)"
          v-model="selectedBscd4"
          :options="bscd4Options"
          :select-size="7"
          class="col-3"
        ></b-form-select>
        <b-form-select class="col-3" v-model="selectedBscd6" :options="bscd6Options" multiple :select-size="7"></b-form-select>
        <b-button-group vertical size="sm" class="col-1">
          <b-button class="mb-2" @click="right(selectedBscd6)" :disabled="codeDisable"> 加入 &gt;&gt;</b-button>
          <b-button class="mb-2" @click="left(BSCDdata.source)" :disabled="codeDisable"> &lt;&lt; 移除</b-button>
          <b-button class="mb-2" @click="allClean()" :disabled="codeDisable">全部移除</b-button>
        </b-button-group>
        <b-form-select class="col-2" v-model="BSCDdata.source" multiple :options="resultData" :select-size="7"></b-form-select>
      </b-form>
    </div>
    <div style="border: solid 1px #cccccc; border-radius: 1px" class="py-1 px-2">
      <b-form-radio class="col-sm-3" v-model="codeSelect" value="search" @change="radioChange">2.依據代碼選擇行業代號 </b-form-radio>
      <b-form class="col-10" inline>
        <label>行業代號</label>
        <b-input-group class="col-3">
          <b-form-input placeholder="請輸入行業代號" v-model="codeChangeInput" @input="codeInput"></b-form-input>
        </b-input-group>
        <!--        <label class="text-danger" v-if="codeNmChange == null">查無行業代號</label>-->
        <b-input-group class="col-5">
          <b-form-input :class="codeNmChange == '查無行業代號' ? 'text-danger' : 'text-dark'" v-model="codeNmChange" disabled>
          </b-form-input>
        </b-input-group>
        <b-button class="mr-2" :disabled="manual" @click="add()"> 新增</b-button>
        <b-button :disabled="manual" @click="remove(BSCDdata.source)"> 移除</b-button>
      </b-form>
      <b-form-select class="m-3 col-6" v-model="BSCDdata.source" multiple :options="resultData2"></b-form-select>
    </div>
  </div>
</template>

<script>
 import { onMounted, reactive, ref } from '@vue/composition-api';

export default {
  //送出prop到BSCD:{}物件裡面
  setup() {
    const codeSelect = ref('code');
    const bscd4Data = ref(null);
    const bscd6Data = ref(null);
    const selectedLrgBscd = ref([]);
    const selectedBscd4 = ref([]);
    const originBscd4 = ref([]);
    const selectedBscd6 = ref([]);
    const LrgBscdOptions = ref([]);
    const bscd4Options = ref([]);
    const bscd6Options = ref([]);
     const isExclude = ref(false);
    const codeDisable = ref(false);
    const codeChangeInput = ref(null);
    const codeNmChange = ref('查無行業代號');
    const manual = ref(true);
     // *************************************************************
    // const BSCDdata = reactive(props.model.BSCD);
    // const BSCDdata2 = reactive(props.model.BSCD);
    const BSCDdata = reactive({ source: [] });
    // const BSCDdata2 = reactive({ source: [] });

    const resultData = ref([]);
    const resultData2 = ref([]);
    //右移
    const right = function (item) {
      // console.log('right item要新增的內容:', item);
      // console.log('originBscd4.value:', originBscd4.value);
      // console.log('resultData.value:', resultData.value);
       let inputArrText = [];
      let inputArr = [];
      //如果還在大代碼那邊，則將大類以下所有行業代號丟過去
      if (item.length == 0 && originBscd4.value.length == 0) {
        bscd6Data.value.sort((a, b) => a['bscd_6'].localeCompare(b['bscd_6']));

        bscd6Data.value.forEach(bscd6 => {
          if (bscd6['lrg_bscd'] === selectedLrgBscd.value) {
            resultData.value.push({ text: `${bscd6['bscd_6']}${bscd6['bscd_6_nm']}`, value: bscd6['bscd_6'] });
          }
        });

        bscd4Options.value.forEach(bscd4 => {
          changeBscd6(bscd4['value']);
        });
      }
      //如果僅點擊4碼中代碼那邊，return 整個中代碼下的小代碼(6碼)
      //先全部裝在resultData
      if (item.length == 0 && originBscd4.value.length != 0) {
        originBscd4.value.forEach(x => {
          resultData.value.push({ text: x['text'], value: x['value'] });
        });
        for (let i in resultData.value) {
          //避免重複 先過濾掉到新陣列
          if (inputArrText.indexOf(resultData.value[i].value) == -1) {
            inputArrText.push(resultData.value[i].value);
            inputArr.push(resultData.value[i]);
          }
        }
        //清空
        resultData.value.splice(0, resultData.value.length);
        //裝填
        resultData.value = inputArr;
      }
      //如果在小代碼那邊，return 小代碼
      // console.log('resultData的長度:', resultData.value.length);
      if (item.length != 0) {
        item.forEach(x => {
          resultData.value.push({ text: x['text'], value: x['value'] });
          // console.log('set後的陣列:', resultData.value);
        });
        for (let i in resultData.value) {
          //避免重複 先過濾掉到新陣列
          if (inputArrText.indexOf(resultData.value[i].value) == -1) {
            inputArrText.push(resultData.value[i].value);
            inputArr.push(resultData.value[i]);
          }
        }
        //清空
        resultData.value.splice(0, resultData.value.length);
        //裝填
        resultData.value = inputArr;
      }
      let temporaryArr = [];
      // console.log('resultData的長度:', resultData.value.length);
      //4碼篩選出來的6碼物件 賦值
      resultData.value.forEach(item => {
        temporaryArr.push(item.value);
      });
      BSCDdata.source = [];
      BSCDdata.source = temporaryArr;
    };

    //左移
    const left = function (item) {
      // console.log('item left remove:', item);
      // console.log('resultData.value:', resultData.value);
      //過濾掉要被左移的元素
      resultData.value = resultData.value.filter(x => {
        return !item.includes(x.value);
      });
      // console.log('resultData:', resultData.value);
      BSCDdata.source = resultData.value;
    };

    //全部清除
    const allClean = function () {
      resultData.value.splice(0, resultData.value.length);
      // console.log('resultData:', resultData.value);
      BSCDdata.source = resultData.value;
    };

    //保留 原版本有
    onMounted(() => {
      let res =reactive({data:[
          {'lrg_bscd_nm':'Name_1','lrg_bscd':'1'}
        ]})
      //初始化頁面
      bscd4Data.value = res.data;
      bscd6Data.value = res.data;
      const myMap1 = new Map();
      res.data.forEach(x => {
        myMap1.set(x['lrg_bscd_nm'], x['lrg_bscd']);
      });
      // console.log('res.data:', res.data);
      for (var [key, value] of myMap1) {
        const lrg_bscd = {};
        lrg_bscd.text = key;
        lrg_bscd.value = value;
        LrgBscdOptions.value.push(lrg_bscd);
      }
      LrgBscdOptions.value.sort((a, b) => a.value.localeCompare(b.value));

    });

    //大代碼onchange
    function changeBscd4(item) {
      //這邊要清除掉中代碼跟小代碼的暫存檔 以免被誤觸button
      originBscd4.value.splice(0, originBscd4.value.length);
      selectedBscd6.value.splice(0, selectedBscd6.value.length);
      // console.log('bscd4Data:', bscd4Data);
      // console.log('bscd6Data:', bscd6Data);
      // console.log('changeBscd4(item):', item);
      bscd4Options.value.splice(0, bscd4Options.value.length);
      bscd6Options.value.splice(0, bscd6Options.value.length);
      const myMap2 = new Map();
      bscd4Data.value.forEach(x => {
        while (x['lrg_bscd'] === item) {
          myMap2.set(x['bscd_4'] + x['bscd_4_nm'], x['bscd_4']);
          break;
        }
      });
      for (var [key, value] of myMap2) {
        const bscd_4_Data = {};
        bscd_4_Data.text = key;
        bscd_4_Data.value = value;
        bscd4Options.value.push(bscd_4_Data);
      }
      bscd4Options.value.sort((a, b) => a.value.localeCompare(b.value));
    }

    //中代碼onchange
    function changeBscd6(item) {
      // console.log('確認一下selectedBscd4:', item);
      bscd6Options.value.splice(0, bscd6Options.value.length);
      originBscd4.value.splice(0, originBscd4.value.length);
      const myMap3 = new Map();
      bscd6Data.value.forEach(x => {
        while (x['bscd_4'] === item) {
          myMap3.set(x['bscd_6'] + x['bscd_6_nm'], x['bscd_6']);
          break;
        }
      });
      for (var [key, value] of myMap3) {
        const bscd_6_Data = {};
        bscd_6_Data.text = key;
        bscd_6_Data.value = { text: key, value: value };
        bscd6Options.value.push(bscd_6_Data);
        originBscd4.value.push(bscd_6_Data.value);
      }
      bscd6Options.value.sort((a, b) => a.value.value.localeCompare(b.value.value));
    }

    const radioChange = function () {
      BSCDdata.source.splice(0, BSCDdata.source.length);
      // console.log('codeSelect:', codeSelect.value);
      if (codeSelect.value === 'search') {
        resultData.value.splice(0, resultData.value.length);
        BSCDdata.source = resultData.value;
        codeDisable.value = true;
        manual.value = false;
      } else if (codeSelect.value === 'code') {
        resultData2.value.splice(0, resultData2.value.length);
        BSCDdata.source = resultData.value;
        codeDisable.value = false;
        manual.value = true;
      }
    };

    //搜尋部分
    const codeInput = function () {
      // console.log('codeChangeInput:', codeChangeInput.value);
      // console.log('LrgBscdOptions:', bscd4Data.value);
      if (codeChangeInput.value.length == 3) {
        // console.log('3馬');
        let tempArr = bscd4Data.value.filter(x => {
          return x.bscd_3 == codeChangeInput.value;
        });
        if (tempArr.length != 0) {
          codeNmChange.value = tempArr[0].bscd_3 + tempArr[0].bscd_3_nm;
        } else {
          codeNmChange.value = null;
        }
        // console.log('tempArr:', tempArr);
        // console.log('codeNmChange.value:', codeNmChange.value);
      } else if (codeChangeInput.value.length == 4) {
        // console.log('4馬');
        let tempArr = bscd4Data.value.filter(x => {
          return x.bscd_4 == codeChangeInput.value;
        });
        if (tempArr.length != 0) {
          codeNmChange.value = tempArr[0].bscd_4 + tempArr[0].bscd_4_nm;
        } else {
          codeNmChange.value = null;
        }
        // console.log('tempArr:', tempArr);
      } else if (codeChangeInput.value.length == 6) {
        // console.log('6馬');
        let tempArr = bscd4Data.value.filter(x => {
          return x.bscd_6 == codeChangeInput.value;
        });
        if (tempArr != 0) {
          codeNmChange.value = tempArr[0].bscd_6 + tempArr[0].bscd_6_nm;
        } else {
          codeNmChange.value = null;
        }
        // console.log('tempArr:', tempArr);
      } else {
        codeNmChange.value = null;
      }
    };

    const add = function () {
      // console.log('input新增:', codeNmChange.value);
      if (codeNmChange.value != null) {
        //先取出三碼filter bscd4Data.value:整個行業代碼物件
        let filterArr = [];
        let inputArrText = [];
        let inputArr = [];
        if (codeChangeInput.value.length == 3) {
          //篩選出三碼的陣列物件內容
          let addArr = bscd4Data.value.filter(x => {
            return x.bscd_3 + x.bscd_3_nm == codeNmChange.value;
          });
          // console.log('addArr 篩選出三碼的陣列物件內容:', addArr);
          //resultData2.value 跟 addArr做篩選不重複
          if (addArr.length != 0) {
            for (let i = 0; i < addArr.length; i++) {
              filterArr.push({ text: addArr[i].bscd_6 + addArr[i].bscd_6_nm, value: addArr[i].bscd_6 });
            }
            // console.log('filterArr 三碼篩選出來的六碼內容:', filterArr);
            if (resultData2.value.length != 0) {
              filterArr.forEach(x => {
                resultData2.value.push(x);
              });
              for (let i in resultData2.value) {
                if (inputArrText.indexOf(resultData2.value[i].value) == -1) {
                  inputArrText.push(resultData2.value[i].value);
                  inputArr.push(resultData2.value[i]);
                }
              }
              resultData2.value.splice(0, resultData2.value.length);
              resultData2.value = inputArr;
            } else if (resultData2.value.length == 0) {
              for (let i in filterArr) {
                if (inputArrText.indexOf(filterArr[i].value) == -1) {
                  inputArrText.push(filterArr[i].value);
                  inputArr.push(filterArr[i]);
                } else {
                  // console.log('checked:', filterArr[i]);
                }
              }
              resultData2.value.splice(0, resultData2.value.length);
              resultData2.value = inputArr;
            }
            // console.log('3碼準備傳出去的值:', resultData2.value);
          }
          // BSCDdata.source = resultData2.value;
        } else if (codeChangeInput.value.length == 4) {
          //4碼filter
          //假設resultData2.value.length != 0 先將輸入的資料裝進去 在放到一個空陣列 把相同的key篩選出來
          let addArr = bscd4Data.value.filter(x => {
            return x.bscd_4 + x.bscd_4_nm == codeNmChange.value;
          });
          //把資料塞入
          if (addArr.length != 0) {
            for (let i = 0; i < addArr.length; i++) {
              filterArr.push({ text: addArr[i].bscd_6 + addArr[i].bscd_6_nm, value: addArr[i].bscd_6 });
            }
            if (resultData2.value.length != 0) {
              filterArr.forEach(x => {
                resultData2.value.push(x);
              });
              //塞入後先把資料放到一個空的陣列 並過濾相同的
              for (let i in resultData2.value) {
                if (inputArrText.indexOf(resultData2.value[i].value) == -1) {
                  inputArrText.push(resultData2.value[i].value);
                  inputArr.push(resultData2.value[i]);
                }
              }
              //清空
              resultData2.value.splice(0, resultData2.value.length);
              //裝填
              resultData2.value = inputArr;
              // console.log('inputArr檢查陣列:', inputArr);
              // console.log('resultData2.value檢查陣列:', resultData2.value);
            } else if (resultData2.value.length == 0) {
              for (let i in filterArr) {
                if (inputArrText.indexOf(filterArr[i].value) == -1) {
                  inputArrText.push(filterArr[i].value);
                  inputArr.push(filterArr[i]);
                } else {
                  // console.log('checked:', filterArr[i]);
                }
              }
              resultData2.value.splice(0, resultData2.value.length);
              resultData2.value = inputArr;
            }
          }
          //4碼篩選出來的6碼物件 賦值
          // BSCDdata.source = resultData2.value;
        } else if (codeChangeInput.value.length == 6) {
          //6碼filter
          let addArr = bscd4Data.value.filter(x => {
            return x.bscd_6 + x.bscd_6_nm == codeNmChange.value;
          });
          //把資料塞入
          if (addArr.length != 0) {
            for (let i = 0; i < addArr.length; i++) {
              filterArr.push({ text: addArr[i].bscd_6 + addArr[i].bscd_6_nm, value: addArr[i].bscd_6 });
            }
            if (resultData2.value.length != 0) {
              filterArr.forEach(x => {
                resultData2.value.push(x);
              });
              //塞入後先把資料放到一個空的陣列 並過濾相同的
              for (let i in resultData2.value) {
                if (inputArrText.indexOf(resultData2.value[i].value) == -1) {
                  inputArrText.push(resultData2.value[i].value);
                  inputArr.push(resultData2.value[i]);
                }
              }
              //清空
              resultData2.value.splice(0, resultData2.value.length);
              //裝填
              resultData2.value = inputArr;
            } else if (resultData2.value.length == 0) {
              for (let i in filterArr) {
                if (inputArrText.indexOf(filterArr[i].value) == -1) {
                  inputArrText.push(filterArr[i].value);
                  inputArr.push(filterArr[i]);
                } else {
                  // console.log('checked:', filterArr[i]);
                }
              }
              resultData2.value.splice(0, resultData2.value.length);
              resultData2.value = inputArr;
              // console.log('inputArr檢查陣列:', inputArr);
              // console.log('resultData2.value檢查陣列:', resultData2.value);
            }
          }
        }
      }
      BSCDdata.source = [];
      resultData2.value.forEach(item => {
        BSCDdata.source.push(item.value);
      });
    };

    const remove = function (item) {
      // console.log('Remove resultData2.value:', resultData2.value);
      resultData2.value = resultData2.value.filter(x => {
        return !item.includes(x.value);
      });
      // console.log('resultData:', resultData2.value);
      // console.log('remove BSCDdata.source:', resultData2.value);
      BSCDdata.source = resultData2.value;
    };



    const allData = function () {
      let data = {};
      let bscd = [];
      if (codeSelect.value === 'search') {
        bscd = resultData2.value.map(option => option['value']);
      } else if (codeSelect.value === 'code') {
        bscd = resultData.value.map(option => option['value']);
      }
      data = { data: bscd, isExclude: isExclude.value };
      return data;
    };

    return {
      codeDisable,
      radioChange,
      codeSelect,
      BSCDdata,
      allClean,
      left,
      right,
      resultData,
      resultData2,
      changeBscd4,
      changeBscd6,
      selectedBscd6,
      selectedLrgBscd,
      LrgBscdOptions,
      isExclude,
      bscd4Options,
      bscd6Options,
      selectedBscd4,
      codeInput,
      codeChangeInput,
      manual,
      codeNmChange,
      add,
      remove,
      allData,
    };
  },
};
</script>
