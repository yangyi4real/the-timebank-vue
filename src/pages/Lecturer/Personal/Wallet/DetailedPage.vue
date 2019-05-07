<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="detailed-page-list flex-row-between">
        <div>入账金额</div>
        <div>100.00</div>
      </div>
      <div class="detailed-page-list-padding">
        <div class="detailed-page-list2 flex-row-between" v-for="(item, index) in detailedPageItems" :key="index">
          <div>{{item.title}}</div>
          <div>{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'DetailedPage',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '时间银行',
      detailedPageItems: [
        {title: '交易单号', text: '2019025456212225444'},
        {title: '时间', text: '2019-03-01 09:17:48'},
        {title: '交易类型', text: '充值'},
        {title: '总收入', text: '5000.00'},
        {title: '服务费', text: '100.00'},
        {title: '所用SDG', text: '200.00'},
        {title: '企业消费', text: '50.00'}
      ]
    }
  },
  created () {},
  computed: {
  },
  methods: {},
  mounted () {},
  watch: {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .detailed-page-list{border-bottom: 0.01rem solid #E8E8E8;padding: 0.5rem 0 0.3rem 0;margin: 0 0.2rem;}
  .detailed-page-list div{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .detailed-page-list2{padding: 0.1rem 0;margin: 0 0.2rem;}
  .detailed-page-list2 div{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .detailed-page-list-padding{padding-top: 0.1rem;padding-bottom: 0.3rem;}
</style>
