/* eslint-disable no-new-wrappers,quotes,brace-style,no-throw-literal,no-new-object,handle-callback-err,no-unneeded-ternary,no-useless-return */
/**
 * 功能描述：HTTPData.js 项目网络数据
 */
// import axios from 'vue-axios'
import axios from 'axios'
import SaiLeiTool from './SaiLei'
import TipsTools from './TipsTools'
// import UserModel from '../pages/member/UserModel'
import { SHOW_GLOBAL_LOGIN } from '../store/MutationTypes'

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
      this.host = 'https://192.168.1.122:8081'
    }
    this.TipsTools = new TipsTools()
    this.SaiLei = new SaiLeiTool()
    // 请求路径对象
    this.url = {
      // 用户登录/注册
      login: '/time-bank/user/login_or_register'
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
      this.TipsTools.MessageAlert_Error('', '该账号在其他地点登录，请重新登录', (res) => {
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
        this.LibTools.MessageAlert_Error('请先开通支付账户')
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
}

export default HTTPData
