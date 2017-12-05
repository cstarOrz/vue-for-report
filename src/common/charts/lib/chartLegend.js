import defaultOpt from '../defaultOpt';
/**
 * export default
 * @class chartLegend
 */
export default class chartLegend {
  data = [];
  // constructor() {};
  legend = {
    top: defaultOpt.legendTop,
    data: []
  }
  init(data, top = defaultOpt.legendTop) {
    this.legend.data = data;
    if (top) this.legend.top = top;
  }
}
