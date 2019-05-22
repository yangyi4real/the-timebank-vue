/* eslint-disable no-new-wrappers,quotes,brace-style,no-throw-literal,no-new-object,handle-callback-err,no-unneeded-ternary,no-useless-return */
/**
 * 功能描述：HTTPData.js 项目网络数据
 */
import axios from 'axios'
import SaiLeiTool from './SaiLei'
import TipsTools from './TipsTools'
import UserModel from '../store/UserModel'
import { SET_USER_INFO, SHOW_GLOBAL_LOGIN } from '../store/MutationTypes'

const PUBLIC = false // 发布状态

let currentVueObj = null
const Axios = axios.create({
  timeout: 1000 * 30,
  withCredentials: false
})

class HTTPData {
  constructor () {
    this.host = ''
    if (PUBLIC) {
      this.host = ''
    } else {
      this.host = 'http://192.168.1.105:8081'
    }
    this.TipsTools = new TipsTools()
    this.SaiLei = new SaiLeiTool()
    // 请求路径对象
    this.url = {
      // 用户登录/注册
      login: '/time-bank/user/login_or_register',
      // 发送短信验证码
      authCode: '/time-bank/user/send_auth_code_web',
      // 基本资料填写
      fillInfo: '/time-bank/user/fill_info',
      // 授权意向
      myClassInfo: '/time-bank/user/my_class_info',
      // 查看讲师当日储存信息(企业)
      dateInfo: '/time-bank/user/date_info',
      // 储存时间
      storeTime: '/time-bank/user/store_time',
      // 设置支付密码
      setPayPassword: '/time-bank/user_account/set_paypassword',
      // 重置支付密码
      resetPayPassword: '/time-bank/user_account/reset_pay_password',
      // 预约(企业)
      appoint: '/time-bank/company/appoint',
      // 讲师认证
      lectureAuth: '/time-bank/user/lecture_auth',
      // 介绍资料填写
      introData: '/time-bank/user/intro_data',
      // 企业资料填写
      companyFillInfo: '/time-bank/company/fill_info',
      // 讲师确认/取消订单
      confirmAppoint: '/time-bank/user/confirm_appoint',
      // 订单列表
      orderList: '/time-bank/user/order_list',
      // 订单详情
      orderDetail: '/time-bank/user/order_detail'
    }
    // 请求拦截
    // 响应拦截
    let _this = this
    Axios.interceptors.response.use(response => {
      if (_this.checkResponseResultCode(response.data, currentVueObj)) {
        return response
      } else {
        if (currentVueObj['isButtonAlert']) {
          return response
        }
      }
    }, error => {
      return Promise.reject(error)
    })
  }
  /**
   * 获取用户登录信息
   */
  // getRequiredParams () {
  //   let newValue = this.SaiLei.cookiesGet('login_info')
  //   return newValue ? newValue : { tokenKey: '0' }
  // }
  /**
   * 设置必选参数
   * @param data
   * @returns {*}
   */
  _setRequiredParams (data) {
    let params = data
    // let tokenObj = this.getRequiredParams()
    params.append('token', '')
    params.append('deviceId', 'PC')
    params.append('loginIp', '')
    params.append('requestFrom', '0')
    params.append('sign', '')
    return params
  }
  /**
   * 登录信息加密
   * @private
   */
  // _ResForLoginMsg (res) {
  //   let data = {}
  //   data.loginId = res.result.loginId
  //   data.tokenKey = res.result.token
  //   this.SaiLei.cookiesSave('login_info', data)
  // }

