import axios from './http';
import {
  REPORT
} from './resetApi';

export function reportDetail() {
  return axios.get(REPORT.report).catch((error) => {
    console.log('error', error);
  });
}
export function reportDetails() {
  return axios.get(REPORT.report).catch((error) => {
    console.log('error', error);
  });
}
