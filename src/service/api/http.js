import axios from 'axios';

class HTTP {
  ajax(url = '', parameter = {}, type = 'GET') {
    let promise;
    return new Promise((resolve, reject) => {
      // 判断请求类型
      if (type.toUpperCase() === 'GET') {
        let Url = '';               // 2.2 请求的字符串
        Object.keys(parameter).forEach(key => {       // 遍历拼接参数
          Url += key + '=' + parameter[key] + '&';
        });
        /*
          注意：为了防止请求缓存，在尾部加了时间戳
        */
        if (Url) {
          Url = Url.substr(0, Url.lastIndexOf('&'));
          // 2.5 拼接完整路径
          if(url.indexOf('47.98.157.152') === -1) {
            url += '?' + Url + '&itlike=' + this._randomCode(20);
          }else {
            url += '?' + Url;
          }
        }else {
          if(url.indexOf('47.98.157.152') === -1){
            url += '?itlike=' + this._randomCode(20)
          }
        }
        promise = axios.get(url);   // 2.6 发起get请求
      } else if (type.toUpperCase() === 'POST') {
        promise = axios.post(url, parameter);      // 2.7 发起post请求
      }
      // axios请求返回的是一个promise对象
      promise.then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // 原先没有加入时间戳的  拼接请求数据的字符串 函数
  // _getGteUrl(url, parameter) {
  //   //   // 拼接请求数据的字符串
  //   //   let parameterStr = '';
  //   //   Object.keys(parameter).forEach((key) => {
  //   //     parameterStr += `${key}=${parameterStr[key]}&`
  //   //   });
  //   //   if (parameterStr) { // 最后一个数据会多一个 “&” 符号
  //   //     parameterStr = parameterStr.substr(0, parameterStr.lastIndexOf('&'))
  //   //   }
  //   //   // 返回完整的请求路径
  //   //   return url += `?${parameterStr}`;
  //   // }
  /*生成指定长度的随机数*/
  _randomCode(length) {
    let chars = ['0','1','2','3','4','5','6','7','8','9'];
    let result = "";
    for(let i = 0; i < length ; i ++) {
      let index = Math.ceil(Math.random()*9);
      result += chars[index];
    }
    return result;
  }
}
export {HTTP}
// function getGteUrl(url, parameter) {
//   // 拼接请求数据的字符串
//   let parameterStr = '';
//   Object.keys(parameter).forEach((key) => {
//     parameterStr += `${key}=${parameterStr[key]}&`
//   });
//   if (parameterStr) { // 最后一个数据会多一个 “&” 符号
//     parameterStr = parameterStr.substr(0, parameterStr.lastIndexOf('&'))
//   }
//   // 返回完整的请求路径
//   return url += `?${parameterStr}`;
// }

/*
  url 路径
  parameter{
    name: 'xxx',
    age: 'xxx"
  }
  type  请求的方式
*/
// export default function ajax(url = '', parameter = {}, type = 'GET') {
//   let promise;
//   return new Promise((resolve, reject) => {
//     // 判断请求类型
//     if (type.toUpperCase() === 'GET') {
//       let Url = '';
//       if (parameter){         // 如果有传参数  那么久调用getGteUrl方法获取完整的请求路径
//         Url = getGteUrl(url, parameter);
//       }
//       // 发起get请求
//       promise = axios.get(Url);
//     } else if (type.toUpperCase() === 'POST') {
//       promise = axios.post(url, parameter)
//     }
//     // axios请求返回的是一个promise对象
//     promise.then(res => {
//       resolve(res.data)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }