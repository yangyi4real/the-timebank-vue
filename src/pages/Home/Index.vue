<template>
    <div class="body">
      <div class="home-nav text-center">
        时间银行
      </div>
      <div class="wapper">
        <p class="chose-p"><i class="iconfont iconshenfenzheng"></i>选择身份</p>
        <div class="chose-btn clearfix">
          <div class="chose-btn-left chose-btn-div" :class="{active: shows == 1}" @click="jsClick">讲师</div>
          <div class="chose-btn-right chose-btn-div" :class="{active: shows == 2}" @click="qyClick">企业</div>
        </div>
        <div class="operation-button">
          <div v-show="jsBtnClick">
            <div class="btn-border-black" @click="jsLoginClick">登录</div>
            <div style="height: 0.3rem;"></div>
            <div class="btn-border-black" @click="jsRegisterClick">注册</div>
          </div>
          <div v-show="qyBtnClick">
            <div class="btn-border-black" @click="qyLoginClick">登录</div>
            <div style="height: 0.3rem;"></div>
            <div class="btn-border-black" @click="qyRegisterClick">注册</div>
          </div>
          <div style="height: 0.3rem;"></div>
          <!--<div class="btn-border-black">微信用户一键登录</div>-->
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      shows: 1,
      jsBtnClick: true,
      qyBtnClick: false
    }
  },
  computed: {
  },
  methods: {
    jsClick () {
      this.shows = 1
      this.jsBtnClick = true
      this.qyBtnClick = false
    },
    qyClick () {
      this.shows = 2
      this.jsBtnClick = false
      this.qyBtnClick = true
    },
    jsLoginClick () {
      this.$router.push('/login/1')
    },
    jsRegisterClick () {
      this.$router.push('/register/1')
    },
    qyLoginClick () {
      this.$router.push('/login/2')
    },
    qyRegisterClick () {
      this.$router.push('/register/2')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;text-align: center}
  .wapper .chose-p{font-size:0.2rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-top: 0.9rem;padding-bottom: 0.6rem;}
  .wapper .chose-p i{font-size: 0.22rem;margin-right: 0.1rem;color: #F95B40}
  .wapper .chose-btn-div{width: 1.2rem;height:0.6rem;border-radius: 0.05rem;border:0.01rem solid rgba(249,91,64,1);line-height: 0.6rem;font-size: 0.18rem;
    font-family:PingFangSC-Medium;float: left}
  .chose-btn-left{margin: 0 0.5rem;}
  .active{background: #F95B40;color: #fff;}
  .operation-button{padding-top: 1rem;padding-bottom: 1.07rem;}
</style>
