<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="feedback">
        <div class="feedback-title">
          <p>您的宝贵意见会让我们做的越来越好</p>
          <div class="feedback-title-msg">
            <textarea></textarea>
          </div>
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
    subClick () {
      this.$router.push('/personal/setup/index')
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
  .feedback-title{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .feedback-title p{padding: 0.4rem 0}
  .feedback-title-msg textarea{width: 100%;height: 2rem;padding: 0.2rem}
  .feedback-btn{padding-top: 1.77rem;padding-bottom: 1.5rem;}
</style>
