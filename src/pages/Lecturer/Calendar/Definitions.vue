<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="definitions">
        <div class="definitions-list">
          <p><i class="iconfont iconxing main-color"></i><span class="main-color">D</span>未存储</p>
          <div class="definitions-list-div">
            未将此时间存储至时间银行，企业将不会在未存储的时 间内进行约讲。快来存储未来三个月的空闲时间，赚取SDG吧~
          </div>
        </div>
        <div class="definitions-list">
          <p><i class="iconfont iconxing main-color"></i><span class="main-color">D</span>存储未约</p>
          <div class="definitions-list-div">
            此时间已存储至时间银行，目前还没有企业约讲，不要 着急，预约已经在路上了呦~同时当天晚上24:00可以获 得时光银行奖励的SDG哦~
          </div>
        </div>
        <div class="definitions-list">
          <p><i class="iconfont iconxing main-color"></i><span class="main-color">D</span>有约需确认</p>
          <div class="definitions-list-div">
            有企业约讲啦，要在24小时之内尽快确认并认真准备课 程呦~24小时之内未确认将被视作拒绝约讲。
          </div>
        </div>
        <div class="definitions-list" style="border: 0;!important;">
          <p><i class="iconfont iconxing main-color"></i><span class="main-color">D</span>已约</p>
          <div class="definitions-list-div">
            已确认当天约讲行程，将在当天晚24:00收到当天讲课 费用哦~要记在时间表中不要忘记哦，违约将影响您的 评分与约讲率。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'Definitions',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '名词解释'
    }
  },
  computed: {
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .definitions{padding: 0.2rem 0;}
  .definitions-list{margin: 0 0.17rem;border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .definitions-list p{font-size: 0.17rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-bottom: 0.15rem}
  .definitions-list p i{opacity: 0.20420000000000002}
  .definitions-list p span{padding: 0 0.05rem;}
  .definitions-list-div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(85,85,85,1);line-height:0.2rem;}
</style>
