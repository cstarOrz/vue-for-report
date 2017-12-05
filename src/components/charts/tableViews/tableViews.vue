<template>
  <div class="table-veiws">
    <table>
      <thead class="report-table-head" v-if="!direction">
        <tr>
          <td v-for="(item,index) of tableHeadData" :key="index">
            <span>{{item}}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) of tableBodyData" :key="index">
          <td class="title" v-if="direction">
            {{tableHeadData[index]}}
          </td>
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
  name: "table-veiws",
  props: {
    tableHeadData: Array,
    tableBodyData: Array,
    direction: Boolean
  },
  data: function() {
    return {};
  },
  methods: {}
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
  }
}
</style>
