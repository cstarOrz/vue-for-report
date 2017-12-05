import Response from './response';
import tranfromPie from './tool/tranfromPie';
import tranfromBar from './tool/tranfromBar';
import tranfromRadar from './tool/tranfromRadar';
import { chartType } from './defaultOpt';
// 检查数据是否为空
class checkChartData {
  response = new Response();
  constructor(data) {
    this.checkData(data);
  }
  checkData(data) {
    if (!data) {
      this.response.setResponse(404, false, `传入值值为空`);
      return;
    }
    let keysList = Object.keys(data);
    if (keysList.length < 1) {
      this.response.setResponse(404, false, `传入值值为空`);
    }
    for (let i = 0; i < keysList.length; i++) {
      if (!data[keysList[i]] && keysList[i] != 'yAxisUnit' && keysList[i] != 'formatter') {
        this.response.setResponse(404, false, `${keysList[i]}值为空`);
        return;
      }
    }
  }
}
// 转换对外接口
class tranfrom {
  constructor(data) {
    this.init(data);
  };
  pie = new tranfromPie();
  bar = new tranfromBar();
  radar = new tranfromRadar();
  response = new Response();
  init(data) {
    const checkData = new checkChartData(data);
    if (checkData.response.code == 404) {
      this.response = checkData.response;
      return;
    }
    if (data.type == chartType.PIE) {
      this.pie.init(data);
      this.response = this.pie.response;
    } else if (data.type == chartType.BAR) {
      this.bar.init(data);
      this.response = this.bar.response;
    } else if (data.type == chartType.STACK) {
      this.bar.init(data, true);
      this.response = this.bar.response;
    } else if (data.type == chartType.RADAR) {
      this.radar.init(data);
      this.response = this.radar.response;
    } else {
      this.response.setResponse(404, false, `暂无此类型---${data.type}`);
    }
  }
}

export default tranfrom;
