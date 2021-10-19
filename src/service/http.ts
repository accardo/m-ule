import { getNewUrl } from "@/utils";
import fetchJsonp from "fetch-jsonp";
/**
 * Description: 处理config配置文件是否存在
 */
function isConfig(obj:any) {
    let jsonpcallback = "jsoncallback";
    if (Object.prototype.hasOwnProperty.call(obj, 'config')) {
        if ( Object.prototype.hasOwnProperty.call(obj.config, 'jsonpcallback')) {
            jsonpcallback = obj.config.jsonpcallback;
        }
    }
    return {
        jsonpcallback: jsonpcallback,
    };
}
/* 传参格式
*  1）
    http.jsonp({
	    url: URL地址,
	    data: 数据对象
    }).then((xhr) => {
	    返回结果 xhr
    });
*
*  2)
    http.jsonp({
      url: URL地址,
    }).then((xhr) => {
      返回结果 xhr
    });
*
*  3)
http.jsonp({
	url: URL地址,
	data: 数据对象,
	config: {
		jsonpcallback: 自定义callback的 key,
		jsonpValue: 自定义callback的 vaule
	}
}).then((xhr) => {
	返回结果 xhr
});
*/


export function jsonp(obj:any) {
    let query = obj.url; // 没有data
    if (obj.data) {
        query = getNewUrl(obj.url, obj.data);
    }
    const option = Object.assign({}, {
        jsonpCallback: isConfig(obj).jsonpcallback, // 自定义callback的 key
        jsonpCallbackFunction: obj.config && obj.config.jsonpValue || "", // 自定义callback的vaule
        timeout: 300000,
    });
    // 这里返回一个promise对象
    return fetchJsonp(query, option)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          return data;
      })
      .catch(function(err) {

          if(obj.reject){
              return Promise.reject(err);
          }
          //错误请求抛出正常的json结构体
          return {
              returnCode: '-9999',
              returnMessage: err.message
          }
      });
}
/**
 * 自定义jsonpCallback 名称
 */
export function jsonpValue(key: string = 'jsonp'){
    return key + '_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
}