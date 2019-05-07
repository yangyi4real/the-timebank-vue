<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="phone-title">
        <p>本操作需要短信确认</p>
        <p>请输入<span>158****9968</span>收到的短信验证码</p>
      </div>
      <div class="phone-form-div">
        <input type="text" v-model="phoneNumberCode" placeholder="请输入验证码" v-on:input="inputValue"/>
        <span class="fr" :class="{'get-code-btn': true, 'disable': !getMsgCodeButtonCanTap}" @click="getMsgCodeButtonClicked">
            {{ getMsgCodeButtonTitle }}
          </span>
      </div>
      <div class="phone-btn">
        <div :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}" @click="confirmClick">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'PhoneVerification',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '手机号验证',
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
      if (this.phoneNumberCode !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
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
      if (!this.getMsgCodeButtonCanTap) { return }
      if (!this.checkInputValue()) { return }
      this.startTimer()
    },
    confirmClick () {}
  },
  mounted () {},
  watch: {
    inputValue () {
      if (this.phoneNumberCode !== '') {
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
  .phone-title{text-align: center;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-top: 0.56rem;padding-bottom: 0.2rem}
  .phone-title p{line-height: 0.48rem;}
  .phone-form-div{border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;padding-top: 0.2rem;padding-bottom: 0.15rem;}
  .phone-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .phone-form-div .get-code-btn{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .phone-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
  .disable {color: #A7A7A7!important;}
</style>
