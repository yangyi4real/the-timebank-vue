<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="order-center-list">
        <div class="order-center-list-msg" @click="OrderDetailsClick">
          <div class="flex-row-between">
            <div class="order-center-list-msg-div flex-row-start">
              <div class="msg-left"><img src=""/></div>
              <div class="msg-right">
                <label>王琼<i class="iconfont iconnv main-color"></i></label>
                <p>24岁 | 工作两年 | 青岛</p>
                <p>专注研究产品设计</p>
              </div>
            </div>
            <div class="tip">待付款</div>
          </div>
          <div class="msg-time">
            <div>约讲内容：产品经理/axure原型设计</div>
            <div class="flex-row-start">
              <div>约讲时间：</div>
              <div><p>2019-04-24 9:00-18:00</p><p>2019-04-24 9:00-18:00</p></div>
            </div>
          </div>
        </div>
        <div class="order-center-list-opt">
          <p class="text-right">合计：2000.00</p>
          <div class="opt-btn flex-row-end">
            <div>去支付</div>
            <div>取消订单</div>
            <div>联系客服</div>
          </div>
        </div>
      </div>
      <div class="order-center-list">
        <div class="order-center-list-msg">
          <div class="flex-row-between">
            <div class="order-center-list-msg-div flex-row-start">
              <div class="msg-left"><img src=""/></div>
              <div class="msg-right">
                <label>王琼<i class="iconfont iconnv main-color"></i></label>
                <p>24岁 | 工作两年 | 青岛</p>
                <p>专注研究产品设计</p>
              </div>
            </div>
            <div class="tip">待付款</div>
          </div>
          <div class="msg-time">
            <div>约讲内容：产品经理/axure原型设计</div>
            <div class="flex-row-start">
              <div>约讲时间：</div>
              <div><p>2019-04-24 9:00-18:00</p><p>2019-04-24 9:00-18:00</p></div>
            </div>
          </div>
        </div>
        <div class="order-center-list-opt">
          <p class="text-right">合计：2000.00</p>
          <div class="opt-btn flex-row-end">
            <div>去支付</div>
            <div>取消订单</div>
            <div>联系客服</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'AllOrder',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '全部订单'
    }
  },
  computed: {},
  methods: {
    OrderDetailsClick () {
      this.$router.push('/user/OrderDetails')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .order-center-list{margin: 0 0.2rem;}
  .order-center-list .order-center-list-msg{padding: 0.2rem 0;}
  .order-center-list-msg .order-center-list-msg-div .msg-left{padding-right: 0.15rem;}
  .order-center-list-msg .order-center-list-msg-div .msg-left img{width: 0.6rem;height: 0.6rem;}
  .order-center-list-msg .order-center-list-msg-div .msg-right label{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .order-center-list-msg .order-center-list-msg-div .msg-right label i{padding-left: 0.1rem;}
  .order-center-list-msg .order-center-list-msg-div .msg-right p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .order-center-list-msg .tip{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .order-center-list-opt p{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .msg-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .msg-time div{padding-bottom: 0.07rem;}
  .msg-time div p{padding-bottom: 0.05rem;}
  .order-center-list-opt{padding-bottom: 0.2rem;border-top: 0.01rem solid #E8E8E8;border-bottom: 0.01rem solid #E8E8E8;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
