import Response from '../response';
import chartTooltip from '../lib/chartTooltip';
import chartTitle from '../lib/chartTitle';
import chartToolbox from '../lib/chartToolbox';
import chartLegend from '../lib/chartLegend';
import chartGrid from '../lib/chartGrid';
import { chartPieSeries } from './chartSeries';
/**
 * 转换饼图
 * @export
 * @class tranfromPie
 */
export default class tranfromPie {
  Title = new chartTitle();
  Tooltip = new chartTooltip();
  Toolbox = new chartToolbox();
  Legend = new chartLegend();
  Grid = new chartGrid();
  options = {};
  response = new Response();
  init(data) {
    console.time('tranfromPie');
    console.log('tranfromPie-start');
    this.makeOptions(data);
    console.timeEnd('tranfromPie');
    console.log('tranfromPie-end');
    // return this.options;
    this.response.setResponse(200, true, '饼图数据已经转换完成', this.options);
  }
  makeOptions(data) {
    this.Title.init(data.title);
    this.Tooltip.init(data, 'pie');
    this.Legend.init(data.legend);

    this.options.title = this.Title.title;
    this.options.tooltip = this.Tooltip.tooltip;
    this.options.toolbox = this.Toolbox.toolbox;
    this.options.legend = this.Legend.legend;
    this.options.grid = this.Grid.grid;

    this.options.series = this.setSeries(data);
  }
  setSeries(data) {
    let xAxis = data.xAxis || [{
        text: ''
      }],
      // type = data.type,
      values = data.values,
      legend = data.legend;
    let series = [];
    if (xAxis && xAxis.length > 0) {
      xAxis.forEach((item, x) => {
        let PieSeries = new chartPieSeries(),
          pieSeries = PieSeries.pieSeries,
          pieData = [];
        pieSeries.name = item.text;
        legend.forEach((items, y) => {
          let dataItems = {
            value: '',
            name: ''
          };
          dataItems.value = values[y][x];
          dataItems.name = items;
          pieData.push(dataItems);
        });

        pieSeries.data = [].concat(pieData);
        pieData = [];
        series.push(pieSeries);
      });
    }
    return series;
  }
}
