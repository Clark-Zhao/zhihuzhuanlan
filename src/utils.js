export default {

  // 格式化时间 time可以是时间戳(Number)或者Date
  getLocalTime: function(time) {
    const publishedTime = new Date(time)
    const year = publishedTime.getFullYear()
    const month = ((publishedTime.getMonth() + 1) < 10) ? ('0' + (publishedTime.getMonth() + 1)) : (publishedTime.getMonth() + 1)
    const date = (publishedTime.getDate() < 10) ? ('0' + publishedTime.getDate()) : publishedTime.getDate()
    const hour = (publishedTime.getHours() < 10) ? ('0' + publishedTime.getHours()) : publishedTime.getHours()
    const min = (publishedTime.getMinutes() < 10) ? ('0' + publishedTime.getMinutes()) : publishedTime.getMinutes()
    const sec = (publishedTime.getSeconds() < 10) ? ('0' + publishedTime.getSeconds()) : publishedTime.getSeconds()
    return (year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec);
  },

  // 返回需要长度的字符串（汉字算两个字符）
  getRealStr: function(str, len) {
    let arr = []  // 储存需要的字符
    let realStrLen = 0  // 计算字符串真实长度（汉字算两个字符）
    const reg = /[\u4e00-\u9fa5]/   // 匹配汉字的正则表达式

    for (var i = 0; i < str.length; i++) {
      if (reg.test(str[i])) {
        realStrLen = realStrLen + 2
      } else {
        realStrLen++
      }

      if (realStrLen > len) {
        break
      } else {
        arr.push(str[i])
      }
    }

    return arr.join('')
  },

  // 存cookie
  setCookie: function(key, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = key + "="+  escape(value) + ";expires=" + exp.toGMTString();
  },

  // 取cookie中的值
  getCookie: function(key) {
    var arr,reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },

};
