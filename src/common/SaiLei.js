/* eslint-disable no-unused-lets,eol-last,no-useless-escape,import/first */
const USER_LOGIN_SESSION_KEY = 'USER_LOGIN_SESSION_KEY'
const USER_LOGIN_TOKEN_KEY = 'USER_LOGIN_TOKEN_KEY'
const USER_LOGIN_LOGINID_KEY = 'USER_LOGIN_LOGINID_KEY'
const USER_LOGIN_SERVATION_KEY = 'USER_LOGIN_SERVATION_KEY'
var crypto = require('crypto')

/**
 * AES加密
 * @param data
 * @param key
 * @return {*}
 * @private
 */
function _aesEncrypt (data, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key)
  var crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

/**
 * AES解密
 * @param encrypted
 * @param key
 * @return {*}
 * @private
 */
function _aesDecrypt (encrypted, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key)
  var decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
/* ==================================================== 数据持久化 ================================================================== */
/**
 * @name 当前浏览器是否支持 Storage
 * @return {boolean}
 */
let _canUseStorage = function () {
  if (typeof (Storage) !== 'undefined') {
    return true
  } else {
    console.log('该浏览器不支持web 存储')
    return false
  }
}
/**
 * @name  本地取值 LocalStorage
 * @param  key 键
 * @return {boolean || value}
 */
let LocalStorageGet = function (key) {
  if (_canUseStorage()) {
    return localStorage.getItem(key)
  }
  return false
}
/**
 * @name 本地存值 LocalStorage
 * @param key 键
 * @param value 值
 * @return {boolean}
 */
let LocalStorageSet = function (key, value) {
  if (_canUseStorage()) {
    localStorage.setItem(key, value)
    return true
  }
  return false
}
/**
 * @name 移除一条本地数据 LocalStorage
 * @param key 键
 * @return {boolean}
 */
let LocalStorageRemove = function (key) {
  if (_canUseStorage()) {
    localStorage.removeItem(key)
    return true
  }
  return false
}
/**
 * @name 清楚所有本地数据 LocalStorage
 * @return {boolean}
 */
let LocalStorageClearAll = function () {
  if (_canUseStorage()) {
    localStorage.clear()
    return true
  }
  return false
}
/**
 * @name 本地保存对象
 * @param key 键
 * @param obj 对象
 * @return {boolean}
 */
let LocalStorageObjectSave = function (key, obj) {
  if (_canUseStorage()) {
    let string = JSON.stringify(obj)
    localStorage.setItem(key, string)
    return true
  }
  return false
}
/**
 * @name 本地获取对象
 * @param key 键
 * @return {object}
 */
let LocalStorageObjectGet = function (key) {
  if (_canUseStorage()) {
    let string = localStorage.getItem(key)
    return JSON.parse(string)
  }
  return false
}
/**
 * @name   本地取值 SessionStorage
 * @param  key 键
 * @return {boolean || value}
 */
let SessionStorageGet = function (key) {
  if (_canUseStorage()) {
    return sessionStorage.getItem(key)
  }
  return false
}
/**
 * @name 本地存值 SessionStorage
 * @param key 键
 * @param value 值
 * @return {boolean}
 */
let SessionStorageSet = function (key, value) {
  if (typeof (Storage) !== 'undefined') {
    sessionStorage.setItem(key, value)
    return true
  }
  return false
}
/**
 * @name 移除一条本地数据 SessionStorage
 * @param key 键
 * @return {boolean}
 */
let SessionStorageRemove = function (key) {
  if (_canUseStorage()) {
    sessionStorage.removeItem(key)
    return true
  }
  return false
}
/**
 * @name 清楚所有本地数据 SessionStorage
 * @return {boolean}
 */
let SessionStorageClearAll = function () {
  if (_canUseStorage()) {
    sessionStorage.clear()
    return true
  }
  return false
}
/**
 * @name 本地保存对象
 * @param key 键
 * @param obj 对象
 * @return {boolean}
 */
let SessionStorageObjectSave = function (key, obj) {
  if (_canUseStorage()) {
    let string = JSON.stringify(obj)
    sessionStorage.setItem(key, string)
    return true
  }
  return false
}
/**
 * @name 本地获取对象
 * @param key 键
 * @return {object}
 */
let SessionStorageObjectGet = function (key) {
  if (_canUseStorage()) {
    let string = sessionStorage.getItem(key)
    return JSON.parse(string)
  }
  return false
}
/* ==================================================== 浏览器识别 ============================================================================= */
/**
 * @name 当前浏览器名称
 * @return {string}
 */
