/**
 * 触发类型
 * @class chartTrigger
 */
class chartTrigger {
  item = 'item'; // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
  axis = 'axis'; // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
  none = 'none'
  trigger = '';
  init(type) {
    if (type == 'pie' || type == 'radar') {
      this.trigger = this.item;
    } else if (type == 'bar') {
      this.trigger = this.axis;
    } else {
      this.trigger = this.none;
    }
  }
}
/**
 * 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
 * @class chartFormatter
 */
class chartFormatter {
  // constructor() {};
  formatter = '';
  defaultFormatter = '';
  pieFormatter = '{a} <br/>{b} : {c} ({d}%)';
  pieFormatter1 = '{b} : {c} ({d}%)';
  barFormatter = '{a} <br/>{b} : {c}';
  barFormatter1 = '{a} <br/>{b} : {c}%';
  init(data, type) {
    if (!data.formatter) {
      if (type == 'pie') {
        if (data.xAxis) {
          this.formatter = this.pieFormatter;
        } else {
          this.formatter = this.pieFormatter1;
        }
      } else if (type == 'bar' && data.yAxisUnit) {
        this.formatter = function (params) {
          let res = params[0].axisValue;
          params.forEach((item,index)=>{
            res += '<br/>' + item.marker + item.seriesName + '：' + item.value + '%';
          });

          return res;
        };
      } else {
        this.formatter = this.defaultFormatter;
      }
    } else if (data.formatter) {
      // this.formatter = this.defaultFormatter;marker
      if (type == 'radar') {
        this.formatter = function (params) {
          let values = params.value,
            xAxis = data.xAxis,
            res = params.name;
          xAxis.forEach((item, index) => {
            res += '<br/>' + item.text + ':' + values[index] + '%';
          });
          return res;
        };
      } else {
        this.formatter = this.defaultFormatter;
      }
    }
  }
}
/**
 * 设置图表提示框
 * @class chartTooltip
 */
export default class chartTooltip {
  // constructor() {};
  trigger = new chartTrigger();
  formatter = new chartFormatter();
  tooltip = {
    trigger: '',
    formatter: ''
  }
  init(data, type) {
    this.trigger.init(type);
    this.formatter.init(data, type);
    this.tooltip.trigger = this.trigger.trigger;
    this.tooltip.formatter = this.formatter.formatter;
  }
}
