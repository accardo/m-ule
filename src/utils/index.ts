import {decimalPiceType} from "@/assets/js/PropType";

function getParam(data:any) {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value);
    }
    return url ? url.substring(1) : ''
}
function getNewUrl(url:string, data:any) {
    return url += (url.indexOf('?') < 0 ? '?' : '') + getParam(data)
}
// url地址参数获取
function queryValue(key: string): string | null {
    const url = new URL(window.location.href);
    const search = new URLSearchParams(url.search)
    return search.get(key)
}
// 给定 url, 返回一个 window.URL 实例
function parseUrl(url: string){
    if (url.startsWith('//')) {
        url = window.location.protocol + url;
    }
    return new window.URL(url);
}
// 删除url中参数 param 参数名
function removeUrlParam(param: string, url:string = window.location.href):string {
    let obj = parseUrl(url);
    obj.searchParams.delete(param);
    return obj.href;
}
// 价格小数转换 value->转换值，decimal-> 保留几位小数
// integerDecimal -> 整数位+小数位； integer -> 整数位； decimal -> 小数位
function decimalPice(val:number =0, decimal:number =2): decimalPiceType{
    let value:string = val.toString()
    let index = value.indexOf('.')
    if (index !== -1) {
        value = value.substring(0, decimal + index + 1)
    } else {
        value = value.substring(0)
    }
    let convertValue: Array<string> = parseFloat(value).toFixed(decimal).split('.')
    return {
        integerDecimal: `${convertValue[0]}.${convertValue[1].substring(0, decimal)}`,
        integer: convertValue[0],
        decimal: convertValue[1].substring(0, decimal)
    }
}
export {
    getNewUrl,
    queryValue,
    removeUrlParam,
    decimalPice
}