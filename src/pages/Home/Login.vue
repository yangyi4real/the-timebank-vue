<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="login-form">
        <div class="login-form-div">
          <input type="text" v-model="phoneNumber" placeholder="请输入手机号" v-on:input="inputValue"/>
        </div>
        <div class="login-form-div">
          <input type="password" v-model="password" placeholder="请输入密码" v-on:input="inputValue"/>
        </div>
      </div>
      <p class="agreement">新用户登录默认同意<span @click="loginAgreementClicked">《协议》</span></p>
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
      titleMsg: '登录',
      phoneNumber: '',
      password: '',
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  computed: {
    getUserType () {
      return this.$route.params.userType
    }
  },
  methods: {
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
     * 点击登录按钮
     */
    loginBtnClicked () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('loginId', _this.phoneNumber)
      formData.append('password', _this.password)
      formData.append('userType', this.getUserType)
      _this.$_HTTPData.getLogin(_this, formData, function (res) {
        if (_this.getUserType === 1 || _this.getUserType === '1') {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_Success(res.message)
            _this.$router.push('/calendar/index')
          } else {
            lib.MessageAlert_Error(res.message)
          }
        } else if (_this.getUserType === 2 || _this.getUserType === '2') {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_None(res.message)
            _this.$router.push('/customized/index')
          } else {
            _this.TipsTools.MessageAlert_Error(res.message)
          }
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
  .login-form{padding-top: 0.3rem;}
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
