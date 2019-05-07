<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="order-details">
        <div class="order-info flex-row-around">
          <div class="order-info-left"><img src=""/></div>
          <div class="order-info-right">
            <label>王琼<i class="iconfont iconnv main-color"></i></label>
            <p>24岁 | 工作两年 | 青岛</p>
            <p>专注研究产品设计</p>
          </div>
        </div>
        <div class="order-content">
          <div class="order-content-text">约讲内容：产品经理/UI-设计/Axure原型设计</div>
          <div class="clearfix order-content-text">
            <div class="fl">约讲时间：</div>
            <div class="fl">
              <p>2019-04-21 9:00-18:00</p>
              <p>2019-04-21 9:00-18:00</p>
            </div>
          </div>
          <div class="order-content-text">约讲地址：市北区诺德广场A座1606室</div>
          <div>需求：市北区诺德广场A座1606室</div>
        </div>
        <div class="order-sign-up">
          <div class="order-sign-up-title">报名信息</div>
          <div class="order-sign-up-info">
            <p>联系人：王琼</p>
            <p>联系方式：156****4633</p>
            <p>参与人数：10人</p>
            <p>创建时间：2019-04-21 9:21:23</p>
            <p>支付时间：2019-04-21 9:21:23</p>
          </div>
          <div class="order-opt">
            <p class="text-right">实付金额：<span>2000.00</span> 元</p>
            <div class="order-opt-btn flex-row-end">
              <div>取消订单</div>
              <div>联系客服</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'OrderDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '订单详情'
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .order-details{padding: 0.5rem 0.2rem;}
  .order-info-left img{width: 1rem;height: 1rem;}
  .order-info-right label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);line-height: 0.3rem;}
  .order-info-right p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .order-content{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .order-content .order-content-text{padding-bottom: 0.1rem;}
  .order-sign-up .order-sign-up-title{padding: 0.2rem 0;font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .order-sign-up .order-sign-up-info p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .order-opt p{padding: 0.2rem 0;font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(51,51,51,1);}
  .order-opt p span{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .order-opt{padding-bottom: 0.2rem;}
  .order-opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
