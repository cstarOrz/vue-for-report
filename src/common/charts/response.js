// 通用响应
export default class Response {
  code = 200;
  data = '';
  message = 'ok';
  result = true;
  setResponse(code, result, message, data = '') {
    this.setCode(code);
    this.setResult(result);
    this.setMessage(message);
    this.setData(data);
  }
  setCode(code) {
    this.code = code || this.code;
  }
  setResult(result) {
    this.result = result || this.result;
  }
  setMessage(message) {
    this.message = message || this.message;
  }
  setData(data) {
    this.data = data || this.data;
  }
}
