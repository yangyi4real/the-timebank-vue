<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="pay-form-div">
        <input type="password" v-model="payPassword" placeholder="设置6位数字支付密码" v-on:input="inputValue"/>
      </div>
      <div class="pay-form-div">
        <input type="password" v-model="payPasswordSure" placeholder="确认密码" v-on:input="inputValue"/>
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
export default {
  name: 'NewPayPassword',
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
  computed: {},
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
    confirmClick () {}
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
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;padding-top: 0.3rem}
  .pay-form-div{border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;padding-top: 0.2rem;padding-bottom: 0.15rem;}
  .pay-form-div input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;
    font-family:PingFangSC-Regular;font-weight:400;}
  input:focus {outline: none;}
  .pay-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
  .a7-color{padding-top: 0.2rem}
</style>
