import Vue from 'vue';
import tranfrom from '@/common/charts/common';
import reportList from '@/components/charts/reportList';
import menuTree from '@/components/charts/menuTree';
import {reportDetail,reportDetails} from '@/common/httpServers';

export default {
  name: 'report-views',
  components: {
    'report-list': reportList,
    'menu-tree':menuTree
  },
  data() {
    return {
      // reportData: [],
      // reportTitle: '',
      // reportUser: '',
      // reportError: false,
      // reportErrorMes: ''
      // reportId: this.$route.query.reportId,
      tmplLoad:false,
      reportTitle: '',
      reportUser: '',
      meunList: [],
      reportData:{},
      conHeight:0,
      typeList:window.typeList,
      // typeList:[
      //   {
      //     id:'1',
      //     name:'测试1'
      //   },
      //   {
      //     id:'2',
      //     name:'测试2'
      //   }
      // ],
      groupReserveId:window.groupReserveId,
      //typeListChoice:'',
      showContent:false
    };
  },
  methods: {
    // selectVal(ele){
    //   this.typeListChoice = ele.target.value;
    // },
    getReport(){
      //alert(this.typeListChoice);
      let typeId = this.$refs.typeChoice.value;
      //console.log('type',this.typeListChoice);
      this.getReportDetail(typeId,this.groupReserveId);
    },
    getReportDetail(id,groupReserveId) {
      reportDetail(id,groupReserveId).then((res) => {
        if (res.status == 200 && res.data && res.data.code == 200) {
          this.init();
          this.showContent = true;
          //console.log(res.data.data.data);
          let resData = res.data.data;
          this.reportTitle = resData.reportName;
          this.reportUser = resData.reportSubName;
          this.meunList = resData.reportChapterList;
          this.resetMenuList(this.meunList);
          this.getGroupReportSectionData(this.meunList[0]);
          this.meunList[0].isLoad = true;
          this.meunList[0].active = true;
        }
      }, (error) => {
        console.log('error', error);
      });
    },
    resetMenuList(meunList) {
      meunList.forEach((item) => {
        Vue.set(item, 'isLoad', false);
        Vue.set(item, 'active', false);
        item.templateBlock = item.hasDirectContent;
        if(item.sections&&item.sections.length>0){
          item.subSections = item.sections;
        }
        if (item.subSections&&item.subSections.length>0) {
            this.resetMenuList(item.subSections);
        }
      });
    },
    getGroupReportSectionData(item) {
      if (this.tmplLoad) {
          return;
      }
      if (item.active) {
          return;
      }
      this.tmplLoad = true;
      this.resetMenuList(this.meunList);
      Vue.set(item, 'isLoad', true);
      Vue.set(item, 'active', true);
      let typeId = this.$refs.typeChoice.value;
      // setTimeout(()=>{
      //   console.log('typee',this.$refs.typeChoice.value)
      // },0)
      // console.log('type',typeId);
      //console.log('item', item)
      //console.log('typeeeee',this.typeListChoice);
      reportDetails(typeId,this.groupReserveId,item.id).then((res) => {
        if (res.status == 200 && res.data && res.data.code == 200) {
          this.tmplLoad = false;
          this.reportData = res.data.data;
          //console.log(res.data.data);
          this.reportData.forEach((column,index)=>{
            column.jsonElement = JSON.parse(column.jsonData);
            if (column.elementType == 'Graph') {
              this.processGraph(column, column.jsonElement);
            }
          })
        }
      }, (error) => {
        console.log('error', error);
      });
      // this.$http.get(Url.getGroupReportSectionData, {
      //   params: {
      //     testeeId: this.reportId,
      //     sectionId: item.id
      //   }
      // }).then(res => {
      //   if (res.data.code == 200) {
      //     this.tmplLoad = false;
      //     this.reportData = res.data.data;

      //     this.reportData.forEach((column,index)=>{
      //       column.jsonElement = JSON.parse(column.jsonData);
      //       if (column.elementType == 'Graph') {
      //         this.processGraph(column, column.jsonElement);
      //       }
      //     })

      //   } else {
      //     this.$Message.error(res.data.message);
      //   }
      //});
    },
    processGraph(obj, chartData) {
      let list = new tranfrom(chartData);
      if (list.response.code == 200) {
        obj.chartsOption = list.response.data;
      } else {
      console.log(list.response.message)
      }
    },
    init(){
      let boxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let titleH = this.$refs.title.offsetHeight+52;
      this.conHeight = boxHeight>800?boxHeight-165-titleH:800-165-titleH;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   let boxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //   let titleH = this.$refs.title.offsetHeight+52;
    //   this.conHeight = boxHeight>800?boxHeight-80-titleH:800-80-titleH;
    // })
    //this.getReportDetail();
    //this.typeListChoice = this.typeList[0].id;
  }
};
