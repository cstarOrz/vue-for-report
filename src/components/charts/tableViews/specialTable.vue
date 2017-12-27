<template>
  <div class="special-table">
      <table>
        <tbody>
            <tr v-for="(trItem,index) of tableConData" :key="index">
                <template v-for="(tdItem,index) of trItem">
                    <td :key="index" v-if="tdItem !== null"
                    :rowspan="(tdItem.mergeType&&tdItem.mergeType=='rowspan')?tdItem.mergeNum:1"
                    :colspan="(tdItem.mergeType&&tdItem.mergeType=='colspan')?tdItem.mergeNum:1"
                    :class="{ 'td-head': tdItem.isTitle}">
                        {{tdItem.value}}
                    </td>
                </template>
            </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
    export default {
        name: "specialTable",
        props: {
            tableConData:Array
        },
        data() {
            return {
            };
        },
        methods: {
        },
        mounted() {
        }
    };
</script>
<style scoped lang="less">
.special-table {
  table {
    width: 100%;
    background-color: #fff;
    color: #666;
    border-collapse: collapse;
    tr{
        line-height: 44px;
        font-size: 14px;
        td{
            border: 1px solid #e2e3e3;
            text-align: center;
        }
        .td-head{
            background: #299be4;
            color: #fff;
        }
    }
  }
}
</style>