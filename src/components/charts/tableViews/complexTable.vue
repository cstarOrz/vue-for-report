<template>
  <div class="table-veiws">
    <table>
      <thead class="report-table-head">
        <tr>
          <td v-for="(item,index) of tableHeadData" :key="index" :class="{ 'td-width': index===0}">
            <span>{{item}}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) of bodyData" :key="index">
            <template  v-for="(items,k) of item">
              <td v-if="items.type=='text'" :class="{ 'title': items.isTitle}"  :key='k'>
                <span>{{items.content}}</span>
              </td>
              <td v-else-if="items.type=='array'" :key='k'>
                 <p v-for="(par,m) of items.content" :key="m" :class="{ indent: par.isIndented}" class="table-p">
                  {{par.content?par.content:'暂无数据'}}
                </p>
              </td>
            </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "complex-table",
  props: {
    tableHeadData: Array,
    jsonElement: Object
  },
  data() {
    return {
      bodyData: []
    };
  },
  methods: {
    tranFromComplexTable(data) {
      let res = [];
      data.contentLeft.forEach((item, x) => {
        let row = [],
          colum = {};
        colum.content = item;
        colum.isTitle = true;
        colum.type = "text";
        row.push(colum);
        let colum1 = {};
        colum1.content = data.complexContent[x];
        colum1.isTitle = false;
        colum1.type = "array";
        row.push(colum1);
        res.push(row);
      });
      this.bodyData = res;
    }
  },
  mounted() {
    this.tranFromComplexTable(this.jsonElement);
  }
};
</script>

<style scoped lang="less">
.table-veiws {
  table {
    width: 100%;
    background-color: #fff;
    color: #666;
    border-collapse: collapse;
    .report-table-head {
      background: #6f6dd8;
      td {
        color: #fff;
      }
      .td-width {
        width: 30%;
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