<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="pay-base">
        <p>充值金额</p>
        <div class="pay-base-div">
          <input type="text" v-model="payRecharge" placeholder="请输入金额"/>
        </div>
        <div class="btn-bottom">
          <div class="btn-border" @click="pushClick">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'Recharge',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '充值',
      payRecharge: ''
    }
  },
  created () {},
  computed: {
  },
  methods: {
    detailsClicked () {
      this.$router.push('/personal/wallet/detailedpage')
    },
    pushClick () {
      this.$router.push('/personal/lecturer-payment')
    }
  },
  mounted () {},
  watch: {}
}
</script>
<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .pay-base{padding: 0.5rem 0.2rem}
  .pay-base p{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding: 0.2rem 0;}
  .pay-base-div{border-bottom: 0.01rem solid #E8E8E8;margin-bottom: 1.3rem;}
  .pay-base-div input{font-size:0.32rem;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(0,0,0,1);line-height: 0.45rem;border: 0;outline: none;margin: 0.2rem 0;width: 100%;}
  .btn-bottom{padding-bottom: 2rem}
</style>
