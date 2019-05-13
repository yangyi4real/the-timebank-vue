<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="evaluate">
        <div class="evaluate-rate">
          <yd-cell-item>
            <yd-rate slot="left" v-model="rate" color="#E2E2E2" active-color="#FED500" size="0.25rem"></yd-rate>
          </yd-cell-item>
        </div>
        <div class="evaluate-text">
          <textarea draggable="false" v-model="evaluateText" placeholder="写下你对企业的评价吧"></textarea>
        </div>
        <div class="evaluate-sub">
          <div class="btn-border">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'CoEvaluate',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '评价企业',
      rate: 4,
      evaluateText: ''
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .evaluate{padding: 0 0.2rem;}
  .evaluate-btn div{width:1.21rem;height:0.43rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;line-height: 0.43rem;text-align: center;}
  .evaluate-rate{padding-left: 0.9rem;}
  .evaluate-text{padding-bottom: 0.2rem;padding-top: 0.4rem;}
  .evaluate-text textarea{width:3.54rem;height:1.4rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);padding: 0.19rem 0.21rem;font-size:0.14rem;
    font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .evaluate-sub{padding-top: 1.2rem;padding-bottom: 0.9rem;}
  .active{background: rgba(249,91,64,1);color: #fff;}
</style>
