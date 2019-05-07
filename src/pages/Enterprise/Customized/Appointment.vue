<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div></div>
      <div class="choice-time-list">
        <div class="flex-row-between choice-time-list-div">
          <div class="choice-time-list-left">所选时间</div>
          <div>2019-04-24</div>
        </div>
        <div class="flex-row-between choice-time-list-div padding-top-15">
          <div class="choice-time-list-left">约讲时间</div>
          <div class="choice-time-list-right">9:00-18：00</div>
        </div>
      </div>
      <div class="choice-time-list">
        <div class="flex-row-between choice-time-list-div">
          <div class="choice-time-list-left">所选时间</div>
          <div>2019-04-24</div>
        </div>
        <div class="flex-row-between choice-time-list-div padding-top-15">
          <div class="choice-time-list-left">约讲时间</div>
          <div class="choice-time-list-right">9:00-18：00</div>
        </div>
      </div>
      <div class="choice-time-list">
        <div class="flex-row-between choice-time-list-div">
          <div class="choice-time-list-left">所选时间</div>
          <div>2019-04-24</div>
        </div>
        <div class="flex-row-between choice-time-list-div padding-top-15">
          <div class="choice-time-list-left">约讲时间</div>
          <div class="choice-time-list-right">9:00-18：00</div>
        </div>
      </div>
      <div class="choice-btn">
        <div class="btn-border" @click="appointmentClick">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'Appointment',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '预约'
    }
  },
  computed: {},
  methods: {
    appointmentClick () {
      this.$router.push('/customized/appointmentinput')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .padding-top-15{padding-top: 0.15rem;}
  .choice-time-list{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;}
  .choice-time-list .choice-time-list-div{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;}
  .choice-time-list .choice-time-list-div .choice-time-list-right{color:rgba(249,91,64,1);}
  .choice-btn{padding: 0.6rem 0;}
</style>
