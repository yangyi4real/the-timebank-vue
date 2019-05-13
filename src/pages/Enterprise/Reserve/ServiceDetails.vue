<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="main">
        <div class="banner">
          <img src="" >
        </div>
        <div class="main-center">
          <div class="main-center-title">
            <div class="main-center-title-name flex-row-start">
              <div class="name">服务包名称&nbsp;&nbsp;&nbsp;</div>
              <div class="btn">自选讲课方向</div>
              <div class="btn">认证高端讲师</div>
            </div>
            <div class="flex-row-between">
              <div class="flex-row-start">
                <div class="font-size-15 font-family-reg font-weight-400 color-333">
                  综合评分：
                </div>
                <div class="main-center-title-star">
                  <yd-cell-item>
                    <yd-rate slot="left" v-model="rate" color="#E2E2E2" active-color="#FED500" size="0.2rem" :readonly="true"></yd-rate>
                  </yd-cell-item>
                </div>
              </div>
              <div class="font-size-15 font-family-reg font-weight-400 color-333">
                服务区域：不限
              </div>
            </div>
            <div class="main-center-title-price text-right">
              20000元<span class="span-position">2999元</span>
            </div>
          </div>
          <div class="main-center-tab clearfix">
            <div class="fl main-center-tab-lf" :class="{ 'color-black': inOperation, 'color-F9': operation}" @click="introduceShow">服务介绍</div>
            <div class="fl" :class="{ 'color-black': operation, 'color-F9': inOperation}" @click="evaluateShow">评价 20</div>
          </div>
          <div class="main-center-introduce" v-show="introduce">
            内容介绍介绍介绍介绍：讲师介绍，课程介绍、服务案例 （历史案例、平台案例）、评价，若点击每个菜单按钮直 接切换至此模块；4.咨询：咨询客服，点击弹出电话，可 以进行拨打。。
          </div>
          <div class="main-center-evaluate" v-show="evaluate">
            <div class="main-center-evaluate-list flex-row-start">
              <div class="main-center-evaluate-list-left"><img src=""/></div>
              <div class="main-center-evaluate-list-right">
                <label>青岛赛雷科技有限公司</label>
                <span>2019-04-21</span>
                <p><i class="iconfont iconxing star"></i><i class="iconfont iconxing star"></i><i class="iconfont iconxing star"></i><i class="iconfont iconxing star"></i><i class="iconfont iconxing star"></i> 非常推荐</p>
                <div class="right-text"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base-btn flex-row-between">
      <div class="base-btn-div"><i class="iconfont icondianhua main-color"></i>咨询</div>
      <div class="base-btn-div"><i class="iconfont iconshoucang main-color"></i>收藏</div>
      <div class="base-btn-div"><i class="iconfont iconfenxiang- main-color"></i>分享</div>
      <div class="base-btn-right" @click="purchaseClick">
        <p>购买</p>
        <label>（合计：2000元）</label>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'ServiceDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '服务详情',
      rate: 4,
      inOperation: false,
      operation: true,
      introduce: true,
      evaluate: false
    }
  },
  computed: {},
  methods: {
    introduceShow () {
      this.introduce = true
      this.evaluate = false
      this.operation = true
      this.inOperation = false
    },
    evaluateShow () {
      this.introduce = false
      this.evaluate = true
      this.operation = false
      this.inOperation = true
    },
    purchaseClick () {
      this.$router.push('/reserve/purchase')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .wapper{border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .main .banner{margin-bottom: 0.1rem;}
  .main .banner img{width: 100%;height: 1.66rem;}
  .main-center{background:rgba(255,255,255,1);padding: 0 0.2rem;}
  .main-center .main-center-title{padding: 0.2rem 0;}
  .main-center .main-center-title .main-center-title-name .name{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .main-center .main-center-title .main-center-title-name .btn{width: 1rem;height: 0.28rem;background:rgba(249,91,64,1);border-radius:0.05rem;color: #fff;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;line-height: 0.28rem;text-align: center;margin-left: 0.1rem;}
  .main-center-title-price{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);padding-top: 0.1rem}
  .main-center-title-price span{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);text-decoration: line-through;padding-left: 0.1rem;}
  .main-center-tab{border-bottom: 0.01rem solid #E8E8E8;border-top: 0.01rem solid #E8E8E8;}
  .main-center-tab div{width: 50%;text-align: center;padding-top: 0.15rem;padding-bottom: 0.2rem;}
  .main-center-tab .main-center-tab-lf{border-right: 0.01rem solid #E8E8E8;}
  .main-center-introduce{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding: 0.2rem 0;}
  .main-center-evaluate-list{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .main-center-evaluate-list .main-center-evaluate-list-left{padding-right: 0.1rem;}
  .main-center-evaluate-list .main-center-evaluate-list-left img{width:0.53rem;height:0.53rem;}
  .main-center-evaluate-list .main-center-evaluate-list-right label{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .main-center-evaluate-list .main-center-evaluate-list-right span{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:#A7A7A7;display: block;padding: 0.06rem 0;}
  .main-center-evaluate-list .main-center-evaluate-list-right p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .main-center-evaluate-list .main-center-evaluate-list-right p i{padding-right: 0.03rem;}
  .right-text{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .color-black{color: #000000}
  .color-F9{color: #F95B40}
  .star{color:rgba(254,213,0,1);}
  .base-btn{width: 100%;height: 0.65rem; position: fixed;z-index: 100; bottom: 0;left: 0;margin: 0 0.01rem;background: #fff;}
  .base-btn .base-btn-div{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);width: 0.9rem;text-align: center;line-height: 0.65rem;}
  .base-btn .base-btn-div i{padding-right: 0.1rem}
  .base-btn .base-btn-right{background:rgba(249,91,64,1);border-radius:0.05rem;height: 0.65rem;text-align: center;width: 1.4rem;}
  .base-btn .base-btn-right p{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);padding-top: 0.1rem;}
  .base-btn .base-btn-right label{font-size:0.12rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);}
</style>
