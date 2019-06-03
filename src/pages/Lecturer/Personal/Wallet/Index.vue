<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="wallet-index">
        <div class="text-right" @click="detailedClick">明细</div>
        <div class="wallet-index-sum text-center">
          <img src="" alt=""/>
          <div class="wallet-index-sum-padding">
            <p>我的余额</p>
            <label>￥ {{getBalance}}.00</label>
          </div>
        </div>
      </div>
      <div class="authentication-btn">
        <div class="btn-border-black" @click="rechargeClick">充值</div>
        <div class="btn-border-black" @click="withdrawClick">提现</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'WalletIndex',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '钱包'
    }
  },
  created () {},
  computed: {
    getBalance () {
      return this.$route.params.balance
    }
  },
  methods: {
    rechargeClick () {
      this.$router.push('/personal/wallet/recharge')
    },
    withdrawClick () {
      this.$router.push('/personal/wallet/withdraw')
    },
    detailedClick () {
      this.$router.push('/personal/wallet/detailed')
    }
  },
  mounted () {},
  watch: {}
}
</script>

<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .wallet-index{padding: 0 0.2rem;}
  .wallet-index .text-right{font-size:0.17rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding: 0.2rem 0;}
  .wallet-index-sum img{width: 0.7rem;height: 0.7rem;}
  .wallet-index-sum p{font-size:0.17rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-bottom: 0.1rem;}
  .wallet-index-sum label{font-size:0.32rem;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(0,0,0,1);}
  .wallet-index-sum-padding{padding: 0.5rem 0;}
  .authentication-btn{padding: 01rem 0;}
  .authentication-btn div{margin-top: 0.3rem}
</style>
