<template>
  <div class="body">
    <div class="home-nav text-center">
      约讲记录
    </div>
    <div class="tab flex-row-around">
      <div v-for="(item,index) in tabItems" :key="index" class="s-tab" :class="{ active: changeTab === index}" @click="tabsClicked(index)">
        {{ item.name }}
      </div>
    </div>
    <div class="wapper">
      <div class="course-list-none" v-show="Tips">
        <p><span class="main-color">存储时间</span> 后，企业才能跟你对讲哦</p>
      </div>
      <div v-show="listItem">
        <div class="order-center-list" @click="aboutDetailsClick">
          <div class="order-center-list-msg">
            <div class="clearfix">
              <div class="order-center-list-msg-div fl">
                约讲企业：青岛赛雷科技有限公司
              </div>
              <div class="tip fr">待评价</div>
            </div>
            <div class="msg-time">
              <div>约讲地址：市北区敦化路诺德广场A座</div>
              <div class="flex-row-start">
                <div>约讲时间：</div>
                <div><p>2019-04-24 9:00-18:00</p><p>2019-04-24 9:00-18:00</p></div>
              </div>
            </div>
          </div>
          <div class="order-center-list-opt">
            <p class="text-right">参与人数：10人&nbsp;&nbsp;&nbsp;&nbsp;合计：2000.00</p>
            <div class="opt-btn flex-row-end">
              <div @click="evaluateClick">评价</div>
              <div>联系客服</div>
            </div>
          </div>
        </div>
        <div class="order-center-list">
          <div class="order-center-list-msg">
            <div class="clearfix">
              <div class="order-center-list-msg-div fl">
                约讲企业：青岛赛雷科技有限公司
              </div>
              <div class="tip fr">待付款</div>
            </div>
            <div class="msg-time">
              <div>约讲地址：市北区敦化路诺德广场A座</div>
              <div class="flex-row-start">
                <div>约讲时间：</div>
                <div><p>2019-04-24 9:00-18:00</p><p>2019-04-24 9:00-18:00</p></div>
              </div>
            </div>
          </div>
          <div class="order-center-list-opt">
            <p class="text-right">参与人数：10人&nbsp;&nbsp;&nbsp;&nbsp;合计：2000.00</p>
            <div class="opt-btn flex-row-end">
              <div>接受</div>
              <div>拒绝</div>
              <div>联系客服</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tabbar :idx="1"></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../../views/Tabbar/Tabbar'
export default {
  name: 'CourseIndex',
  components: {
    Tabbar
  },
  data () {
    return {
      tabItems: [
        {name: '全部'},
        {name: '待确认'},
        {name: '待开课'},
        {name: '待评价'},
        {name: '已完成'}
      ],
      changeTab: 0,
      Tips: false,
      listItem: true
    }
  },
  computed: {
  },
  methods: {
    tabsClicked (index) {
      this.changeTab = index
    },
    evaluateClick () {
      this.$router.push('/course/evaluate')
    },
    aboutDetailsClick () {
      this.$router.push('/course/aboutdetails')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .tab{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.1rem 0.1rem;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;height: 0.46rem;line-height: 0.46rem;}
  .s-tab{color:rgba(0,0,0,1);}
  .active{color: #F95B40}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;}
  .wapper .course-list-none{text-align: center}
  .wapper .course-list-none p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding: 0.6rem 0;}
  .wapper .course-list-none p span{border-bottom: 0.01rem solid #F95B40;}
  .order-center-list{margin: 0 0.2rem;}
  .order-center-list .order-center-list-msg{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .order-center-list-msg .order-center-list-msg-div{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.15rem;}
  .order-center-list-msg .tip{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .order-center-list-opt p{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .msg-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .msg-time div{padding-bottom: 0.07rem;}
  .msg-time div p{padding-bottom: 0.05rem;}
  .order-center-list-opt{padding-bottom: 0.2rem;border-bottom: 0.01rem solid #E8E8E8;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
