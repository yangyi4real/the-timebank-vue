<template>
  <div>
    <div class="home-nav text-center">
      时间银行
    </div>
    <div class="wapper">
      <p class="chose-p"><i class="iconfont iconshenfenzheng"></i>选择身份</p>
      <div class="chose-btn clearfix">
        <div class="chose-btn-left chose-btn-div" :class="{active: shows === 1}" @click="jsClick">讲师</div>
        <div class="chose-btn-right chose-btn-div" :class="{active: shows === 2}" @click="qyClick">企业</div>
      </div>
      <div v-show="jsBtnClick">
        <div class="login-form">
          <div class="login-form-div" v-show="phone">
            <input type="text" v-model="phoneNumber" placeholder="请输入手机号" />
          </div>
          <div class="login-form-div" v-show="phone2">
            <input type="text" v-model="phoneNumber" placeholder="请输入手机号" />
          </div>
          <div class="login-form-div">
            <input type="password" v-model="password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="login-btn">
          <div @click="loginBtnClicked" class="login-btn-div">登录</div>
          <div class="forgetPassword clearfix">
            <span class="fl" @click="registerClicked">没有账号，<i class="main-color">立即注册！</i></span><span class="fr" @click="forGetPwClicked">忘记密码？</span>
          </div>
        </div>
      </div>
      <div v-show="qyBtnClick">
        <div class="login-form">
          <div class="login-form-div" v-show="phone">
            <input type="text" v-model="phoneNumber" placeholder="请输入手机号" />
          </div>
          <div class="login-form-div" v-show="phone2">
            <input type="text" v-model="phoneNumber" placeholder="请输入手机号" />
          </div>
          <div class="login-form-div">
            <input type="password" v-model="password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="login-btn">
          <div @click="loginBtnClicked2" class="login-btn-div">登录</div>
          <div class="forgetPassword clearfix">
            <span class="fl" @click="registerClicked">没有账号，<i class="main-color">立即注册！</i></span><span class="fr">忘记密码？</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SHOW_GLOBAL_LOGIN, SHOW_GLOBAL_REGISTER, SHOW_GLOBAL_PASSWORD } from '../../store/MutationTypes'
import TipsTools from '../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'LoginEmbedded',
  components: {},
  data () {
    return {
      phoneNumber: '',
      password: '',
      shows: 1,
      jsBtnClick: true,
      qyBtnClick: false,
      phone: false,
      phone2: false
    }
  },
  computed: {},
  methods: {
    getLoginInput () {
      if (this.$SaiLei.cookiesGet('user_loginIdUser') === false) {
        this.phone = true
        this.phone2 = false
      } else {
        this.phone = false
        this.phone2 = true
        this.phoneNumber = this.$SaiLei.cookiesGet('user_loginIdUser')
      }
    },
    registerClicked () {
      this.$store.dispatch(SHOW_GLOBAL_REGISTER, true)
      this.$store.dispatch(SHOW_GLOBAL_LOGIN, false)
      // this.$router.push('/register')
    },
    forGetPwClicked () {
      this.$store.dispatch(SHOW_GLOBAL_PASSWORD, true)
      this.$store.dispatch(SHOW_GLOBAL_LOGIN, false)
    },
    jsClick () {
      this.shows = 1
      this.jsBtnClick = true
      this.qyBtnClick = false
    },
    qyClick () {
      this.shows = 2
      this.jsBtnClick = false
      this.qyBtnClick = true
    },
    loginAgreementClicked () {
      this.$router.push('/login-agreement')
    },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      // 判断输入手机号是手机号码
      if (this.phoneNumber === '' || this.phoneNumber === null || this.phoneNumber.length < 11) {
        lib.MessageAlert_Error('请输入正确手机号')
        return false
      }
      if (this.password.length < 1) {
        lib.MessageAlert_Error('请输入密码')
        return false
      }
      return true
    },
    /**
     * 点击讲师登录按钮
     */
    loginBtnClicked () {
      console.log(localStorage.getItem('Ip'))
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('loginId', _this.phoneNumber)
      formData.append('password', _this.password)
      formData.append('userType', 1)
      _this.$_HTTPData.getLogin(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success(res.message)
          _this.$store.dispatch(SHOW_GLOBAL_LOGIN, false)
          _this.$SaiLei.cookiesSave('user_loginStatus', 1)
          if (res.result.account.payPassword === null) {
            _this.$router.push(`/paypassword/${res.result.user.id}/1`)
          } else {
            // _this.$router.push('/calendar/index')
            window.location = '/#/calendar/index'
            location.reload()
          }
        } else {
          _this.TipsTools.MessageAlert_Error(res.message)
        }
      })
    },
    /**
     * 点击企业登录按钮
     */
    loginBtnClicked2 () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('loginId', _this.phoneNumber)
      formData.append('password', _this.password)
      formData.append('userType', 2)
      _this.$_HTTPData.getLogin(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success(res.message)
          _this.$SaiLei.cookiesSave('user_loginStatus', 2)
          _this.$store.dispatch(SHOW_GLOBAL_LOGIN, false)
          if (res.result.account.payPassword === null) {
            _this.$router.push(`/paypassword/${res.result.user.id}/2`)
          } else {
            window.location = '/#/customized/index'
            location.reload()
            console.log('111')
          }
        } else {
          _this.TipsTools.MessageAlert_Error(res.message)
        }
      })
    }
  },
  mounted () {
    this.getLoginInput()
    console.log(localStorage.getItem('Ip'))
  },
  watch: {
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;}
  .wapper .chose-p{font-size:0.2rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-top: 0.4rem;padding-bottom: 0.4rem;text-align: center}
  .wapper .chose-p i{font-size: 0.22rem;margin-right: 0.1rem;color: #F95B40}
  .wapper .chose-btn-div{width: 1.2rem;height:0.6rem;border-radius: 0.05rem;border:0.01rem solid rgba(249,91,64,1);line-height: 0.6rem;font-size: 0.18rem;
    font-family:PingFangSC-Medium;float: left;text-align: center}
  .chose-btn-left{margin: 0 0.5rem;}
  .active{background: #F95B40;color: #fff;}
  .operation-button{padding-top: 1rem;padding-bottom: 1.07rem;}
  .login-form{padding-top: 0.3rem;}
  .login-form .login-form-div{margin: 0.15rem 0.2rem 0 0.2rem;border-bottom: 0.01rem solid #E8E8E8;padding: 0.15rem 0;}
  .login-form .login-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .login-form .login-form-div .get-code-btn{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .agreement{padding-top: 0.15rem;text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .agreement span{color:rgba(249,91,64,1);}
  .login-btn{padding-top: 0.5rem;padding-bottom: 1rem;}
  .disable {color: #A7A7A7!important;}
  .forgetPassword{padding-top: 0.2rem;color: rgba(167,167,167,1);font-size: 0.14rem;width:3.36rem;margin: 0 auto;}
  .login-btn-div{width:3.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);color:rgba(255,255,255,1);}
</style>