  /**
   * 清除用户信息
   */
  clearUserInfo () {
    this.SaiLei.cookiesClear('user_info')
    if (currentVueObj) { currentVueObj.$store.dispatch(SET_USER_INFO, null) }
    this.SaiLei.LocalStorageRemove(this.SaiLei.USER_LOGIN_TOKEN_KEY)
  }
  /**
   * 校验响应结果状态码
   * @param res
   * @return {boolean}
   */
  checkResponseResultCode (res, obj) {
    let _this = this
    /**
     * 请求成功
     */
    if (res.code === 0 || res.code === '000') {
      return true
    }
    /**
     * 返回了空白页
     */
    if (res.message && res.message.search('<html>') !== -1) {
      if (!obj['isButtonAlert']) {
        this.TipsTools.MessageAlert_Error('网络错误，请联系管理员')
      }
      return false
    }
    /**
     * 请求参数错误
     */
    if (res.code === 100 || res.code === '100') {
      if (!obj['isButtonAlert']) {
        this.TipsTools.MessageAlert_Error(res.message)
      }
      return false
    }
    /**
     * 登陆超时
     */
    if (res.code === 102 || res.code === '102') {
      if (!obj['isButtonAlert']) {
        this.TipsTools.MessageAlert_Error(res.message)
        this.clearUserInfo()
        obj.$store.dispatch(SHOW_GLOBAL_LOGIN, true)
      }
      return false
    }
    /**
     * 该账号在其他地方登陆
     */
    if (res.code === 103 || res.code === '103') {
      if (window['isShowLoginFormOther']) {
        return false
      }
      window['isShowLoginFormOther'] = true
      this.TipsTools.MessageAlert_Alert('', '该账号在其他地点登录，请重新登录', (res) => {
        _this.clearUserInfo()
        obj.$store.dispatch(SHOW_GLOBAL_LOGIN, true)
      })
      return false
    }
    /**
     * 用户未登录
     */
    if (res.code === 104 || res.code === '104') {
      if (!obj['isButtonAlert']) {
        this.TipsTools.MessageAlert_Error(res.message)
      }
      setTimeout(() => {
        _this.clearUserInfo()
        obj.$store.dispatch(SHOW_GLOBAL_LOGIN, true)
      }, 0)
      return false
    }
    /**
     * 汇付用户不存在
     */
    if (res.code === 49 || res.code === '049') {
      if (!obj['isButtonAlert']) {
        this.TipsTools.MessageAlert_Error('请先开通支付账户')
      }
      return false
    }
    /**
     * 未知异常
     */
    if (res.code === '999' || res.code === 999) {
      if (!obj['isButtonAlert']) {
        this.TipsTools.MessageAlert_Error(res.message)
      }
      return false
    }
    /**
     * 其他错误
     */
    if (!obj['isButtonAlert']) {
      this.TipsTools.MessageAlert_Error(res.message)
    }
    return false
  }
  /**
   * Axios post 请求
   * @param obj 调用该方法所在的 vue 对象
   * @param url 本次请求的路径
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   * @constructor
   */
  POST (obj, url, data, callback) {
    currentVueObj = obj
    // let _this = this
    let params = this._setRequiredParams(data)
    Axios.post(url, params, {}).then(function (response) {
      callback(response.data)
    }).catch(function (e) {
      // _this.$dialog.loading.close('加载中')
    })
  }
  /**
   * 获取短信验证码
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getAuthCode (obj, data, callback) {
    let _this = this
    data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.authCode}`, data, function (res) {
      callback(res)
    })
  }
  /**
   * 登陆/注册
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getLogin (obj, data, callback) {
    let _this = this
    data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.login}`, data, function (res) {
      if (res.code === 0 || res.code === '000') {
        _this.SaiLei.cookiesSave('user_info', res.result)
        _this.SaiLei.cookiesSave('user_id', res.result.id)
        let user = new UserModel(res.result)
        obj.$store.dispatch(SET_USER_INFO, user)
      }
      callback(res)
    })
  }
  /**
   * 基本资料填写
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getFillInfo (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.fillInfo}`, data, function (res) {
      _this.SaiLei.cookiesSave('user_photo', res.result.photo)
      console.log(res.result.photo)
      callback(res)
    })
  }
  /**
   * 授权意向
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getMyClassInfo (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.myClassInfo}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 查看讲师当日储存信息(企业)
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getDateInfo (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.dateInfo}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 储存时间
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getStoreTime (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.storeTime}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 设置支付密码
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getSetPayPassword (obj, data, callback) {
    let _this = this
    _this.POST(obj, `${_this.host}${_this.url.setPayPassword}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 重置支付密码
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getResetPayPassword (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.resetPayPassword}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 预约(企业)
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getAppoint (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.appoint}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 讲师认证
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getLectureAuth (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.lectureAuth}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 介绍资料
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getIntroData (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.introData}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 企业资料
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getCompanyFillInfo (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.companyFillInfo}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 企业资料
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getConfirmAppoint (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.confirmAppoint}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 企业资料
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getOrderList (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.orderList}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
  /**
   * 企业资料
   * @param obj 调用该方法所在的 vue 对象
   * @param data 本次请求的参数
   * @param callback 本次请求的回调
   */
  getOrderDetail (obj, data, callback) {
    let _this = this
    // data.append('tokenId', _this.SaiLei.GetUUID())
    _this.POST(obj, `${_this.host}${_this.url.orderDetail}`, data, function (res) {
      _this.TipsTools.MessageAlert_Success('succcess')
      callback(res)
    })
  }
}

export default HTTPData
