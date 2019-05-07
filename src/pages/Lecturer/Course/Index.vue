<template>
  <div class="body">
    <div class="home-nav text-center">
      约课记录
    </div>
    <div class="tab flex-row-around">
      <div v-for="(item,index) in tabItems" :key="index" class="s-tab" :class="{ active: changeTab === index}" @click="tabsClicked(index)">
        {{ item.name }}
      </div>
    </div>
    <div class="wapper">
      <div class="course-list-none">
        <p><span class="main-color">存储时间</span> 后，企业才能跟你对讲哦</p>
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
      changeTab: 0
    }
  },
  computed: {
  },
  methods: {
    tabsClicked (index) {
      this.changeTab = index
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
</style>
