import tranfrom from '@/common/charts/common';
import reportList from '@/components/charts/reportList';
import {reportDetail} from '@/common/httpServers';

export default {
  name: 'report-views',
  components: {
    'report-list': reportList
  },
  data() {
    return {
      reportData: [],
      reportTitle: '',
      reportUser: '',
      reportError: false,
      reportErrorMes: ''
    };
  },
  methods: {
    getReportDetail() {
      reportDetail().then((res) => {
        if (res.status == 200 && res.data && res.data.code == 200) {
          this.reportError = false;
          this.reportTitle = res.data.data.reportName;
          this.reportUser = res.data.data.reportSubName;
          this.reportData = this.processData(res.data.data.reportChapterList);
        } else {
          this.reportErrorMes = res.data.message;
          this.reportError = true;
        }
      }, (error) => {
        console.log('error', error);
      });
    },
    processData(data) {
      data.forEach((dataList) => {
        if (dataList.sections) {
          dataList.sections.forEach((secList) => {
            if (secList.reportElements) {
              secList.reportElements.forEach((secEle) => {
                this.jsonParse(secEle);
              });
            }
            if (secList.subSections) {
              secList.subSections.forEach((tirList) => {
                tirList.reportElements.forEach((tirEle) => {
                  this.jsonParse(tirEle);
                });
              });
            }
          });
        }
        if (dataList.reportElements) {
          dataList.reportElements.forEach((firEle) => {
            this.jsonParse(firEle);
          });
        }
      });
      return data;
    },
    jsonParse(dataEle) {
      dataEle.jsonElement = JSON.parse(dataEle.jsonData);
      if (dataEle.elementType == 'Graph') {
        this.processGraph(dataEle, dataEle.jsonElement);
      }
    },
    processGraph(obj, chartData) {
      let list = new tranfrom(chartData);
      if (list.response.code == 200) {
        obj.chartsOption = list.response.data;
      } else {
        console.log(list.response.message);
      }
    }
  },
  mounted() {
    this.getReportDetail();
  }
};
