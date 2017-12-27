<template>
  <div class="merge-table">
      <table>
        <thead class="report-table-head">
            <tr v-for="(tabHead,index) of tableHeadData" :key="index">
                <td v-for="(headCon,index) of tabHead" :key="index" 
                :rowspan="(headCon.merge&&headCon.mergeType=='rowspan')?headCon.mergeNum:1"
                :colspan="(headCon.merge&&headCon.mergeType=='colspan')?headCon.mergeNum:1">
                    {{headCon.title}}
                </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) of tableConData" :key="index">
                <td v-for="(items,k) of item" :key="k">
                    <span>{{items}}</span>
                </td>
            </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
    export default {
        name: "mergeTable",
        props: {
            tableHead: Object,
            tableConData: Array
        },
        data() {
            return {
                tableHeadData:[]
            };
        },
        methods: {
            tranFromMergeTable(data){
                let dataH = [];
                let dataB = [];
                data.left.forEach(elem => {
                    let dataList = {};
                    dataList.title = elem;
                    dataList.merge = true;
                    dataList.mergeType = 'rowspan';
                    dataList.mergeNum = 2;
                    dataH.push(dataList);
                });
                data.top.forEach(elem => {
                    let dataList = {};
                    dataList.title = elem.title;
                    dataList.merge = true;
                    dataList.mergeType = 'colspan';
                    dataList.mergeNum = elem.mergeNum;
                    dataH.push(dataList);
                });
                this.tableHeadData.push(dataH);
                data.body.forEach(elem => {
                    let dataList = {};
                    dataList.title = elem;
                    dataList.merge = false;
                    dataB.push(dataList);
                });
                this.tableHeadData.push(dataB);
            }
        },
        mounted() {
            this.tranFromMergeTable(this.tableHead);
        }
    };
</script>
<style scoped lang="less">
.merge-table {
  table {
    width: 100%;
    background-color: #fff;
    color: #666;
    border-collapse: collapse;
    .report-table-head {
      background: #299be4;
      tr{
          line-height: 44px;
          td{
              color: #fff;
          }
      }
    //   td {
    //     color: #fff;
    //   }
    //   .td-width {
    //     width: 30%;
    //   }
    }
    td {
      border: 1px solid #e2e3e3;
      text-align: center;
      span {
        font-size: 14px;
        line-height: 40px;
      }
    }
    .title {
      background: #299be4;
      color: #fff;
    }
    .report-table-head {
      background: #299be4;
    }
    table-p {
      padding: 0 60px;
      line-height: 30px;
      font-size: 16px;
      color: #666666;
      &.indent {
        text-indent: 28px;
      }
    }
  }
}
</style>