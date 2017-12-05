/**
 * 雷达图坐标系组件
 * @export
 * @class chartRadar
 */
export class chartRadar {
  // constructor() {}
  center = ['50%', '50%'];
  radius = '60%';
  indicator = [];
  radar = {
    center: this.center,
    radius: this.radius,
    indicator: this.indicator
  }
}
/**
 * 雷达图的指示器
 * @export
 * @class chartRadarIndicator
 */
export class chartRadarIndicator {
  // constructor() {}
  item = {
    name: '',
    max: 0,
    axisLabel: {}
  }
}
