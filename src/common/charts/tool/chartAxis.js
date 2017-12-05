/**
 * 柱状图横轴
 * @export
 * @class chartBarXAxis
 */
export class chartBarXAxis {
  // constructor() {}
  type = 'category';
  barXAxis = {
    type: this.type,
    data: []
  }
}
/**
 * 柱状图纵轴
 * @export
 * @class chartBarYAxis
 */
export class chartBarYAxis {
  constructor(yAxisUnit) {
    this.yAxisUnit = yAxisUnit;
  }
  type = 'value';
  yAxisUnit = '';
  barYAxis = {
    type: this.type,
    axisLabel: {
      formatter: '{value}' + this.yAxisUnit
    }
  }
}
