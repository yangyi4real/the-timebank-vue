import Vue from 'vue'
import Router from 'vue-router'

import CalendarIndex from '../pages/Lecturer/Calendar/Index' // 日历
import AddCalendar from '../pages/Lecturer/Calendar/AddCalendar' // 添加日历
import ceshi from '../pages/Lecturer/Calendar/ceshi' // 测试
import ceshiSelect from '../pages/Home/ceshiSelect'
import LoginAgreement from '../pages/Home/Agreement/LoginAgreement' // 注册协议
import selectItem from '../pages/Home/selectItem'
import Definitions from '../pages/Lecturer/Calendar/Definitions' // 名词解释
import CourseIndex from '../pages/Lecturer/Course/Index' // 约讲记录
import CoEvaluate from '../pages/Lecturer/Course/CoEvaluate' // 评价企业
import AboutDetails from '../pages/Lecturer/Course/AboutDetails' // 约讲详情
import PersonalIndex from '../pages/Lecturer/Personal/Index' // 我的
import PersonalData from '../pages/Lecturer/Personal/PersonalData' // 个人资料
import BaseData from '../pages/Lecturer/Personal/FillInformation/BaseData' // 基本信息
import BaseDataShow from '../pages/Lecturer/Personal/FillInformation/BaseDataShow' // 基本信息-显示
import Intention from '../pages/Lecturer/Personal/FillInformation/Intention' // 存储意向
import IntentionShow from '../pages/Lecturer/Personal/FillInformation/IntentionShow' // 存储意向
import Profile from '../pages/Lecturer/Personal/FillInformation/Profile' // 介绍资料
import ProfileShow from '../pages/Lecturer/Personal/FillInformation/ProfileShow' // 介绍资料
import Authentication from '../pages/Lecturer/Personal/FillInformation/Authentication' // 讲师认证
import AuthenticationCenter from '../pages/Lecturer/Personal/FillInformation/AuthenticationCenter' // 讲师认证
import Payment from '../pages/Lecturer/Personal/Payment' // 支付
import WalletIndex from '../pages/Lecturer/Personal/Wallet/Index' // 钱包
import SDGIndex from '../pages/Lecturer/Personal/Wallet/SDGIndex' // 钱包
import Detailed from '../pages/Lecturer/Personal/Wallet/Detailed' // 明细
import DetailedPage from '../pages/Lecturer/Personal/Wallet/DetailedPage' // 明细详情页
import Recharge from '../pages/Lecturer/Personal/Wallet/Recharge' // 充值
import Withdraw from '../pages/Lecturer/Personal/Wallet/Withdraw' // 提现
import Invitation from '../pages/Lecturer/Personal/Invitation' // 邀请好友
import SetUp from '../pages/Lecturer/Personal/SetUp/Index' // 设置
import NewPhone from '../pages/Lecturer/Personal/SetUp/NewPhone' // 绑定新手机
import PhoneVerification from '../pages/Lecturer/Personal/SetUp/PhoneVerification' // 手机号验证
import InputPayPassword from '../pages/Lecturer/Personal/SetUp/InputPayPassword' // 支付密码
import NewPayPassword from '../pages/Lecturer/Personal/SetUp/NewPayPassword' // 设置新密码
import Help from '../pages/Lecturer/Personal/SetUp/Help' // 帮助中心
import SLA from '../pages/Lecturer/Personal/SetUp/SLA' // 服务协议
import Feedback from '../pages/Lecturer/Personal/SetUp/Feedback' // 意见反馈
import Msg from '../pages/Lecturer/Personal/Msg' // 消息

import Home from '../pages/Home/Index.vue' // 进入页
import Login from '../pages/Home/Login' // 登录
import Register from '../pages/Home/Register' // 注册
import PayPassword from '../pages/Home/PayPassword' // 支付密码
import Navbar from '../views/navbar/navbar' // 头部导航
import Tabbar from '../views/Tabbar/Tabbar' // 讲师端-底部导航
import TabbarEnt from '../views/Tabbar/TabbarEnt' // 企业端-底部导航

