<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="phone-title">
        <p>请输入现支付密码</p>
      </div>
      <div class="payPassword-form">
        <div class="payPwd">
          <input ref="pwd" type="password" maxlength="6" v-model="msg"  style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>
          <ul class="pwd-wrap" @click="payFocus">
            <li><i v-if="msgLength > 0"></i></li>
            <li><i v-if="msgLength > 1"></i></li>
            <li><i v-if="msgLength > 2"></i></li>
            <li><i v-if="msgLength > 3"></i></li>
            <li><i v-if="msgLength > 4"></i></li>
            <li><i v-if="msgLength > 5"></i></li>
          </ul>
        </div>
        <p class="text-right" @click="ResetPwd">忘记密码？</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'InputPayPassword',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '支付密码',
      msg: '',
      msgLength: 0
    }
  },
  computed: {
  },
  methods: {
    payFocus () {
      this.$refs.pwd.focus()
    },
    ResetPwd () {
      this.$router.push('/personal/setup/newpaypassword')
    }
  },
  mounted () {},
  watch: {
    msg (curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.msg = this.msg.replace(/[^\d]/g, '')
      } else {
        this.msgLength = curVal.length
      }
    }
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .phone-title{text-align: center;font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-top: 0.54rem;padding-bottom: 0.8rem}
  .phone-title p{line-height: 0.48rem;}
  .payPassword-form{margin: 0 0.2rem;}
  .payPassword-form .text-right{padding-top: 0.2rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-bottom: 3rem}
  .payPwd .pwd-wrap{
    width: 100%;
    height: 0.5rem;
    margin: 0 auto;
    background: #fff;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    cursor: pointer;
  }
  .pwd-wrap li{
    list-style-type:none;
    text-align: center;
    line-height: 0.5rem;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.05rem;
    border: 0.01rem solid rgba(219,219,219,1);
    margin: 0 0.05rem;
  }
  .pwd-wrap li i{
    height: 0.1rem;
    width: 0.1rem;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
  input:focus {outline: none;}
</style>
