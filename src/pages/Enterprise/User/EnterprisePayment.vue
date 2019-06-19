<template>
  <div class="body">
    <div class="home-nav clearfix">
      <i class="iconfont iconxiazai6 fl" @click="authentClicked"></i>
      <span class="fl"> 支付</span>
    </div>
    <div class="wapper">
      <div class="payment-title">
        <label>支付金额</label>
        <p><span>￥</span>{{getPrice}}</p>
      </div>
      <div class="payment-mode">
        <p>支付方式</p>
        <div class="payment-mode-list flex-row-between" style="border-bottom: 0.01rem solid #E8E8E8;">
          <div class="payment-mode-list-text">
            <img src=""/>钱包支付<span>（余额不足）</span>
          </div>
          <div class="payment-mode-list-radio">
            <input id="item1" type="radio" name="payItem" value="1" v-model="checkedValue">
            <label for="item1"></label>
          </div>
        </div>
        <div class="payment-mode-list flex-row-between">
          <div class="payment-mode-list-text">
            <img src=""/>微信支付
          </div>
          <div class="payment-mode-list-radio">
            <input id="item2" type="radio" name="payItem" value="2" v-model="checkedValue">
            <label for="item2"></label>
          </div>
        </div>
      </div>
      <div class="payment-btn">
        <yd-button size="large" type="primary" @click.native="affirmPay" class="btn-border">确认支付</yd-button>
        <div @click="tiaoClick" class="payment-btn-quxiao">暂不支付</div>
      </div>
    </div>
    <yd-popup v-model="show1" position="center" width="90%">
      <div class="payPopup" style="background-color:#fff;border-radius:0.08rem">
        <div class="payPopup-title text-center">
          <label>支付金额</label>
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
import Navbar from '../../../views/navbar/navbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'EnterprisePayment',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '支付',
      checkedValue: '1',
      show1: false,
      msg: '',
      msgLength: 0,
      ip: ''
    }
  },
  created () {},
  mounted () {
  },
  computed: {
    getPrice () {
      return this.$route.params.price
    },
    getOrderId () {
      return this.$route.params.orderId
    },
    getId () {
      return this.$route.params.id
    }
  },
  methods: {
    tiaoClick () {
      lib.MessageAlert_None('取消支付')
      this.$router.push('/user/ordercenter')
    },
    authentClicked () {
      lib.MessageAlert_None('取消支付')
      this.$router.push('/user/ordercenter')
    },
    affirmPay () {
      if (this.checkedValue === '1') {
        this.show1 = true
      } else if (this.checkedValue === '2') {
        let _this = this
        let formData = new FormData()
        formData.append('certificateId', _this.getId)
        formData.append('IP', localStorage.getItem('Ip'))
        // formData.append('certificateId', '1560843771562')
        _this.$_HTTPData.getCreate(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            console.log(res)
            if (res.result === null) {
              lib.MessageAlert_None('未获取到地址')
              console.log(res.message)
            } else {
              window.open(res.result)
            }
          } else {
            console.log(res.message)
          }
        })
      }
    },
    payFocus () {
      this.$refs.pwd.focus()
    },
    ResetPwd () {
      this.$router.push('/personal/personalcenter')
    },
    getPush () {
      this.$dialog.loading.open('支付中，请勿操作')
      setTimeout(() => {
        let _this = this
        let formData = new FormData()
        formData.append('payType', 1)
        formData.append('orderId', _this.getOrderId)
        formData.append('companyId', _this.$SaiLei.cookiesGet('user_id'))
        _this.$_HTTPData.getCompanyPay(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.$dialog.loading.close()
            lib.MessageAlert_None('支付成功')
            _this.$router.push('/user/ordercenter')
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }, 2000)
      this.show1 = false
    }
  },
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
  .payment-title{padding-top: 0.6rem;padding-bottom: 0.48rem;text-align: center;}
  .payment-title label{font-size:0.19rem;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(0,0,0,1);}
  .payment-title p{font-size:0.32rem;ont-family:PingFangSC-Semibold;font-weight:600;color:rgba(249,91,64,1);padding-top: 0.4rem;}
  .payment-title p span{font-size:0.21rem;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(249,91,64,1);padding-right: 0.15rem;}
  .payment-mode{margin: 0 0.2rem;}
  .payment-mode p{font-size:0.16rem;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(0,0,0,1);}
  .payment-mode .payment-mode-list{padding: 0.2rem 0;}
  .payment-btn{padding: 1rem 0;}
  .payment-mode-list-text{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .payment-mode-list-text span{color:rgba(167,167,167,1);}
  .payment-mode-list-radio{position: relative;}
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
  .payment-btn-quxiao{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0.2rem auto;border: 0.01rem solid #C8C8C8;background: #C8C8C8;color:rgba(255,255,255,1);}
</style>