let BrowserName = function () {
  let userAgent = navigator.userAgent
  // 判断是否Opera浏览器: 暂时存在问题，Opera判断出来的结果是 Chrome
  if (userAgent.indexOf('Opera') > -1) {
    return 'Opera'
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox'
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return 'IE'
  }
}
/* ========================================================== 平台判断 =============================================================================== */
/**
 * @name 是否是 PC
 * @return {boolean}
 */
let _isPc = function () {
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
/**
 * @name 操作系统名称
 * @return {string}
 */
let OsName = function () {
  if (_isPc()) {
    return 'PC'
  }
  let u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    return 'Android'
  } else if (u.indexOf('iPhone') > -1) {
    return 'iOS'
  } else if (u.indexOf('iPad') > -1) {
    return 'iPad'
  } else if (u.indexOf('Windows Phone') > -1) {
    return 'WP'
  } else if (u.toLowerCase().indexOf('micromessenger') !== -1) {
    return 'Weixin'
  }
}
/* ========================================================= 保留两位小数 ============================================================================= */
/**
 * @name 保留两位小数 并四舍五入
 * @param value 值
 * @return {number}
 */
let FloatToFixedY = function (value) {
  return value.toFixed(2)
}
/**
 * @name 保留两位小数 不四舍五入
 * @param value 值
 * @return {number}
 */
let FloatToFixedN = function (value) {
  return Math.floor(value * 100) / 100
}
/* ============================================================== 号码校验 ================================================================================ */
/**
 * @name 是否是手机号
 * @param number 号码
 * @return {boolean}
 */
let IsPhoneNumber = function (number) {
  let length = number.length
  if (length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(number)) {
    return true
  } else {
    return false
  }
}
/**
 * @name 是否是邮箱号码
 * @param number 号码
 * @return {boolean}
 */
let IsEmailNumber = function (number) {
  if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(number)) {
    return true
  } else {
    return false
  }
}
/**
 * 获取 UUID
 * @returns {string}
 * @constructor
 */
let uuid = null
let GetUUID = function () {
  if (!uuid) {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    uuid = s.join('')
  }
  return uuid
}
let AES_ENCODE = function (data, key) {
  return _aesEncrypt(data, key)
}
let AES_DECODE = function (data, key) {
  return _aesDecrypt(data, key)
}
/**
 * 验证 6 到 16 位 数字字母密码组合
 * @param value
 * @return {boolean}
 * @constructor
 */
let CheckPassword = function (value) {
  let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  if (pwdReg.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * 验证 6 位 数字字母密码组合
 * @param value
 * @return {boolean}
 * @constructor
 */
let CheckPasswordSix = function (value) {
  let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6}$/
  if (pwdReg.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * 根据时间戳转日期格式
 * @param value
 * @return {string}
 * @constructor
 */
let GetDateStringForTime = function (value) {
  let date = new Date()
  date.setTime(value)
  return date.toLocaleString()
}
/**
 * 根据时间字符串转日期格式
 * @param string
 * @return {string}
 * @constructor
 */
let GetDateStringForTimeString = function (string) {
  let value = Date.parse(new Date(string))
  let date = new Date()
  date.setTime(value)
  return date.toLocaleDateString()
}
/**
 * 获取地理位置信息
 * @param callback
 * @constructor
 */
const GetGeoLocation = function (callback) {
}
export default {
  USER_LOGIN_SESSION_KEY,
  USER_LOGIN_TOKEN_KEY,
  USER_LOGIN_SERVATION_KEY,
  USER_LOGIN_LOGINID_KEY,
  LocalStorageGet,
  LocalStorageSet,
  LocalStorageRemove,
  LocalStorageClearAll,
  LocalStorageObjectSave,
  LocalStorageObjectGet,
  SessionStorageGet,
  SessionStorageSet,
  SessionStorageRemove,
  SessionStorageClearAll,
  SessionStorageObjectSave,
  SessionStorageObjectGet,
  BrowserName,
  OsName,
  FloatToFixedY,
  FloatToFixedN,
  IsPhoneNumber,
  IsEmailNumber,
  GetUUID,
  GetGeoLocation,
  AES_ENCODE,
  AES_DECODE,
  CheckPassword,
  CheckPasswordSix,
  GetDateStringForTime,
  GetDateStringForTimeString
}
