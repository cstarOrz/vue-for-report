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
            <tr v-for="(item,index) of bodyData" :key="index">
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
  name: "merge-table",
  props: {
    // tableHeadData: Array,
    // jsonElement: Object
  },
  data() {
    return {
      jsonElement: {
        left: ["学生性别", "学生人数"],
        top: [
          {
            title: "动机导向型",
            mergeNum: 3
          },
          {
            title: "效果导向型",
            mergeNum: 3
          },
          {
            title: "外力导向型",
            mergeNum: 3
          },
          {
            title: "混合型",
            mergeNum: 3
          }
        ],
        body: [
          "人数",
          "类别比例",
          "班级比例",
          "人数",
          "类别比例",
          "班级比例",
          "人数",
          "类别比例",
          "班级比例",
          "人数",
          "类别比例",
          "班级比例"
        ]
      },
      tableHeadData: [],
      bodyData: [
        [
          "男生",
          "20人",
          "5人",
          "25%",
          "20%",
          "4人",
          "20%",
          "10%",
          "4人",
          "20%",
          "30%",
          "7人",
          "35%",
          "40%"
        ],
        [
          "女生",
          "20人",
          "5人",
          "25%",
          "20%",
          "4人",
          "20%",
          "10%",
          "4人",
          "20%",
          "30%",
          "7人",
          "35%",
          "40%"
        ]
      ]
    };
  },
  methods: {
    tranFromMergeTable(data) {
      let dataH = [];
      let dataB = [];
      data.left.forEach(elem => {
        let dataList = {};
        dataList.title = elem;
        dataList.merge = true;
        dataList.mergeType = "rowspan";
        dataList.mergeNum = 2;
        dataH.push(dataList);
      });
      data.top.forEach(elem => {
        let dataList = {};
        dataList.title = elem.title;
        dataList.merge = true;
        dataList.mergeType = "colspan";
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
    this.tranFromMergeTable(this.jsonElement);
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
      background: #6f6dd8;
      tr {
        line-height: 44px;
        td {
          color: #fff;
        }
      }
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
      background: #6f6dd8;
      color: #fff;
    }
    .report-table-head {
      background: #6f6dd8;
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
