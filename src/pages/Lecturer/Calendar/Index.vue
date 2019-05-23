<template>
  <div class="body">
    <div class="home-nav text-center">
      日历
    </div>
    <div class="wapper">
      <div class="calendar">
        <div class="flex-row-between caozuo">
          <div>回到今天</div>
          <div @click="addCalendarClick">存储时间</div>
        </div>
        <div v-if="this.authStatus === 0" class="none-rili">
          <p>计划赶不上变化</p>
          <p>还是去存储三个月内的时间吧~</p>
        </div>
        <div v-if="this.authStatus === 1">
          <Calendar
            ref='Calendar'
            :markDateMore='arr'
            v-on:isToday='clickToday'
            agoDayHide='1554048000'
            futureDayHide='1561910399'
            :sundayStart = 'true'
            v-on:choseDay='clickDay'
            v-on:changeMonth='changeDate'
          ></Calendar>
        </div>
        <div class="flex-row-between mingci">
          <div><span class="color-999">D</span> 未存储</div>
          <div><span class="main-color">D</span> 存储未约</div>
          <div><span class="main-color borderRadius">D</span> 有约需确认</div>
          <div><span class="main-color borderRadius borderRadiusBack">D</span> 已约 <i class="iconfont iconjiantou" style="font-size: 0.15rem"></i></div>
        </div>
      </div>
    </div>
    <tabbar :idx="0"></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../../views/Tabbar/Tabbar'
import Calendar from 'vue-calendar-component'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'CalendarIndex',
  components: {
    Tabbar,
    Calendar
  },
  data () {
    return {
      arr: [
        {
          date: '2019-4-15',
          className: 'mark1'
        },
        {
          date: '2019-5-13',
          className: 'mark1'
        },
        {
          date: '2019-5-14',
          className: 'mark2'
        },
        {
          date: '2019-5-15',
          className: 'mark3'
        }
      ],
      authStatus: 0
    }
  },
  computed: {
  },
  mounted () {
    this.getMyinfo()
  },
  methods: {
    getMyinfo () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.authStatus = res.result.authStatus
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    addCalendarClick () {
      this.$router.push('/calendar/addcalendat')
    },
    clickDay (data) {
      console.log('选中了', data)
    },
    clickToday (data) {
      console.log('跳到了本月今天', data)
    },
    changeDate (data) {
      console.log('左右点击切换月份', data)
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;}
  .caozuo{padding: 0.15rem 0;font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);border-bottom: 0.01rem solid #ccc;margin: 0 0.15rem;}
  .mingci{padding: 0.2rem 0;margin: 0 0.15rem;font-size: 0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .borderRadius{border:0.01rem solid rgba(249,91,64,1);border-radius: 1rem;padding: 0 0.05rem;}
  .borderRadiusBack{background: rgba(249,91,64,1);color: #fff;}
  .wh_container >>> .mark1 {color: rgba(249,91,64,1);}
  .wh_container >>> .mark2 {background: rgba(249,91,64,1);color: #fff;border-radius: 1rem;width: 0.4rem!important;}
  .wh_container >>> .mark3 {color: rgba(249,91,64,1);border: 0.01rem solid rgba(249,91,64,1);border-radius: 1rem;width: 0.4rem!important;}
  .none-rili{text-align: center;padding: 1rem 0;}
  .none-rili p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);}
</style>
