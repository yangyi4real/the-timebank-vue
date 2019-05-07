<template>
  <div class="body">
    <navbar :title="titleMsg" @click="click"></navbar>
    <div class="wapper">
      <div class="feedback">
        <div class="feedback-title">
          您的宝贵意见会让我们做的越来越好
        </div>
        <div class="feedback-btn">
          <div class="btn-border-opacity" @click="subClick">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'Feedback',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '意见反馈'
    }
  },
  computed: {},
  methods: {
    subClick () {},
    click () {
      this.$router.push('/personal/setup/newpaypassword')
    }
  },
  mounted () {},
  watch: {
    inputValue () {
      if (this.phoneNumber !== '' && this.phoneNumberCode !== '') {
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
  .feedback{padding: 0 0.2rem}
  .feedback-title{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);border-bottom: 0.01rem solid #E8E8E8;padding: 0.4rem 0}
  .feedback-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
</style>
