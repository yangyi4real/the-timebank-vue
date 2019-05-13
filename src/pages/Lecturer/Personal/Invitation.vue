<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="title text-center">
        邀请码
      </div>
      <div class="invitation-code main-color">
        <span class="iconfont iconxing padding-right-13"></span>8023<span class="iconfont iconxing padding-left-13"></span>
      </div>
      <div class="invitation-notes">
        <div class="title2">
          <i class="iconfont iconjianglijilu main-color"></i>奖励
        </div>
        <div class="invitation-notes-p">
          <p>1.邀请一位好友注册讲师或企业，奖励n个SDG；</p>
          <p>2.邀请企业消费，消费金额m%分给你。</p>
        </div>
        <div class="btn-border" @click="invitationBtnClick">邀请好友</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'Invitation',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '邀请好友'
    }
  },
  computed: {},
  methods: {
    invitationBtnClick () {}
  },
  mounted () {}
}
</script>

<style scoped>
  .padding-left-13{padding-left: 0.13rem}
  .padding-right-13{padding-right: 0.13rem}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .title{font-size: 0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-top: 0.6rem;padding-bottom: 0.5rem;}
  .invitation-code{width:1.63rem;height:0.57rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);margin: 0 auto;text-align: center;font-family:PingFangSC-Medium;line-height: 0.57rem;font-size: 0.3rem;}
  .invitation-notes{border-top: 0.01rem solid #E8E8E8;padding: 0.4rem 0;margin: 0.6rem 0.2rem}
  .invitation-notes .title2{font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center}
  .invitation-notes .title2 i{padding-right: 0.1rem}
  .invitation-notes .invitation-notes-p{padding: 0.3rem 0;}
  .invitation-notes p{font-size: 0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.28rem}
  .invitation-notes .invitation-btn{width:2.36rem;height:0.48rem;background:rgba(249,91,64,1);border-radius: 0.05rem;font-size:17px;font-family:PingFangSC-Medium;text-align: center;line-height: 0.48rem;font-weight:500;color:rgba(255,255,255,1);margin: 0.35rem auto}
</style>
