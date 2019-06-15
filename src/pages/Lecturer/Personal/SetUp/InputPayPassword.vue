<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="login-form">
        <div class="login-form-div">
          <input type="password" v-model="payPassword" placeholder="请设置六位数字的支付密码"/>
        </div>
        <div class="login-form-div">
          <input type="password" v-model="payPasswordSure" placeholder="请确认支付密码"/>
        </div>
      </div>
      <p class="agreement">支付密码用于余额提现和消费</p>
      <div class="login-btn">
        <div :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}" @click="confirmButtonClicked">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable standard/no-callback-literal,no-useless-return */
import Navbar from '../../../../views/navbar/navbar'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'InputPayPassword',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '支付密码',
      payPassword: '',
      payPasswordSure: '',
      inOperation: true, // 灰色按钮
      operation: false
      // userInfoItem: ''
    }
  },
  computed: {
    getId () {
      return this.$route.params.id
    }
  },
  methods: {
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.payPassword === '') {
        lib.MessageAlert_Error('请输入密码')
        return false
      }
      if (this.payPassword.length < 6 || this.payPassword.length > 6) {
        lib.MessageAlert_Error('请输入6位数密码')
        return false
      }
      if (this.payPasswordSure === '') {
        lib.MessageAlert_Error('请确认密码')
        return false
      }
      if (this.payPassword !== this.payPasswordSure) {
        lib.MessageAlert_Error('密码不一致')
        return false
      }
      return true
    },
    /**
     * 点击了确认按钮
     */
    confirmButtonClicked () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('paypassword', _this.payPasswordSure)
      _this.$_HTTPData.getSetPayPassword(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success('设置成功')
          _this.$router.go(-1)
        } else {
          console.log(res.message)
        }
      })
    }
  },
  mounted () {},
  watch: {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;}
  .login-form{padding-top: 0.6rem;}
  .login-form .login-form-div{margin: 0.15rem 0.2rem 0 0.2rem;border-bottom: 0.01rem solid #E8E8E8;padding: 0.15rem 0;}
  .login-form .login-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .agreement{padding-top: 0.15rem;text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .login-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
  .tiaoClickBtn{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #C8C8C8;background: #C8C8C8;color:rgba(255,255,255,1);}
</style>
