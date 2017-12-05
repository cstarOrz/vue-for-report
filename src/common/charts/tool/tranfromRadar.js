import Response from '../response';
import chartTooltip from '../lib/chartTooltip';
import chartTitle from '../lib/chartTitle';
import chartToolbox from '../lib/chartToolbox';
import chartLegend from '../lib/chartLegend';
import chartGrid from '../lib/chartGrid';
import { chartRadarSeries } from './chartSeries';
import { chartRadar, chartRadarIndicator } from './chartRadar';
/**
 * 转换雷达图
 * @export
 * @class tranfromRadar
 */
export default class tranfromRadar {
  Title = new chartTitle();
  Tooltip = new chartTooltip();
  Toolbox = new chartToolbox();
  Legend = new chartLegend();
  Grid = new chartGrid();
  options = {};
  response = new Response();
  init(data) {
    console.time('tranfromRadar');
    console.log('tranfromRadar-start');
    this.makeOptions(data);
    console.timeEnd('tranfromRadar');
    console.log('tranfromRadar-end');
    this.response.setResponse(200, true, '雷达图数据已经转换完成', this.options);
  }
  makeOptions(data) {
    this.Title.init(data.title);
    this.Tooltip.init(data, 'radar');
    this.Legend.init(data.legend);

    this.options.title = this.Title.title;
    this.options.tooltip = this.Tooltip.tooltip;
    this.options.toolbox = this.Toolbox.toolbox;
    this.options.legend = this.Legend.legend;
    this.options.grid = this.Grid.grid;

    this.options.radar = this.setRadar(data);
    this.options.series = this.setSeries(data);
  }
  setSeries(data) {
    let values = data.values,
      legend = data.legend,
      series = [],
      RadarSeries = new chartRadarSeries(),
      radarSeries = RadarSeries.radarSeries;
    legend.forEach((item, index) => {
      radarSeries.data.push({
        value: values[index],
        name: item
      });
    });
    series.push(radarSeries);
    return series;
  }
  /**
   * 单个雷达图，多个雷达图未处理，xAxis改为二维数组，再从新处理
   *
   * @param {any} data
   * @returns
   * @memberof tranfromRadar
   */
  setRadar(data) {
    let
      xAxis = data.xAxis,
      Radar = new chartRadar(),
      radar = Radar.radar,
      radars = [];
    xAxis.forEach((item, index) => {
      const RadarIndicator = new chartRadarIndicator(),
        radarIndicator = RadarIndicator.item;
      radarIndicator.name = item.text;
      radarIndicator.max = item.maxValue;
      if (index == 0) {
        if (item.unit) {
          radarIndicator.axisLabel.show = true;
          (function (item) {
            radarIndicator.axisLabel.formatter = function formatter(val) {
              return val + item.unit;
            };
          })(item);
        } else {
          radarIndicator.axisLabel.show = true;
        }
      };
      radar.indicator.push(radarIndicator);
    });
    radars.push(radar);
    return radars;
  }
}
