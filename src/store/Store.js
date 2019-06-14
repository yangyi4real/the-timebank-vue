/* eslint-disable import/first */
import Vue from 'vue'
import Vuex from 'vuex'
import HTTPData from '../common/HTTPDatas.js'
let httpData = new HTTPData()
import {
  SHOW_PROGRESS,
  HIDE_PROGRESS,
  CHANGE_APPSCROLLTOP,
  SET_USER_INFO,
  HIDE_IFRAME_ALERT,
  SHOW_IFRAME_ALERT,
  SHOW_GLOBAL_LOGIN,
  SHOW_PTPAY_PASSWORD,
  HIDE_PTPAY_PASSWORD,
  SHOW_PTPAY_PASSWORDINPUT,
  HIDE_PTPAY_PASSWORDINPUT,
  SHOW_PTPAY_PASSWORDTEXT,
  HIDE_PTPAY_PASSWORDTEXT,
  SHOW_GLOBAL_REGISTER
} from './MutationTypes'

Vue.use(Vuex)

const state = {
  /**
   * @Description: 是否显示加载进度条
   */
  showProgress: false,
  /**
   * @Description: 页面滚动到顶部的距离
   */
  appScrollTop: 0,
  /**
   * @Description: 当前用户
   */
  user: null,
  /**
   * iframe 弹框
   */
  iframeAlert: {
  },
  /**
   * 全局登录
   */
  showGlobalLogin: false,
  /**
   * 全局注册
   */
  showGlobalRegister: false,
  /**
   * 支付密码弹框
   */
  showPtPayPassword: false,
  /**
   * 支付密码输入框
   */
  showPtPayPasswordInput: false,
  /**
   * 支付密码提示添加
   */
  showPtPayPasswordText: false
}

const mutations = {
  /**
   * @Description: 显示加载进度条
   */
  [SHOW_PROGRESS] (state) {
    state.showProgress = true
  },
  /**
   * @Description: 隐藏加载进度条
   */
  [HIDE_PROGRESS] (state) {
    state.showProgress = false
  },
  /**
   * @Description: 支付密码弹框显示
   */
  [SHOW_PTPAY_PASSWORD] (state) {
    state.showPtPayPassword = true
  },
  /**
   * @Description: 支付密码弹框隐藏
   */
  [HIDE_PTPAY_PASSWORD] (state) {
    state.showPtPayPassword = false
  },
  /**
   * @Description: 支付密码输入框显示
   */
  [SHOW_PTPAY_PASSWORDINPUT] (state) {
    state.showPtPayPasswordInput = true
  },
  /**
   * @Description: 支付密码输入框隐藏
   */
  [HIDE_PTPAY_PASSWORDINPUT] (state) {
    state.showPtPayPasswordInput = false
  },
  /**
   * @Description: 支付密码提示显示
   */
  [SHOW_PTPAY_PASSWORDTEXT] (state) {
    state.showPtPayPasswordText = true
  },
  /**
   * @Description: 支付密码提示隐藏
   */
  [HIDE_PTPAY_PASSWORDTEXT] (state) {
    state.showPtPayPasswordText = false
  },
  /**
   * @Description: 改变页面滚动到顶部的距离
   * @param: value 滚动距离的值
   */
  [CHANGE_APPSCROLLTOP] (state, value) {
    state.appScrollTop = value
  },
  /**
   * @Description: 设置当前用户
   * @param: obj 用户对象
   */
  [SET_USER_INFO] (state, obj) {
    state.user = obj
  },
  /**
   * @Description: 显示iframe弹框
   * @param: obj 用户对象
   */
  [SHOW_IFRAME_ALERT] (state, obj) {
    let url = `${httpData.host}${obj.url}?`
    let arr = obj.params || []
    for (let i = 0; i < arr.length; i++) {
      url += `${arr[i].key}=${arr[i].value}&`
    }
    let screenW = window.screen.width
    let screenH = window.screen.height
    let newWindow = window.open(url, '_blank', `height=${screenH * 0.8}, width=${screenW * 0.8}, top=${screenH * 0.1}, left=${screenW * 0.1}, toolbar=no, menubar=no, scrollbars=yes, resizable=no, status=no, location=no`)
    let loopInterval = setInterval(function () {
      if (newWindow.closed) {
        clearInterval(loopInterval)
        loopInterval = null
        if (obj.didClose) {
          obj.didClose()
        }
      }
    }, 500)
  },
  /**
   * @Description: 隐藏iframe弹框
   * @param: obj 用户对象
   */
  [HIDE_IFRAME_ALERT] (state) {
  },
  /**
   * 显示全局登录
   * @param state
   * @param value
   */
  [SHOW_GLOBAL_LOGIN] (state, value) {
    state.showGlobalLogin = value
  },
  /**
   * 显示全局注册
   * @param state
   * @param value
   */
  [SHOW_GLOBAL_REGISTER] (state, value) {
    state.showGlobalRegister = value
  }
}

