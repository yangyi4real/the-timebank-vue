<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="login-form">
        <div class="login-form-div">
          <input type="text" v-model="phoneNumber" placeholder="请输入手机号" v-on:input="inputValue"/>
          <span class="fr" :class="{'get-code-btn': true, 'disable': !getMsgCodeButtonCanTap}" @click="getMsgCodeButtonClicked">
            {{ getMsgCodeButtonTitle }}
          </span>
        </div>
        <div class="login-form-div">
          <input type="text" v-model="phoneNumberCode" placeholder="请输入验证码" v-on:input="inputValue"/>
        </div>
      </div>
      <p class="agreement">新用户登录默认同意<span>《协议》</span>并注册</p>
      <div class="login-btn">
        <div @click="loginBtnClicked" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../views/navbar/navbar'
// import { SHOW_GLOBAL_LOGIN } from '../../store/MutationTypes'
import TipsTools from '../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'Login',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '登录/注册',
      phoneNumber: '',
      phoneNumberCode: '',
      getMsgCodeSecond: 60,
      getMsgCodeButtonCanTap: true,
      timer: null,
      inOperation: true, // 灰色按钮
      operation: false
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
    inputValue () {
      if (this.phoneNumber !== '' && this.phoneNumberCode !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
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
      if (this.phoneNumberCode.length < 1) {
        lib.MessageAlert_Error('请输入短信验证码')
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
      let formData = new FormData()
      formData.append('phone', _this.phoneNumber)
      _this['isButtonAlert'] = true
      _this.$_HTTPData.getAuthCode(_this, formData, function (res) {
        _this['isButtonAlert'] = false
        if (res.code === 0 || res.code === '000') {
          _this.startTimer()
          lib.MessageAlert_Success('发送成功')
        } else {
          console.log(res.message)
        }
      })
    },
    /**
     * 点击登录按钮
     */
    loginBtnClicked () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('loginId', _this.phoneNumber)
      formData.append('authCode', _this.phoneNumberCode)
      formData.append('userType', _this.phoneNumberCode)
      _this.$_HTTPData.getLogin(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          // _this.TipsTools.MessageAlert_Success('注册成功')
          console.log('1111')
          _this.$router.push('/paypassword')
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
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .login-form{padding-top: 0.6rem;}
  .login-form .login-form-div{margin: 0.15rem 0.2rem 0 0.2rem;border-bottom: 0.01rem solid #E8E8E8;padding: 0.15rem 0;}
  .login-form .login-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .login-form .login-form-div .get-code-btn{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .agreement{padding-top: 0.15rem;text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .agreement span{color:rgba(249,91,64,1);}
  .login-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
  .disable {color: #A7A7A7!important;}
</style>
