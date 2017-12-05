/**
 * 饼图列表
 * @export
 * @class chartPieSeries
 */
export class chartPieSeries {
  // constructor() {};
  type = 'pie';
  radius = '60%';
  centerX = '50%';
  centerY = '55%';
  selectedMode = 'single';
  pieSeries = {
    name: '',
    type: this.type,
    radius: this.radius,
    center: [this.centerX, this.centerY],
    selectedMode: this.selectedMode,
    data: []
  }
  init() {

  }
}
/**
 * 柱状图列表
 * @export
 * @class chartBarSeries
 */
export class chartBarSeries {
  // constructor() {};
  type = 'bar';
  barSeries = {
    name: '',
    type: this.type,
    stack: '',
    data: []
  }
}
/**
 * 雷达图列表
 * @export
 * @class chartRadarSeries
 */
export class chartRadarSeries {
  constructor(name = '') {
    if (name) this.name = name;
  }
  name = '';
  type = 'radar';
  radarSeries = {
    type: this.type,
    name: this.name,
    data: []
  }
}
