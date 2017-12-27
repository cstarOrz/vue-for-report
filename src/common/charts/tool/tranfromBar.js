import Response from '../response';
import chartTooltip from '../lib/chartTooltip';
import chartTitle from '../lib/chartTitle';
import chartToolbox from '../lib/chartToolbox';
import chartLegend from '../lib/chartLegend';
import chartGrid from '../lib/chartGrid';
import { chartBarSeries } from './chartSeries';
import {chartBarXAxis, chartBarYAxis} from './chartAxis';
/**
 * 转换柱状图
 * @export
 * @class tranfromBar
 */
export default class tranfromBar {
  // constructor() {};
  Title = new chartTitle();
  Tooltip = new chartTooltip();
  Toolbox = new chartToolbox();
  Legend = new chartLegend();
  Grid = new chartGrid();
  options = {};
  response = new Response();
  init(data, isStack = false) {
    console.time('tranfromBar');
    console.log('tranfromBar-start');
    this.makeOptions(data, isStack);
    console.timeEnd('tranfromBar');
    console.log('tranfromBar-end');
    this.response.setResponse(200, true, '柱状图数据已经转换完成', this.options);
  }
  makeOptions(data, isStack) {
    this.Title.init(data.title);
    this.Tooltip.init(data, 'bar');
    this.Legend.init(data.legend);

    this.options.title = this.Title.title;
    this.options.tooltip = this.Tooltip.tooltip;
    this.options.toolbox = this.Toolbox.toolbox;
    this.options.legend = this.Legend.legend;
    this.options.grid = this.Grid.grid;
    this.options.series = this.setSeries(data, isStack);
    this.options.xAxis = this.setXAxis(data);
    this.options.yAxis = this.setYAxis(data);
    if (isStack) {
      this.options.legend.data = this.options.legend.data.reverse();
    }
  }
  setSeries(data, isStack) {
    let values = data.values,
      legend = data.legend;
    let series = [];
    legend.forEach((item, index) => {
      let BarSeries = new chartBarSeries(),
        barSeries = BarSeries.barSeries;
      barSeries.name = item;
      barSeries.data = [].concat(values[index]);
      if (isStack) {
        barSeries.stack = legend[0];
      }

      series.push(barSeries);
    });
    return series;
  }
  setXAxis(data) {
    let xAxisData = data.xAxis,
      xAxis = [],
      BarXAxis = new chartBarXAxis(),
      barXAxis = BarXAxis.barXAxis;
    xAxisData.forEach((item) => {
      barXAxis.data.push(item.text);
    });
    xAxis.push(barXAxis);
    return xAxis;
  }
  setYAxis(data) {
    let yAxisUnit = data.yAxisUnit,
      yAxis = [],
      BarYAxis = new chartBarYAxis(yAxisUnit),
      barYAxis = BarYAxis.barYAxis();
    yAxis.push(barYAxis);
    return yAxis;
  }
}
