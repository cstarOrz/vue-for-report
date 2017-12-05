<template>
  <div class="report-main">
    <div class="svg" v-if="listData.elementType=='LevelSvg'">
      <p class="title">{{listData.jsonElement.name}}</p>
      <svg :width="svgWidth" :height="computeSvgHeight" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
        <rects-text :x="rootX" :y="rootY" :text="listData.jsonElement.levelParent" :is-root='true'></rects-text>
        <template v-for="(item,index) of listData.jsonElement.levelChildren">
            <rects-text :x="400" :y="computeRectY(index)" :text="item.name" :check="item.checked" :key='index' :root-y='rootY' :root-x='rootX'></rects-text>
        </template>
      </svg>
    </div>
    <!-- <div class="mergeTable">
        <merge-table></merge-table>
    </div>
    <div class="special-table">
        <special-table></special-table>
    </div> -->
    <div class="text" v-if="listData.elementType=='MultiText'">
        <p v-for="(par,index) in listData.jsonElement.paragraphs" :key="index" v-bind:class="{ indent: par.isIndented}">
        {{par.content}}
      </p>
    </div>
    <div class="table" v-if="listData.elementType=='Table'">
      <div>
          <p class="tit" v-if="listData.jsonElement.showName">
            {{listData.jsonElement.name}}
          </p>
          <table-veiws :tableHeadData='listData.jsonElement.head' :tableBodyData='listData.jsonElement.data' :direction='listData.jsonElement.headPostion!="1"'></table-veiws>
      </div>
    </div>
    <div class="table" v-if="listData.elementType=='ComplexTable'">
      <div>
          <p class="tit" v-if="listData.jsonElement.showName">
            {{listData.jsonElement.name}}
          </p>
          <complex-table :tableHeadData='listData.jsonElement.head' :json-element='listData.jsonElement'></complex-table>
      </div>
    </div>
    <div class="charts" v-if="listData.elementType=='Graph'">
      <div class="charts-con">
        <chart :options="listData.chartsOption" theme="custom" auto-resize></chart>
      </div>
    </div>
  </div>
</template>
<script>
import tableViews from "@/components/charts/tableViews/tableViews";
import complexTable from "@/components/charts/tableViews/complexTable";
import mergeTable from "@/components/charts/tableViews/mergeTable";
import specialTable from "@/components/charts/tableViews/specialTable";
import rectsText from "@/components/charts/rectsText";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/radar";

import theme from "@/common/charts/theme.json";
ECharts.registerTheme("custom", theme);
export default {
  name: "report-list",
  components: {
    "table-veiws": tableViews,
    chart: ECharts,
    "complex-table": complexTable,
    "rects-text": rectsText,
    "merge-table": mergeTable,
    "special-table": specialTable
  },
  props: {
    listData: Object
  },
  data() {
    return {
      // root: '非连续文本非连续文本',
      rootX: 20,
      rootY: 210,
      // children: [{
      //     name:'41-46分41-46分',
      //     checked:true
      //     },{
      //         name:'41-46分41-46分'
      //     },{
      //     name:'41-46分41-46分'},{name:'41-46分41-46分'}],
      splitH: 0,
      minSplitH: 20,
      svgHeight: 480,
      svgWidth: 700,
      rectHeight: 60,
      rectWidth: 240
    };
  },
  methods: {
    computeRectY: function(index) {
      let children = this.listData.jsonElement.levelChildren;
      var splitH =
        (this.svgHeight - children.length * this.rectHeight) /
        (children.length + 1);
      var rectY = splitH + (splitH + this.rectHeight) * index;
      return +rectY.toFixed(2);
    }
  },
  computed: {
    computeSvgHeight: function() {
      let children = this.listData.jsonElement.levelChildren;
      var svgHeight = (this.minSplitH + this.rectHeight) * children.length;
      if (svgHeight > this.svgHeight) {
        this.svgHeight = svgHeight;
        this.rootY = (this.svgHeight - this.rectHeight) / 2;
      }
      return this.svgHeight;
    }
  }
};
</script>
<style scoped lang="less">
.report-main {
  padding: 0 20px;
  .text p {
    padding: 0 60px;
    line-height: 30px;
    font-size: 16px;
    color: #666666;
    &.indent {
      text-indent: 28px;
    }
  }
  .table {
    padding: 10px 0;
    .tit {
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      margin: 10px 0 15px 0;
    }
  }
  .top-table {
    margin-bottom: 30px;
  }
  .charts {
    width: 100%;
    height: 600px;
    .echarts {
      width: 100%;
      height: 600px;
      // height: 100%;
    }
  }
  .svg {
    text-align: center;
    .title {
      margin: 5px 0 10px;
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
  }
  .image {
    width: 100%;
    height: 400px;
    text-align: center;
    img {
      min-height: 400px;
    }
  }
}
</style>
