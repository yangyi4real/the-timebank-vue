<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="pro-data">
        <div class="pro-data-head padding-20">
          <div class="clearfix">
            <div class="head flex-row-start fl">
              <div class="head-img">
                <img src=""/>
              </div>
              <div>
                <label>王琼<i class="iconfont iconnv main-color"></i></label>
                <p>24岁 | 工作两年 | 青岛</p>
              </div>
            </div>
            <div class="fr">
              <i class="iconfont iconbianji main-color"></i>
            </div>
          </div>
          <div class="pro-data-head-number">
            <div><i class="iconfont iconshouji main-color"></i>158****3445</div>
            <div><i class="iconfont iconyouxiang main-color"></i>112616****@qq.com</div>
          </div>
        </div>
        <div class="pro-data-intention padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>存储意向</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            <div><i class="iconfont iconqiwangzhiwei main-color"></i>产品经理/UI-设计…</div>
            <div class="padding-20"><i class="iconfont iconditu main-color"></i>青岛/烟台/淄博/济南/潍坊</div>
            <div><i class="iconfont icongongzi main-color"></i>100元/小时</div>
          </div>
        </div>
        <div class="pro-data-introduce padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>个人介绍</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravi dadolor sit amet lacus accumsan et viverra justo commodo.
          </div>
        </div>
        <div class="pro-data-class padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>课程介绍</div>
            <div class="main-color">添加</div>
          </div>
          <div class="flex-row-between padding-15-top">
            <div>课程名称</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="padding-15-top">课程标签</div>
          <div class="padding-15-top">课程内容/描述</div>
        </div>
        <div class="pro-data-service padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>服务案例</div>
            <div class="main-color">添加</div>
          </div>
          <div class="flex-row-between">
            <div>课程名称</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="padding-15-top">企业名称</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'PersonalData',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '个人资料'
    }
  },
  created () {},
  computed: {
  },
  methods: {
    // cancelClick () {},
    // pushClick () {
    //   this.$router.push('')
    // }
  },
  mounted () {},
  watch: {}
}
</script>

<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;padding-top: 0.25rem}
  .pro-data{padding: 0 0.2rem;}
  .pro-data-border{border-top: 0.01rem solid #E8E8E8;}
  .padding-20{padding: 0.2rem 0;}
  .padding-15-top{padding-top: 0.15rem}
  .pro-data-title{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.2rem;}
  .pro-data-head .head-img img{width:0.67rem;height:0.67rem;background:rgba(216,216,216,1);border-radius:0.05rem;margin-right: 0.15rem}
  .pro-data-head .head label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .pro-data-head .head label i{padding-left: 0.1rem;}
  .pro-data-head .head p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .pro-data-head .pro-data-head-number{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .pro-data-head .pro-data-head-number div{padding-top: 0.2rem}
  .pro-data-head .pro-data-head-number div i{padding-right: 0.15rem;}
  .pro-data-introduce-cont div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .pro-data-introduce-cont div i{padding-right: 0.15rem;}
  pro-data-introduce-cont{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .pro-data-introduce-cont img{margin: 0.15rem 0;}
</style>
