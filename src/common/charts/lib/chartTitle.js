/**
 * 设置图表标题
 * @class chartTitle
 */
export default class chartTitle {
  // constructor() {};
  title = {
    text: '',
    x: 'center'
  }
  init(text) {
    this.title.text = text;
  }
}
