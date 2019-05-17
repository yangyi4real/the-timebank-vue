/* eslint-disable no-unused-lets,eol-last,no-useless-escape,import/first */
import Cookies from 'js-cookie'
var crypto = require('crypto')
class SaiLei {
  constructor () {
    this.uuid = null
    this.USER_LOGIN_SESSION_KEY = 'USER_LOGIN_SESSION_KEY'
    this.USER_LOGIN_TOKEN_KEY = 'USER_LOGIN_TOKEN_KEY'
    this.USER_LOGIN_SERVATION_KEY = 'USER_LOGIN_SERVATION_KEY'
  }
  /**
   * AES加密
   * @param data
   * @param key
   * @return {*}
   * @private
   */
  _aesEncrypt (data, key) {
    let cipher = crypto.createCipher('aes-256-cbc', key)
    let crypted = cipher.update(data, 'utf8', 'hex')
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
  _aesDecrypt (encrypted, key) {
    let decipher = crypto.createDecipher('aes-256-cbc', key)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
  /* ==================================================== 数据持久化 ================================================================== */
  /**
   * @name 当前浏览器是否支持 Storage
   * @return {boolean}
   */
  _canUseStorage () {
    if (typeof (Storage) !== 'undefined') {
      return true
    } else {
      // console.log('该浏览器不支持web 存储')
      return false
    }
  }
  /**
   * @name  本地取值 LocalStorage
   * @param  key 键
   * @return {boolean || value}
   */
  LocalStorageGet (key) {
    if (this._canUseStorage()) {
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
  LocalStorageSet (key, value) {
    if (this._canUseStorage()) {
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
  LocalStorageRemove (key) {
    if (this._canUseStorage()) {
      localStorage.removeItem(key)
      return true
    }
    return false
  }
  /**
   * @name 清楚所有本地数据 LocalStorage
   * @return {boolean}
   */
  LocalStorageClearAll () {
    if (this._canUseStorage()) {
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
  LocalStorageObjectSave (key, obj) {
    if (this._canUseStorage()) {
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
  LocalStorageObjectGet (key) {
    if (this._canUseStorage()) {
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
  SessionStorageGet (key) {
    if (this._canUseStorage()) {
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
  SessionStorageSet (key, value) {
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
  SessionStorageRemove (key) {
    if (this._canUseStorage()) {
      sessionStorage.removeItem(key)
      return true
    }
    return false
  }
  /**
   * @name 清楚所有本地数据 SessionStorage
   * @return {boolean}
   */
  SessionStorageClearAll () {
    if (this._canUseStorage()) {
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
  SessionStorageObjectSave (key, obj) {
    if (this._canUseStorage()) {
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
  SessionStorageObjectGet (key) {
    if (this._canUseStorage()) {
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
  BrowserName () {
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
  _isPc () {
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
  OsName () {
    if (this._isPc()) {
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
  FloatToFixedY (value) {
    return value.toFixed(2)
  }
  /**
   * @name 保留两位小数 不四舍五入
   * @param value 值
   * @return {number}
   */
  FloatToFixedN (value) {
    return Math.floor(value * 100) / 100
  }
  /* ============================================================== 号码校验 ================================================================================ */
  /**
   * @name 是否为数字
   * @param number 号码
   * @return {boolean}
   */
  IsNumber (number) {
    if (/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(number) || /^\d+(\.\d+)?$/.test(number)) {
      return true
    } else {
      return false
    }
  }
  /**
   * @name 是否是手机号
   * @param number 号码
   * @return {boolean}
   */
  IsPhoneNumber (number) {
    let length = number.length
    if (length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(16[0-9]{1})|(12[0-9]{1})|(11[0-9]{1}))+\d{8})$/.test(number)) {
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
  IsEmailNumber (number) {
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
  GetUUID () {
    if (!this.uuid) {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      this.uuid = s.join('')
    }
    return this.uuid
  }
  AES_ENCODE (data, key) {
    return this._aesEncrypt(data, key)
  }
  AES_DECODE (data, key) {
    return this._aesDecrypt(data, key)
  }
  /**
   * 验证 6 到 16 位 数字字母密码组合
   * @param value
   * @return {boolean}
   * @constructor
   */
  CheckPassword (value) {
    let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
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
  GetDateStringForTime (value) {
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
  GetDateStringForTimeString (string) {
    let value = Date.parse(new Date(string))
    let date = new Date()
    date.setTime(value)
    return date.toLocaleDateString()
  }

  /**
   * 金额格式化块会计计数法
   * @param string
   * @return {string}
   * @constructor
   */
  GetAmountToString (string) {
    let str = (parseFloat(string)).toFixed(2) + ''
    let intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',')
    let dot = str.substring(str.length, str.indexOf('.'))
    let res = intSum + dot
    return res
  }
  /**
   * 获取地理位置信息
   * @param callback
   * @constructor
   */
  GetGeoLocation (callback) {
  }
  /**
   * vue 页面滚动动画 （用来给document scrollTop/scrollLeft/scrollBottom/scrollRight 的变化添加过渡效果）
   * @param options
   */
  vueScrollAniamtion (options) {
    if (!options.who) {
      console.error('function vueScrollAniamtion: who 参数不能为空')
      return
    }
    if (!options.property) {
      console.error('function vueScrollAniamtion: property 参数不能为空')
      return
    }
    let who = options.who
    let property = options.property
    let from = options.from || 0
    let to = options.to || 0
    let allTime = options.transition || 300
    let end = options.end || function () {}
    let time = 20
    let value = (to - from) / allTime * time
    let interval = setInterval(() => {
      if (allTime <= 0) {
        clearInterval(interval)
        end()
        return
      }
      who[property] += value
      allTime -= time
    }, time)
  }
  cookiesSave (key, obj) {
    Cookies.set(key, obj)
  }
  cookiesGet (key) {
    if (Cookies.get(key)) {
      return JSON.parse(Cookies.get(key))
    } else {
      return false
    }
  }
  cookiesClear (key) {
    Cookies.remove(key)
  }
}
export default SaiLei
