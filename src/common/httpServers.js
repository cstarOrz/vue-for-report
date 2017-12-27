import axios from './http';
import {
  REPORT
} from './resetApi';

export function reportDetail(testeeId,groupReserveId) {
  return axios.get(REPORT.report,{
    params:{
      orgUniqueId:testeeId,
      groupReserveId:groupReserveId
    }
  }).catch((error) => {
    console.log('error', error);
  });
}
export function reportDetails(testeeId,groupReserveId,sectionId) {
  return axios.get(REPORT.reportCon,{
    params:{
      orgUniqueId:testeeId,
      sectionId:sectionId,
      groupReserveId:groupReserveId
    }
  }).catch((error) => {
    console.log('error', error);
  });
}
