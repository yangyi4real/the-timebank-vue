<template>
  <div>
    <div class="home-nav text-center">
      时间银行
    </div>
    <div class="wapper">
      <div class="login-form">
        <div class="login-form-div">
          <input type="text" v-model="phoneNumber" placeholder="请输入手机号" v-on:input="inputValue"/>
        </div>
        <div class="login-form-div">
          <input type="text" v-model="phoneNumberCode" placeholder="请输入短信验证码" v-on:input="inputValue"/>
          <span class="fr" :class="{'get-code-btn': true, 'disable': !getMsgCodeButtonCanTap}" @click="getMsgCodeButtonClicked">
            {{ getMsgCodeButtonTitle }}
          </span>
        </div>
        <div class="login-form-div">
          <input type="password" v-model="password" placeholder="请输入新登录密码" v-on:input="inputValue"/>
        </div>
        <div class="login-form-div">
          <input type="password" v-model="passwordSure" placeholder="请确认新登录密码" v-on:input="inputValue"/>
        </div>
      </div>
      <p class="agreement">新用户登录默认同意<span @click="loginAgreementClicked">《协议》</span></p>
      <div class="login-btn">
        <div @click="loginBtnClicked" class="login-btn-div">保存</div>
        <div class="forgetPassword">
          <span @click="returnLogin">返回登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SHOW_GLOBAL_LOGIN, SHOW_GLOBAL_PASSWORD } from '../../store/MutationTypes'
import Navbar from '../../views/navbar/navbar'
import TipsTools from '../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'PasswordEmbedded',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '注册',
      phoneNumber: '',
      phoneNumberCode: '',
      password: '',
      passwordSure: '',
      invitedUserId: '',
      getMsgCodeSecond: 60,
      getMsgCodeButtonCanTap: true,
      timer: null,
      inOperation: true, // 灰色按钮
      operation: false,
      loginId: ''
    }
  },
  computed: {
    /**
     * 获取验证码按钮的标题
     */
    getMsgCodeButtonTitle () {
      if (this.getMsgCodeButtonCanTap) {
        return `获取验证码`
      } else {
        return `重新发送 ${this.getMsgCodeSecond} s`
      }
    }
  },
  methods: {
    returnLogin () {
      // this.$router.push('/')
      this.$store.dispatch(SHOW_GLOBAL_PASSWORD, false)
      this.$store.dispatch(SHOW_GLOBAL_LOGIN, true)
    },
    loginAgreementClicked () {
      this.$router.push('/login-agreement')
    },
    inputValue () {
      if (this.phoneNumber !== '' && this.phoneNumberCode !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    },
    getLogin () {},
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
      if (this.phoneNumberCode.length < 1) {
        lib.MessageAlert_Error('请输入短信验证码')
        return false
      }
      if (this.password.length < 6) {
        lib.MessageAlert_Error('密码至少为6位数')
        return false
      }
      if (this.passwordSure.length < 6) {
        lib.MessageAlert_Error('密码至少为6位数')
        return false
      }
      if (this.password !== this.passwordSure) {
        lib.MessageAlert_Error('密码输入不一致')
        return false
      }
      return true
    },
    /**
     * 开启定时器
     */
    startTimer () {
      this.getMsgCodeButtonCanTap = false
      let _this = this
      this.timer = setInterval(() => {
        _this.getMsgCodeSecond--
        if (_this.getMsgCodeSecond < 0) {
          _this.stopTimer()
        }
      }, 1000)
    },
    /**
     * 停止定时器
     */
    stopTimer () {
      clearInterval(this.timer)
      this.timer = null
      this.getMsgCodeSecond = 60
      this.getMsgCodeButtonCanTap = true
    },
    /**
     * 点击了获取验证码按钮
     */
    getMsgCodeButtonClicked () {
      let _this = this
      if (!this.getMsgCodeButtonCanTap) { return }
      if (this.phoneNumber === '' || this.phoneNumber === null) {
        lib.MessageAlert_Error('请输入正确手机号')
        return false
      }
      if (this.phoneNumber.length < 11) {
        lib.MessageAlert_Error('请输入正确手机号')
        return false
      }
      let formData = new FormData()
      formData.append('phone', _this.phoneNumber)
      _this.$_HTTPData.getAuthCode(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.startTimer()
          lib.MessageAlert_Success(res.message)
        } else {
          console.log(res.message)
        }
      })
    },
    /**
     * 点击保存按钮
     */
    loginBtnClicked () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('phone', _this.phoneNumber)
      formData.append('newPassword', _this.passwordSure)
      formData.append('authCode', _this.phoneNumberCode)
      // formData.append('invitedUserId', 1)
      _this.$_HTTPData.getChangeLoginPassword(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success('修改成功')
          // _this.$router.push('/')
          _this.$store.dispatch(SHOW_GLOBAL_PASSWORD, false)
          _this.$store.dispatch(SHOW_GLOBAL_LOGIN, true)
        } else {
          _this.TipsTools.MessageAlert_Error(res.message)
        }
      })
    }
  },
  mounted () {},
  watch: {
    inputValue () {
      if (this.phoneNumber !== '' && this.phoneNumberCode !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;}
  .login-form{padding-top: 0.3rem;}
  .login-form .login-form-div{margin: 0.15rem 0.2rem 0 0.2rem;border-bottom: 0.01rem solid #E8E8E8;padding: 0.15rem 0;}
  .login-form .login-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .login-form .login-form-div .get-code-btn{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .agreement{padding-top: 0.15rem;text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .agreement span{color:rgba(249,91,64,1);}
  .login-btn{padding-top: 1rem;padding-bottom: 0.5rem;}
  .disable {color: #A7A7A7!important;}
  .login-denglu{padding-right: 0.2rem;text-align: right;padding-top: 0.1rem;font-size: 0.14rem;}
  .login-btn-div{width:3.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);color:rgba(255,255,255,1);}
  .forgetPassword{padding-top: 0.2rem;color: rgba(167,167,167,1);font-size: 0.14rem;width:3.36rem;margin: 0 auto;text-align: right}
</style>