const actions = {
  /**
   * @Description: 显示加载进度条
   * @Date: 2018-01-25
   * @作者: 公言山
   * @param: state Vuex默认参数
   * @return: null
   */
  [SHOW_PROGRESS] ({commit}) {
    commit(SHOW_PROGRESS)
  },
  /**
   * @Description: 隐藏加载进度条
   * @Date: 2018-01-25
   * @作者: 公言山
   * @param: state Vuex默认参数
   * @return: null
   */
  [HIDE_PROGRESS] ({commit}) {
    commit(HIDE_PROGRESS)
  },
  /**
   * @Description: 改变页面滚动到顶部的距离
   * @Date: 2018-01-25
   * @作者: 公言山
   * @param: state Vuex默认参数
   * @param: value 滚动距离的值
   * @return: null
   */
  [CHANGE_APPSCROLLTOP] ({commit}, value) {
    commit(CHANGE_APPSCROLLTOP, value)
  },
  /**
   * @Description: 设置用户信息
   * @Date: 2018-01-25
   * @作者: 公言山
   * @param: state Vuex默认参数
   * @param: obj 用户对象
   * @return: null
   */
  [SET_USER_INFO] ({commit}, obj) {
    commit(SET_USER_INFO, obj)
  },
  /**
   * @Description: 显示iframe 弹框
   * @Date: 2018-01-25
   * @作者: 公言山
   * @param: state Vuex默认参数
   * @param: obj 用户对象
   * @return: null
   */
  [SHOW_IFRAME_ALERT] ({commit}, obj) {
    commit(SHOW_IFRAME_ALERT, obj)
  },
  /**
   * @Description: 隐藏iframe 弹框
   * @Date: 2018-01-25
   * @作者: 公言山
   * @param: state Vuex默认参数
   * @param: obj 用户对象
   * @return: null
   */
  [HIDE_IFRAME_ALERT] ({commit}) {
    commit(HIDE_IFRAME_ALERT)
  },
  /**
   * 显示全局登录
   * @param commit
   * @param value
   */
  [SHOW_GLOBAL_LOGIN] ({commit}, value) {
    commit(SHOW_GLOBAL_LOGIN, value)
  },
  /**
   * 显示全局注册
   * @param commit
   * @param value
   */
  [SHOW_GLOBAL_REGISTER] ({commit}, value) {
    commit(SHOW_GLOBAL_REGISTER, value)
  },
  /**
   * 支付密码显示
   * @param commit
   * @param value
   */
  [SHOW_PTPAY_PASSWORD] ({commit}, value) {
    commit(SHOW_PTPAY_PASSWORD, value)
  },
  /**
   * 支付密码隐藏
   * @param commit
   * @param value
   */
  [HIDE_PTPAY_PASSWORD] ({commit}, value) {
    commit(HIDE_PTPAY_PASSWORD, value)
  },
  /**
   * 支付密码输入框显示
   * @param commit
   * @param value
   */
  [SHOW_PTPAY_PASSWORDINPUT] ({commit}, value) {
    commit(SHOW_PTPAY_PASSWORDINPUT, value)
  },
  /**
   * 支付密码输入框隐藏
   * @param commit
   * @param value
   */
  [HIDE_PTPAY_PASSWORDINPUT] ({commit}, value) {
    commit(HIDE_PTPAY_PASSWORDINPUT, value)
  },
  /**
   * 支付密码提示显示
   * @param commit
   * @param value
   */
  [SHOW_PTPAY_PASSWORDTEXT] ({commit}, value) {
    commit(SHOW_PTPAY_PASSWORDTEXT, value)
  },
  /**
   * 支付密码提示隐藏
   * @param commit
   * @param value
   */
  [HIDE_PTPAY_PASSWORDTEXT] ({commit}, value) {
    commit(HIDE_PTPAY_PASSWORDTEXT, value)
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

export default store
