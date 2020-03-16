//  Zoo v0.0.1

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Z = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _isPlaceholder(a) {
    return a != null && _typeof(a) === 'object' && a['@@functional/placeholder'] === true;
  }

  /**
   * Optimized internal one-arity curry function.
   *
   * @private
   * @category Function
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */

  function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }

  /**
   * Optimized internal two-arity curry function.
   *
   * @private
   * @category Function
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */

  function _curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;

        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
            return fn(a, _b);
          });

        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
            return fn(_a, b);
          }) : _isPlaceholder(b) ? _curry1(function (_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  }

  var rules = {
    /*
     * 数字相关
     */
    //正数（可含小数、0）
    posiNum: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
    //正整数
    posiInt: /^[1-9]\d*$/,
    //0或正整数
    posiInt0: /^(0|[1-9][0-9]*)$/,
    //2位的数字
    numLen2: /^[0-9]{2}$/,
    // 2-3位的数字：
    numLen2or3: /^\d{1,3}$/,
    // 非零开头的最多带两位小数的正数：
    posiFloat2: /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/,
    // 带1-2位小数的正数或负数：
    float1or2: /^(\-)?\d+(.\d{1,2})?$/,
    // 非零的负整数：
    negativeInt: /^-[1-9]\d*$/,
    // 负数或0：
    negative0: /^-[1-9]\d*|0$/,
    // 负整数或0：
    negativeInt0: /^(-[1-9]\d*|0)$/,
    // 负浮点数：
    negativeFloat: /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/,
    // 正浮点数：
    posiFloat: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/,
    // 浮点数：
    float: /^(-?\d+)(\.\d+)?$/,

    /*
     * 字符相关
     */
    // 英文和数字：
    numEn: /^[A-Za-z0-9]+$/,
    // 长度为2-4的所有字符：
    en2to4: /^.{2,4}$/,
    // 英文字母：
    En: /^[A-Za-z]+$/,
    // 大写英文字母：
    EN: /^[A-Z]+$/,
    // 小写英文字母：
    en: /^[a-z]+$/,
    // 小写英文字母：
    cn: /^[\u4E00-\u9FA5A]+$/,
    // 数字、字母、下划线
    numEn_: /^\w+$/,
    // 中文、英文、数字、下划线：
    numEnCn_: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
    // 中文、英文、数字：
    numEnCn: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
    // 含有^%&',;=?$\”等字符：
    illegal: /[^%&',;=?$\x22]+/,
    // Email地址：
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // 护照：
    passport: /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/,
    // 手机号码：
    mobile: /^1[34578]\d{9}$/,
    // 座机号码:
    telephone: /0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/,
    // 座机或手机号:
    teleMobile: /^((0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9})|(1[34578]\d{9}))$/,
    // 身份证号(15位、18位数字)：
    idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    // 日期： 2017-1-1或2017/1/1
    date: /^\d{4}(-|\/)\d{1,2}(-|\/)\d{1,2}$/,
    // 时间： 10:00:00
    time: /^([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d$/,
    // 日期+时间： 2017-1-1 10:00:00
    datetime: /^\d{4}(-|\/)\d{1,2}(-|\/)\d{1,2}\s([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d$/,
    // 一年的12个月(01～09和1～12)：
    month: /^(0?[1-9]|1[0-2])$/,
    // 一个月的31天(01～09和1～31)：
    day: /^((0?[1-9])|((1|2)[0-9])|30|31)$/,
    //腾讯QQ号：
    qq: /[1-9][0-9]{4,}/,
    //中国邮政编码：
    postcode: /[1-9]\d{5}(?!\d)/,
    //IP地址：
    ip: /\d+\.\d+\.\d+\.\d+/,
    //域名：
    url: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*/,
    //域名(http开头):
    urlHttp: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
    // 车牌:
    licencePlate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    //银行卡：
    bankCardNum: /^([1-9]{1})(\d{15}|\d{18})$/
  };

  var regs = _curry2(function (rule, value) {
    return rules[rule] && rules[rule].test(value);
  });

  exports.validate = regs;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
