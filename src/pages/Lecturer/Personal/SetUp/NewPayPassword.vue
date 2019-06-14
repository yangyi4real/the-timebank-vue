<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="pay-form-div">
        <input type="password" v-model="payPassword" placeholder="设置6位数字支付密码"/>
      </div>
      <div class="pay-form-div">
        <input type="password" v-model="payPasswordSure" placeholder="确认密码"/>
      </div>
      <div class="pay-form-div">
        <input type="text" v-model="phoneNumberCode" placeholder="请输入验证码"/>
        <span class="fr" :class="{'get-code-btn': true, 'disable': !getMsgCodeButtonCanTap}" @click="getMsgCodeButtonClicked">
            {{ getMsgCodeButtonTitle }}
          </span>
      </div>
      <p class="a7-color text-center">支付密码用于余额提现和消费</p>
      <div class="pay-btn">
        <div :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}" @click="confirmClick">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'NewPayPassword',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '新支付密码',
      payPassword: '',
      payPasswordSure: '',
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
      let formData = new FormData()
      formData.append('phone', _this.$SaiLei.cookiesGet('user_loginId'))
      _this.$_HTTPData.getAuthCode(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.startTimer()
        } else {
          console.log(res.message)
        }
      })
    },
    confirmClick () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('newPayPassword', _this.payPasswordSure)
      formData.append('anthCode', _this.phoneNumberCode)
      _this.$_HTTPData.getResetPayPassword(_this, formData, function (res) {
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
  watch: {
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;padding-top: 0.3rem}
  .pay-form-div{border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;padding-top: 0.2rem;padding-bottom: 0.15rem;}
  .pay-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .pay-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
  .a7-color{padding-top: 0.2rem}
  .get-code-btn{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
</style>
