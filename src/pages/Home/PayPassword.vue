<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="login-form">
        <div class="login-form-div">
          <input type="password" v-model="payPassword" placeholder="请设置六位数字的支付密码" v-on:input="inputValue"/>
        </div>
        <div class="login-form-div">
          <input type="password" v-model="payPasswordSure" placeholder="请确认支付密码" v-on:input="inputValue"/>
        </div>
      </div>
      <p class="agreement">支付密码用于余额提现和消费</p>
      <div class="login-btn">
        <div :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}" @click="confirmButtonClicked()">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable standard/no-callback-literal,no-useless-return */
import Navbar from '../../views/navbar/navbar'
import TipsTools from '../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'PayPassword',
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
    }
  },
  computed: {
  },
  methods: {
    inputValue () {
      if (this.payPassword !== '' && this.payPasswordSure !== '') {
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
    checkInputValue (callback) {
      // 判断密码位数
      if (!this.$SaiLei.CheckPasswordSix(this.payPassword)) {
        callback('密码为 6 位数字和字母组合')
        return
        // 判断两次密码一致
      } else if (this.payPasswordSure !== this.payPassword) {
        callback('请确认两次输入的密码一致')
        return
      }
      callback()
    },
    /**
     * 点击了确认按钮
     */
    confirmButtonClicked () {
      lib.MessageAlert_Success('设置成功')
      this.$router.push('/calendar/index')
      // lib.MessageAlert_Confirm('密码不一致')
      // this.checkInputValue(function (message) {
      //   if (message) {
      //     callback('error', message)
      //     return
      //   } else {
      //     console.log('正确')
      //   }
      // })
    }
  },
  mounted () {},
  watch: {
    inputValue () {
      if (this.payPassword !== '' && this.payPasswordSure !== '') {
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
  .agreement{padding-top: 0.15rem;text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .login-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
</style>
