<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="pay-base">
        <label>提现到微信余额</label>
        <label><span>总金额：2000.00</span></label>
        <p>提现金额</p>
        <div class="pay-base-div">
          <input type="text" v-model="payWithdraw" placeholder="请输入金额"/>
        </div>
        <label class="pay-base-div2"><span>手续费：300.00</span></label>
        <div class="btn-bottom">
          <div class="btn-border" @click="affirmPay">确定</div>
        </div>
      </div>
    </div>
    <yd-popup v-model="show1" position="center" width="90%">
      <div class="payPopup" style="background-color:#fff;border-radius:0.08rem">
        <div class="payPopup-title text-center">
          <label>提现金额</label>
          <p>￥300.00</p>
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
    </yd-popup>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'Withdraw',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '提现',
      payWithdraw: '',
      checkedValue: '1',
      show1: false,
      msg: '',
      msgLength: 0
    }
  },
  created () {},
  computed: {
  },
  methods: {
    detailsClicked () {
      this.$router.push('/personal/wallet/detailedpage')
    },
    affirmPay () {
      this.show1 = true
    },
    payFocus () {
      this.$refs.pwd.focus()
    },
    ResetPwd () {
      this.$router.push('/personal/setup/newpaypassword')
    },
    getPush () {
      // this.$dialog.loading.open('支付中，请勿操作')
      // setTimeout(() => {
      //   this.$dialog.loading.close()
      // }, 2000)
      // this.show1 = false
      lib.MessageAlert_None('支付成功')
      // this.$router.push('/personal/index')
    }
  },
  mounted () {},
  watch: {
    msg (curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.msg = this.msg.replace(/[^\d]/g, '')
      } else {
        this.msgLength = curVal.length
        if (this.msgLength === 6) {
          this.getPush()
        }
      }
    }
  }
}
</script>
<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .pay-base{padding: 0.5rem 0.2rem}
  .pay-base p{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding: 0.3rem 0;}
  .pay-base-div{border-bottom: 0.01rem solid #E8E8E8;}
  .pay-base-div input{font-size:0.32rem;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(0,0,0,1);line-height: 0.45rem;border: 0;outline: none;margin: 0.2rem 0;}
  .pay-base-div2{margin-bottom: 1.5rem;padding-top: 0.2rem}
  .btn-bottom{padding-bottom: 2rem}
  .pay-base label{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);display: block;}
  .pay-base label span{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:#A7A7A7;}
  /*radio按钮重做*/
  input[type="radio"] {
    width: 0.17rem;
    height: 0.17rem;
    opacity: 0;
  }
  .payment-mode label {
    position: absolute;
    top: 0;
    width: 0.17rem;
    height: 0.17rem;
    border-radius: 50%;
    border: 0.01rem solid rgba(249,91,64,1);
  }
  .payment-mode input:checked+label {
    background-color: rgba(249,91,64,1);
    border: 1px solid rgba(249,91,64,1);
  }
  /*支付密码*/
  .payPopup .payPopup-title{padding-top: 0.3rem;}
  .payPopup .payPopup-title label{font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .payPopup .payPopup-title p{font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);padding: 0.2rem 0}
  .payment-mode input:checked+label::after {
    position: absolute;
    content: "";
    width: 0.05rem;
    height: 0.1rem;
    top: 0.015rem;
    left: 0.05rem;
    border: 0.02rem solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
  }
  .payPassword-form .text-right{padding: 0.15rem 0;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
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
    width: 0.37rem;
    height: 0.37rem;
    border-bottom: 0.01rem solid rgba(219,219,219,1);
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
