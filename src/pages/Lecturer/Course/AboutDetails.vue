<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="number-code flex-row-between">
        <div>约讲编号：21982235666664392</div>
        <div>待确认</div>
      </div>
      <div class="about-details-main">
        <div class="about-details-main-text">
          <label>约讲企业：青岛赛雷信息科技有限公司</label>
          <div class="flex-row-start">
            <div>企业评分：</div>
            <div>
              <yd-cell-item>
                <yd-rate slot="left" v-model="rate" color="#E2E2E2" active-color="#FED500" size="0.25rem"></yd-rate>
              </yd-cell-item>
            </div>
          </div>
          <div class="clearfix">
            <div class="fl">约讲时间：</div>
            <div class="fl"><p>2019-04-24 9:00-18:00</p><p>2019-04-24 9:00-18:00</p></div>
          </div>
          <div class="padding-top-10">约讲地址：市北区诺德广场A座1606室</div>
          <div class="padding-top-10">参与人数：30人</div>
          <div class="padding-top-10">需求：市北区诺德广场A座1606室</div>
        </div>
        <div class="about-details-main-msg">
          <p>时间信息</p>
          <div>订单时间：2019-04-21 9:21:23</div>
          <div>确认时间：2019-04-21 9:21:23</div>
          <div>取消时间：2019-04-21 9:21:23</div>
          <div>拒绝/取消原因：市北区诺德广场A座1606室市北区诺 </div>
        </div>
      </div>
      <div class="order-center-list-opt">
        <p class="text-right">合计：<span>2000.00</span>元</p>
        <div class="opt-btn flex-row-end">
          <div>接受</div>
          <div>拒绝</div>
          <div>联系客服</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'AboutDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '约讲详情',
      rate: 4
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .number-code{padding: 0.15rem 0.2rem;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .about-details-main{padding: 0 0.2rem;}
  .about-details-main .about-details-main-text{border-bottom: 0.01rem solid #E8E8E8;border-top: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .about-details-main .about-details-main-text label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);display: block}
  .about-details-main .about-details-main-text div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .padding-top-10{padding-top: 0.1rem;}
  .about-details-main .about-details-main-msg p{font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding: 0.2rem 0;}
  .about-details-main .about-details-main-msg div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-bottom: 0.1rem;}
  .order-center-list-opt{padding: 0.3rem 0.2rem 0.5rem 0.2rem;}
  .order-center-list-opt p{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color: #333;}
  .order-center-list-opt p span{color:rgba(249,91,64,1);}
  .msg-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .msg-time div{padding-bottom: 0.07rem;}
  .msg-time div p{padding-bottom: 0.05rem;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
