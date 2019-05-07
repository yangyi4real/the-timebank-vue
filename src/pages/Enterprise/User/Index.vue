<template>
  <div class="body">
    <div class="home-nav text-center">
      时间银行
    </div>
    <div class="modular1">
      <div class="modular1-div flex-row-between">
        <div class="head flex-row-start">
          <div class="head-img">
            <!--<img :src="userIconUrl" @click="userIconDidClicked" class="User-icon">-->
            <img src="" @click="userIconDidClicked"/>
          </div>
          <div>
            <p class="head-text">完善企业信息</p>
            <p class="head-text2">企业编号：50976567</p>
          </div>
        </div>
        <div class="msg">
          <i class="iconfont iconlingdang main-color" @click="msgClick"></i>
        </div>
      </div>
    </div>
    <div class="modular2 flex-row-around">
      <div @click="walletClick">
        <label>20000.00</label>
        <p>钱包</p>
      </div>
      <div>
        <label>20000.00</label>
        <p class="border">奖励分红</p>
      </div>
      <div>
        <label>20000.00</label>
        <p>SDG</p>
      </div>
    </div>
    <div class="modular3">
      <div class="modular3-title flex-row-between">
        <div class="modular3-title-left">订单中心</div>
        <div class="modular3-title-right" @click="orderCenterClick">查看全部订单</div>
      </div>
      <div class="modular3-sort flex-row-between">
        <div>
          <img src=""/>
          <p>待付款</p>
        </div>
        <div>
          <img src=""/>
          <p>待付款</p>
        </div>
        <div>
          <img src=""/>
          <p>待开课</p>
        </div>
        <div>
          <img src=""/>
          <p>待评价</p>
        </div>
        <div>
          <img src=""/>
          <p>退款/售后</p>
        </div>
      </div>
    </div>
    <div class="modular4">
      <div class="modular4-div flex-row-around">
        <div @click="linkInvitation">
          <img src=""/>
          <p>邀请好友</p>
        </div>
        <div>
          <img src=""/>
          <p>收藏夹</p>
        </div>
        <div @click="linkSetUp">
          <img src=""/>
          <p>浏览记录</p>
        </div>
      </div>
      <div class="modular4-div flex-row-around">
        <div>
          <img src=""/>
          <p>联系客服</p>
        </div>
        <div>
          <img src=""/>
          <p>帮助中心</p>
        </div>
        <div @click="linkSetUp">
          <img src=""/>
          <p>服务协议</p>
        </div>
      </div>
      <div class="modular4-div flex-row-around">
        <div>
          <img src=""/>
          <p>意见反馈</p>
        </div>
        <div style="visibility:hidden">
          <img src=""/>
          <p>联系客服</p>
        </div>
        <div style="visibility:hidden">
          <img src=""/>
          <p>联系客服</p>
        </div>
      </div>
    </div>
    <tabbar-ent :idx="2"></tabbar-ent>
  </div>
</template>

<script>
import TabbarEnt from '../../../views/Tabbar/TabbarEnt'
export default {
  name: 'UserIndex',
  components: {
    TabbarEnt
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    // 个人中心
    userIconDidClicked () {
      this.$router.push('/user/personalcenter')
    },
    // 消息
    msgClick () {
      this.$router.push('/personal/msg')
    },
    // 钱包
    walletClick () {
      this.$router.push('/personal/wallet/index')
    },
    // 订单中心
    orderCenterClick () {
      this.$router.push('/user/ordercenter')
    },
    // 邀请好友
    linkInvitation () {
      this.$router.push('/personal/invitation')
    },
    // 设置
    linkSetUp () {
      this.$router.push('/personal/setup/index')
    },
    // 完善资料
    baseDataClick () {
      this.$router.push('/personal/information/basedata')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .modular1{background: #fff;padding: 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular2{background: #fff;padding: 0.4rem 0.3rem;margin: 0.1rem 0.1rem;border-radius:0.05rem;}
  .modular3{background: #fff;padding: 0 0.2rem;margin: 0 0.1rem 0.1rem 0.1rem;border-radius:0.05rem;}
  .modular4{background: #fff;padding: 0.2rem 0.2rem 1rem 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular1 .modular1-div{padding: 0.2rem 0;}
  .head-img{padding-right: 0.15rem;}
  .head-img img{width: 0.67rem;height: 0.67rem;}
  .head-text{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.05rem;}
  .head-text2{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular-data{font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .border{border-right: 0.01rem solid #D0D0D0;border-left: 0.01rem solid #D0D0D0;padding: 0 0.4rem;}
  .modular2 div{text-align: center;}
  .modular2 div p{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular2 div label{font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);padding-bottom: 0.15rem;display: block}
  .modular3 .modular3-title{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;background: #fff;}
  .modular3 .modular3-title .modular3-title-left{font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .modular3 .modular3-title .modular3-title-right{font-size:14px;font-family:PingFangSC-Regular;;font-weight:400;color:rgba(167,167,167,1);}
  .modular3 .modular3-sort{padding: 0.2rem 0;}
  .modular3 .modular3-sort div{text-align: center}
  .modular3 .modular3-sort div img{width: 0.22rem;height: 0.22rem;}
  .modular3 .modular3-sort div p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-top: 0.1rem;}
  .modular4 .modular4-title i{padding-right: 0.1rem}
  .modular4 .modular4-div{text-align: center;font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-top: 0.15rem;}
  .modular4 .modular4-div img{width: 0.3rem;height: 0.3rem;}
  .modular4 .modular4-div p{padding-top: 0.16rem}
  .modular-already div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .modular-already div span{padding-left: 0.1rem;}
  .modular-already p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-top: 0.15rem;}
</style>