import CustomizedIndex from '../pages/Enterprise/Customized/Index' // 约课
import lecturerDetails from '../pages/Enterprise/Customized/lecturerDetails' // 讲师详情
import Appointment from '../pages/Enterprise/Customized/Appointment' // 预约
import AppointmentInput from '../pages/Enterprise/Customized/AppointmentInput' // 预约-填写
import ReserveIndex from '../pages/Enterprise/Reserve/Index' // 定制服务
import ServiceDetails from '../pages/Enterprise/Reserve/ServiceDetails' // 服务详情
import Purchase from '../pages/Enterprise/Reserve/Purchase' // 购买
import UserIndex from '../pages/Enterprise/User/Index' // 企业端-我的
import EnterpriseInfo from '../pages/Enterprise/User/EnterpriseInfo' // 企业信息
import PersonalCenter from '../pages/Enterprise/User/PersonalCenter' // 个人中心
import OrderCenter from '../pages/Enterprise/User/OrderCenter' // 订单中心
import AllOrder from '../pages/Enterprise/User/AllOrder' // 全部订单
import OrderDetails from '../pages/Enterprise/User/OrderDetails' // 订单详情
import Evaluate from '../pages/Enterprise/User/Evaluate' // 评价讲师
import CoMsg from '../pages/Enterprise/User/Msg' // 企业端-消息

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // 头部导航
    {
      path: '/navbar',
      name: 'Navbar',
      component: Navbar
    },
    // 讲师端-底部导航
    {
      path: '/tabbar',
      name: 'Tabbar',
      component: Tabbar
    },
    // 企业端-底部导航
    {
      path: '/Tabbar-ent',
      name: 'TabbarEnt',
      component: TabbarEnt
    },
    // 登录
    {
      path: '/login/:userType',
      name: 'Login',
      component: Login
    },
    // 注册
    {
      path: '/register/:userType',
      name: 'Register',
      component: Register
    },
    // 支付密码
    {
      path: '/paypassword/:id',
      name: 'PayPassword',
      component: PayPassword
    },
    // 日历
    {
      path: '/calendar/index',
      name: 'CalendarIndex',
      component: CalendarIndex
    },
    // 添加日历
    {
      path: '/calendar/addcalendat',
      name: 'AddCalendar',
      component: AddCalendar
    },
    // 注册协议
    {
      path: '/login-agreement',
      name: 'LoginAgreement',
      component: LoginAgreement
    },
    // 名词解释
    {
      path: '/calendar/definitions',
      name: 'Definitions',
      component: Definitions
    },
    // 约讲记录
    {
      path: '/course/index',
      name: 'CourseIndex',
      component: CourseIndex
    },
    // 评价企业
    {
      path: '/course/evaluate/:orderId',
      name: 'CoEvaluate',
      component: CoEvaluate
    },
    // 约讲详情
    {
      path: '/course/aboutdetails/:orderId',
      name: 'AboutDetails',
      component: AboutDetails
    },
    // 我的
    {
      path: '/personal/index',
      name: 'personalIndex',
      component: PersonalIndex
    },
    // 个人资料
    {
      path: '/personal/personaldata',
      name: 'PersonalData',
      component: PersonalData
    },
    // 邀请好友
    {
      path: '/personal/invitation',
      name: 'Invitation',
      component: Invitation
    },
    // 设置
    {
      path: '/personal/setup/index',
      name: 'SetUp',
      component: SetUp
    },
    // 绑定新手机
    {
      path: '/personal/setup/newphone',
      name: 'NewPhone',
      component: NewPhone
    },
    // 手机号验证
    {
      path: '/personal/setup/phoneverification',
      name: 'PhoneVerification',
      component: PhoneVerification
    },
    // 支付密码
    {
      path: '/personal/setup/inputpaypassword',
      name: 'InputPayPassword',
      component: InputPayPassword
    },
    // 设置新密码
    {
      path: '/personal/setup/newpaypassword',
      name: 'NewPayPassword',
      component: NewPayPassword
    },
    // 帮助中心
    {
      path: '/personal/setup/help',
      name: 'Help',
      component: Help
    },
    // 服务协议
    {
      path: '/personal/setup/sla',
      name: 'SLA',
      component: SLA
    },
    // 意见反馈
    {
      path: '/personal/setup/feedback',
      name: 'Feedback',
      component: Feedback
    },
    // 基本信息
    {
      path: '/personal/information/basedata',
      name: 'BaseData',
      component: BaseData
    },
    // 基本信息-显示
    {
      path: '/personal/information/basedata-show',
      name: 'BaseDataShow',
      component: BaseDataShow
    },
    // 存储意向
    {
      path: '/personal/information/intention',
      name: 'Intention',
      component: Intention
    },
    // 存储意向-显示
    {
      path: '/personal/information/intention-show',
      name: 'IntentionShow',
      component: IntentionShow
    },
    // 介绍资料
    {
      path: '/personal/information/profile',
      name: 'Profile',
      component: Profile
    },
    // 介绍资料-显示
    {
      path: '/personal/information/profile-show',
      name: 'ProfileShow',
      component: ProfileShow
    },
    // 讲师认证
    {
      path: '/personal/information/authentication',
      name: 'Authentication',
      component: Authentication
    },
    // 讲师认证-我的
    {
      path: '/personal/information/authentication-center',
      name: 'AuthenticationCenter',
      component: AuthenticationCenter
    },
    // 支付
    {
      path: '/personal/payment/:price',
      name: 'Payment',
      component: Payment
    },
    // 钱包
    {
      path: '/personal/wallet/index/:balance',
      name: 'WalletIndex',
      component: WalletIndex
    },
    // sdg
    {
      path: '/personal/wallet/sdg-index/:sdg',
      name: 'SDGIndex',
      component: SDGIndex
    },
    // 明细
    {
      path: '/personal/wallet/detailed',
      name: 'Detailed',
      component: Detailed
    },
    // 明细详情页
    {
      path: '/personal/wallet/detailedpage',
      name: 'DetailedPage',
      component: DetailedPage
    },
    // 充值
    {
      path: '/personal/wallet/recharge',
      name: 'Recharge',
      component: Recharge
    },
    // 提现
    {
      path: '/personal/wallet/withdraw',
      name: 'Withdraw',
      component: Withdraw
    },
    // 消息
    {
      path: '/personal/msg',
      name: 'Msg',
      component: Msg
    },
    // 测试
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    },
    // 测试
    {
      path: '/ceshiSelect',
      name: 'ceshiSelect',
      component: ceshiSelect
    },
    // 测试
    {
      path: '/selectItem',
      name: 'selectItem',
      component: selectItem
    },
    // 约课
    {
      path: '/customized/index',
      name: 'CustomizedIndex',
      component: CustomizedIndex
    },
    // 讲师详情
    {
      path: '/customized/details/:id',
      name: 'lecturerDetails',
      component: lecturerDetails
    },
    // 预约
    {
      path: '/customized/appointment/:id',
      name: 'Appointment',
      component: Appointment
    },
    // 预约-填写
    {
      path: '/customized/appointmentinput',
      name: 'AppointmentInput',
      component: AppointmentInput
    },
    // 定制服务
    {
      path: '/reserve/index',
      name: 'ReserveIndex',
      component: ReserveIndex
    },
    // 服务详情
    {
      path: '/reserve/servicedetails',
      name: 'ServiceDetails',
      component: ServiceDetails
    },
    // 购买
    {
      path: '/reserve/purchase',
      name: 'Purchase',
      component: Purchase
    },
    // 我的
    {
      path: '/user/index',
      name: 'UserIndex',
      component: UserIndex
    },
    // 企业信息
    {
      path: '/user/enterpriseInfo',
      name: 'EnterpriseInfo',
      component: EnterpriseInfo
    },
    // 个人中心
    {
      path: '/user/personalcenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    // 订单中心
    {
      path: '/user/ordercenter',
      name: 'OrderCenter',
      component: OrderCenter
    },
    // 全部订单
    {
      path: '/user/allorder',
      name: 'AllOrder',
      component: AllOrder
    },
    // 订单详情
    {
      path: '/user/OrderDetails/:orderId',
      name: 'OrderDetails',
      component: OrderDetails
    },
    // 评价讲师
    {
      path: '/user/evaluate/:orderId',
      name: 'Evaluate',
      component: Evaluate
    },
    // 企业端-消息
    {
      path: '/user/msg',
      name: 'CoMsg',
      component: CoMsg
    }
  ]
})
