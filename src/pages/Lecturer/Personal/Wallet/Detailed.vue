<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper" v-show="isShow">
      <div class="detailed-list flex-row-between" v-for="(item, index) in detailedItems" :key="index" @click="detailsClicked">
        <div class="detailed-list-left">
          <p>{{item.title}}</p>
          <p class="time">{{item.time}}</p>
        </div>
        <div class="detailed-list-right">
          {{item.amount}}
        </div>
      </div>
    </div>
    <div class="wapper" v-show="isShow2">
      <div class="no-record">
        <img src="" alt="aa"/>
        <p>暂无记录，敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'Detailed',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '明细',
      isShow: true,
      isShow2: false,
      detailedItems: [
        {title: '充值', time: '2019-02-12 12:22:15', amount: '+100.00'},
        {title: '课程收入', time: '2019-02-12 12:22:15', amount: '+500.00'},
        {title: '购买SDG', time: '2019-02-12 12:22:15', amount: '-100.00'}
      ]
    }
  },
  created () {},
  computed: {
  },
  methods: {
    detailsClicked () {
      this.$router.push('/personal/wallet/detailedpage')
    }
  },
  mounted () {},
  watch: {}
}
</script>
<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .detailed-list{padding: 0.2rem 0;margin: 0 0.2rem;border-bottom: 0.01rem solid #E8E8E8;}
  .detailed-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .detailed-list-left .time{font-size:0.13rem!important;font-family:PingFangSC-Regular;font-weight:400;color:rgba(143,143,143,1)!important;padding-top: 0.05rem;}
  .detailed-list-right{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .no-record{padding: 2rem 0;text-align: center;}
  .no-record img{width: 1.2rem;height: 0.56rem;}
  .no-record p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);}
</style>
