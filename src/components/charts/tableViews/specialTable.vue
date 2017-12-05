<template>
  <div class="special-table">
      <table>
        <tbody>
            <tr v-for="(trItem,index) of tableConData" :key="index">
                <td v-for="(tdItem,index) of trItem" :key="index"
                :rowspan="(tdItem.mergeType&&tdItem.mergeType=='rowspan')?tdItem.mergeNum:1"
                :colspan="(tdItem.mergeType&&tdItem.mergeType=='colspan')?tdItem.mergeNum:1"
                :class="{ 'td-head': tdItem.isTitle}">
                    {{tdItem.value}}
                </td>
            </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
export default {
  name: "special-table",
  props: {
    // tableHeadData: Array,
    // jsonElement: Object
  },
  data() {
    return {
      tableConData: [
        [
          {
            value: "班级名称",
            isTitle: true
          },
          {
            value: "高三一班",
            isTitle: false
          },
          {
            value: "学生人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          },
          {
            value: "男生人数",
            isTitle: true
          },
          {
            value: "30",
            isTitle: false
          },
          {
            value: "女生人数",
            isTitle: true
          },
          {
            value: "20",
            isTitle: false
          }
        ],
        [
          {
            value: "测试名称",
            isTitle: true
          },
          {
            value: "高三年级学生学习类型测评",
            isTitle: false,
            mergeType: "colspan",
            mergeNum: 3
          },
          {
            value: "测试时长",
            isTitle: true
          },
          {
            value: "120min",
            isTitle: false
          },
          {
            value: "测试时间",
            isTitle: true
          },
          {
            value: "2017-08-20",
            isTitle: false
          }
        ],
        [
          {
            value: "测试名称",
            isTitle: true
          },
          {
            value: "高三年级学生学习类型测评",
            isTitle: false
          },
          {
            value: "测试时间",
            isTitle: true
          },
          {
            value: "2017-08-20",
            isTitle: false
          },
          {
            value: "班级数量",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          }
        ],
        [
          {
            value: "学生人数",
            isTitle: true,
            mergeType: "rowspan",
            mergeNum: 3
          },
          {
            value: "500",
            isTitle: false,
            mergeType: "rowspan",
            mergeNum: 3
          },
          {
            value: "男生人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          },
          {
            value: "女生人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          }
        ],
        [
          {
            value: "文科人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          },
          {
            value: "理科人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          }
        ],
        [
          {
            value: "应届人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          },
          {
            value: "往届人数",
            isTitle: true
          },
          {
            value: "50",
            isTitle: false
          }
        ]
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped lang="less">
.special-table {
  table {
    width: 100%;
    background-color: #fff;
    color: #666;
    border-collapse: collapse;
    tr {
      line-height: 44px;
      font-size: 14px;
      td {
        border: 1px solid #e2e3e3;
        text-align: center;
      }
      .td-head {
        background: #6f6dd8;
        color: #fff;
      }
    }
  }
}
</style>
