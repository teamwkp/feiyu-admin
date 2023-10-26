import BigNumber from "bignumber.js";

/**
 * @param {*} fn  是我们需要包装的事件回调
 * @param {*} delay 是每次推迟执行的等待时间
 */
export const debounce = function (fn, delay = 1000) {
  let timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.call(this, event), delay);
  };
};

/**
 * 节流函数
 * @param fn 事件触发的操作
 * @param delay 间隔多少毫秒需要触发一次事件
 */
//基本原理
export const throttle = function (fn, delay = 100) {
  let valid = true;
  return function () {
    let context = this;
    let args = arguments;
    if (!valid) {
      return;
    }
    valid = false;
    setTimeout(() => {
      fn.apply(context, args);
      valid = true;
    }, delay);
  };
};

/**
 * 正常金额跟分的转换
 * @param {Number} money 转换数据
 * @param {Boolean} isDivide false 金额转成分 true 分转成金额
 */
export const moneyTransform = (money, isDivide = false) => {
  let newMoney = new BigNumber(money);
  newMoney = isDivide ? newMoney.div(100) : newMoney.times(100);
  return newMoney.toNumber();
};

//时间戳转日期格式
export const dateFormat = function (timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || "Y-m-d";

  if (timestamp.constructor == String && timestamp.indexOf("-") != -1) {
    timestamp = timestamp.replace(/\-/g, "/");
  }

  var zero = function (value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };

  var myDate = timestamp ? new Date(timestamp) : new Date();

  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());

  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/gi, function (matches) {
    let obj = {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second,
    };
    return obj[matches];
  });
};

//日期格式转时间戳
export const getTimeStamp = function (str) {
  var newstr = str.replace(/-/g, "/");
  var date = new Date(newstr);
  var time_str = date.getTime().toString();
  return date.valueOf();
};

// 判断处理0值返回内容
export const filterEmpty = (str, defaultStr = "--") => {
  if (str != undefined && str != null) {
    return str;
  }
  return defaultStr;
};
