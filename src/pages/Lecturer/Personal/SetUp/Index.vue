<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="setUp-main">
        <div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/newphone')">
          <div>手机绑定</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/inputpaypassword')">
          <div>支付密码</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="setUp-list flex-row-between" @click="$router.push('')">
          <div>微信绑定</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/help')">
          <div>帮助中心</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/sla')">
          <div>服务协议</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/feedback')" style="border: 0">
          <div>意见反馈</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
      </div>
      <div class="setUp-btn">
        <div class="btn-border-black margin-30">切换企业身份</div>
        <div class="btn-border-black margin">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'SetUp',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '设置'
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .setUp-main{margin: 0 0.2rem;padding: 0.2rem 0 0.4rem 0;}
  .setUp-main .setUp-list{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);border-bottom: 0.01rem solid #E8E8E8;padding-top: 0.2rem;padding-bottom: 0.15rem;}
  .setUp-btn{padding-bottom: 0.8rem;}
  .margin-30{margin: 0.3rem auto; }
  .margin{margin: 0 auto}
  .setUp-btn .setUp-btn-div{width:2.36rem;height:0.48rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);line-height: 0.48rem;text-align: center}
</style>
