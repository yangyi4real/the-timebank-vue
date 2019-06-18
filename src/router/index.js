import Vue from 'vue'
import Router from 'vue-router'
import SaiLei from '../common/SaiLei'
import Http from '../common/HTTPDatas'
import store from '../store/Store'
import { SHOW_GLOBAL_LOGIN } from '../store/MutationTypes'

Vue.use(Router)

const sailei = new SaiLei()

const router = new Router({
  routes: [
    // 登录
    {
      path: '/',
      name: 'Login',
      component: () => import('../pages/Home/Login')
    },
    // 头部导航
    {
      path: '/navbar',
      name: 'Navbar',
      component: () => import('../views/navbar/navbar')
    },
    // 讲师端-底部导航
    {
      path: '/tabbar',
      name: 'Tabbar',
      component: () => import('../views/Tabbar/Tabbar')
    },
    // 企业端-底部导航
    {
      path: '/Tabbar-ent',
      name: 'TabbarEnt',
      component: () => import('../views/Tabbar/TabbarEnt')
    },
    // 注册
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Home/Register')
    },
    // 支付密码
    {
      path: '/paypassword/:id/:type',
      name: 'PayPassword',
      component: () => import('../pages/Home/PayPassword')
    },
    // 日历
    {
      path: '/calendar/index',
      name: 'CalendarIndex',
      component: () => import('../pages/Lecturer/Calendar/Index')
    },
    // 添加日历
    {
      path: '/calendar/addcalendat',
      name: 'AddCalendar',
      component: () => import('../pages/Lecturer/Calendar/AddCalendar')
    },
    // 注册协议
    {
      path: '/login-agreement',
      name: 'LoginAgreement',
      component: () => import('../pages/Home/Agreement/LoginAgreement')
    },
    // 名词解释
    {
      path: '/calendar/definitions',
      name: 'Definitions',
      component: () => import('../pages/Lecturer/Calendar/Definitions')
    },
    // 约讲记录
    {
      path: '/course/index',
      name: 'CourseIndex',
      component: () => import('../pages/Lecturer/Course/Index')
    },
    // 评价企业
    {
      path: '/course/evaluate/:orderId',
      name: 'CoEvaluate',
      component: () => import('../pages/Lecturer/Course/CoEvaluate')
    },
    // 约讲详情
    {
      path: '/course/aboutdetails/:orderId',
      name: 'AboutDetails',
      component: () => import('../pages/Lecturer/Course/AboutDetails')
    },
    // 我的
    {
      path: '/personal/index',
      name: 'personalIndex',
      component: () => import('../pages/Lecturer/Personal/Index')
    },
    // 个人资料
    {
      path: '/personal/personaldata',
      name: 'PersonalData',
      component: () => import('../pages/Lecturer/Personal/PersonalData')
    },
    // 邀请好友
    {
      path: '/personal/invitation',
      name: 'Invitation',
      component: () => import('../pages/Lecturer/Personal/Invitation')
    },
    // 设置
    {
      path: '/personal/setup/index',
      name: 'SetUp',
      component: () => import('../pages/Lecturer/Personal/SetUp/Index')
    },
    // 绑定新手机
    {
      path: '/personal/setup/newphone',
      name: 'NewPhone',
      component: () => import('../pages/Lecturer/Personal/SetUp/NewPhone')
    },
    // 手机号验证
    {
      path: '/personal/setup/phoneverification',
      name: 'PhoneVerification',
      component: () => import('../pages/Lecturer/Personal/SetUp/PhoneVerification')
    },
    // 支付密码
    {
      path: '/personal/setup/inputpaypassword',
      name: 'InputPayPassword',
      component: () => import('../pages/Lecturer/Personal/SetUp/InputPayPassword')
    },
    // 设置新密码
    {
      path: '/personal/setup/newpaypassword',
      name: 'NewPayPassword',
      component: () => import('../pages/Lecturer/Personal/SetUp/NewPayPassword')
    },
    // 帮助中心
    {
      path: '/personal/setup/help',
      name: 'Help',
      component: () => import('../pages/Lecturer/Personal/SetUp/Help')
    },
    // 服务协议
    {
      path: '/personal/setup/sla',
      name: 'SLA',
      component: () => import('../pages/Lecturer/Personal/SetUp/SLA')
    },
    // 意见反馈
    {
      path: '/personal/setup/feedback',
      name: 'Feedback',
      component: () => import('../pages/Lecturer/Personal/SetUp/Feedback')
    },
    // 基本信息
    {
      path: '/personal/information/basedata',
      name: 'BaseData',
      component: () => import('../pages/Lecturer/Personal/FillInformation/BaseData')
    },
    // 基本信息-显示
    {
      path: '/personal/information/basedata-show',
      name: 'BaseDataShow',
      component: () => import('../pages/Lecturer/Personal/FillInformation/BaseDataShow')
    },
    // 存储意向
    {
      path: '/personal/information/intention',
      name: 'Intention',
      component: () => import('../pages/Lecturer/Personal/FillInformation/Intention')
    },
    // 存储意向-显示
    {
      path: '/personal/information/intention-show',
      name: 'IntentionShow',
      component: () => import('../pages/Lecturer/Personal/FillInformation/IntentionShow')
    },
    // 介绍资料
    {
      path: '/personal/information/profile',
      name: 'Profile',
      component: () => import('../pages/Lecturer/Personal/FillInformation/Profile')
    },
    // 介绍资料-显示
    {
      path: '/personal/information/profile-show',
      name: 'ProfileShow',
      component: () => import('../pages/Lecturer/Personal/FillInformation/ProfileShow')
    },
    // 讲师认证
    {
      path: '/personal/information/authentication',
      name: 'Authentication',
      component: () => import('../pages/Lecturer/Personal/FillInformation/Authentication')
    },
    // 讲师认证-我的
    {
      path: '/personal/information/authentication-center',
      name: 'AuthenticationCenter',
      component: () => import('../pages/Lecturer/Personal/FillInformation/AuthenticationCenter')
    },
    // 讲师支付
    {
      path: '/personal/lecturer-payment/:price/:id',
      name: 'Payment',
      component: () => import('../pages/Lecturer/Personal/lecturerPayment')
    },
    // 企业支付
    {
      path: '/user/enterprise-payment/:price/:id',
      name: 'EnterprisePayment',
      component: () => import('../pages/Enterprise/User/EnterprisePayment')
    },
    // 钱包
    {
      path: '/personal/wallet/index/:balance',
      name: 'WalletIndex',
      component: () => import('../pages/Lecturer/Personal/Wallet/Index')
    },
    // sdg
    {
      path: '/personal/wallet/sdg-index/:sdg',
      name: 'SDGIndex',
      component: () => import('../pages/Lecturer/Personal/Wallet/SDGIndex')
    },
    // 明细
    {
      path: '/personal/wallet/detailed',
      name: 'Detailed',
      component: () => import('../pages/Lecturer/Personal/Wallet/Detailed')
    },
    // 明细详情页
    {
      path: '/personal/wallet/detailedpage',
      name: 'DetailedPage',
      component: () => import('../pages/Lecturer/Personal/Wallet/DetailedPage')
    },
    // 充值
    {
      path: '/personal/wallet/recharge',
      name: 'Recharge',
      component: () => import('../pages/Lecturer/Personal/Wallet/Recharge')
    },
    // 提现
    {
      path: '/personal/wallet/withdraw',
      name: 'Withdraw',
      component: () => import('../pages/Lecturer/Personal/Wallet/Withdraw')
    },
    // 消息
    {
      path: '/personal/msg',
      name: 'Msg',
      component: () => import('../pages/Lecturer/Personal/Msg')
    },
    // // 测试
    // {
    //   path: '/ceshi',
    //   name: 'ceshi',
    //   component: () => import('../pages/Home/Login')
    // },
    // // 测试
    // {
    //   path: '/ceshiSelect',
    //   name: 'ceshiSelect',
    //   component: () => import('../pages/Home/Login')
    // },
    // // 测试
    // {
    //   path: '/selectItem',
    //   name: 'selectItem',
    //   component: () => import('../pages/Home/Login')
    // },
    // 约课
    {
      path: '/customized/index',
      name: 'CustomizedIndex',
      component: () => import('../pages/Enterprise/Customized/Index')
    },
    // 讲师详情
    {
      path: '/customized/details/:id',
      name: 'lecturerDetails',
      component: () => import('../pages/Enterprise/Customized/lecturerDetails')
    },
    // 预约
    {
      path: '/customized/appointment/:id',
      name: 'Appointment',
      component: () => import('../pages/Enterprise/Customized/Appointment')
    },
    // 预约-填写
    {
      path: '/customized/appointmentinput',
      name: 'AppointmentInput',
      component: () => import('../pages/Enterprise/Customized/AppointmentInput')
    },
    // 定制服务
    {
      path: '/reserve/index',
      name: 'ReserveIndex',
      component: () => import('../pages/Enterprise/Reserve/Index')
    },
    // 服务详情
    {
      path: '/reserve/servicedetails',
      name: 'ServiceDetails',
      component: () => import('../pages/Enterprise/Reserve/ServiceDetails')
    },
    // 购买
    {
      path: '/reserve/purchase',
      name: 'Purchase',
      component: () => import('../pages/Enterprise/Reserve/Purchase')
    },
    // 我的
    {
      path: '/user/index',
      name: 'UserIndex',
      component: () => import('../pages/Enterprise/User/Index')
    },
    // 企业信息
    {
      path: '/user/enterpriseInfo',
      name: 'EnterpriseInfo',
      component: () => import('../pages/Enterprise/User/EnterpriseInfo')
    },
    // 企业信息-显示
    {
      path: '/user/enterpriseInfo-show',
      name: 'EnterpriseInfoShow',
      component: () => import('../pages/Enterprise/User/EnterpriseInfoShow')
    },
    // 企业设置
    {
      path: '/user/personalcenter',
      name: 'PersonalCenter',
      component: () => import('../pages/Enterprise/User/PersonalCenter')
    },
    // 全部
    {
      path: '/user/ordercenter',
      name: 'OrderCenter',
      component: () => import('../pages/Enterprise/User/OrderCenter')
    },
    // 待付款
    {
      path: '/user/allorder-payment',
      name: 'AllOrderPayment',
      component: () => import('../pages/Enterprise/User/AllOrderPayment')
    },
    // 待确认
    {
      path: '/user/allorder-confirm',
      name: 'AllOrderConfirm',
      component: () => import('../pages/Enterprise/User/AllOrderConfirm')
    },
    // 待开课
    {
      path: '/user/allorder-class',
      name: 'AllOrderClass',
      component: () => import('../pages/Enterprise/User/AllOrderClass')
    },
    // 待评价
    {
      path: '/user/allorder-evaluate',
      name: 'AllOrderEvaluate',
      component: () => import('../pages/Enterprise/User/AllOrderEvaluate')
    },
    // 售后/退款
    {
      path: '/user/allorder-refund',
      name: 'AllOrderRefund',
      component: () => import('../pages/Enterprise/User/AllOrderRefund')
    },
    // 订单详情
    {
      path: '/user/OrderDetails/:orderId',
      name: 'OrderDetails',
      component: () => import('../pages/Enterprise/User/OrderDetails')
    },
    // 评价讲师
    {
      path: '/user/evaluate/:orderId',
      name: 'Evaluate',
      component: () => import('../pages/Enterprise/User/Evaluate')
    },
    // 企业端-消息
    {
      path: '/user/msg',
      name: 'CoMsg',
      component: () => import('../pages/Enterprise/User/Msg')
    }
  ]
})

Vue.use(Router)

/**
 * 判断是否是指用户必须登录的页面
 * @param route
 * @returns {boolean}
 */
// function checkRouteName (route) {
//   if (route.name === 'Register') {
//     return false
//   } else {
//     return true
//   }
// }

router.beforeEach(function (to, form, next) {
  if (!sailei.cookiesGet('user_loginStatus')) {
    new Http().clearUserInfo()
    store.dispatch(SHOW_GLOBAL_LOGIN, true)
    console.log('111')
  } else if (sailei.cookiesGet('user_loginStatus') === 1) {
    next()
  } else if (sailei.cookiesGet('user_loginStatus') === 2) {
    next()
  }
})

export default router
