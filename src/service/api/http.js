import axios from 'axios';

class HTTP {
  ajax(url = '', parameter = {}, type = 'GET') {
    let promise;
    return new Promise((resolve, reject) => {
      // 判断请求类型
      if (type.toUpperCase() === 'GET') {
        let Url = '';
        if (parameter){         // 如果有传参数  那么久调用getGteUrl方法获取完整的请求路径
          Url = this._getGteUrl(url, parameter);
        }
        // 发起get请求
        promise = axios.get(Url);
      } else if (type.toUpperCase() === 'POST') {
        promise = axios.post(url, parameter)
      }
      // axios请求返回的是一个promise对象
      promise.then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
  _getGteUrl(url, parameter) {
    // 拼接请求数据的字符串
    let parameterStr = '';
    Object.keys(parameter).forEach((key) => {
      parameterStr += `${key}=${parameterStr[key]}&`
    });
    if (parameterStr) { // 最后一个数据会多一个 “&” 符号
      parameterStr = parameterStr.substr(0, parameterStr.lastIndexOf('&'))
    }
    // 返回完整的请求路径
    return url += `?${parameterStr}`;
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