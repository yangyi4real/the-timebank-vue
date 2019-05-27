<template>
  <div class="body">
    <div class="home-nav text-center">
      日历
    </div>
    <div class="wapper">
      <div class="calendar">
        <div class="none-rili" v-if="this.listData.authStatus === '' || this.listData.authStatus === null" >
          <div class="flex-row-between caozuo">
            <div></div>
            <div @click="noneCalendarClick" v-if="this.$SaiLei.cookiesGet('user_name') !== '' && this.$SaiLei.cookiesGet('user_name') !== null">存储时间</div>
            <div @click="noneCalendarClicked" v-if="this.$SaiLei.cookiesGet('user_name') === '' || this.$SaiLei.cookiesGet('user_name') === null">存储时间</div>
          </div>
          <div style="padding-top: 0.3rem;">
            <p>计划赶不上变化</p>
            <p>还是去存储三个月内的时间吧~</p>
            <br>
            <br>
            <br>
            <div class="btn-border-black" v-if="this.$SaiLei.cookiesGet('user_name') === '' || this.$SaiLei.cookiesGet('user_name') === null" @click="$router.push('/personal/information/basedata')">完善信息</div>
          </div>
        </div>
        <div v-if="this.listData.authStatus === 1">
          <div class="flex-row-between caozuo">
            <div></div>
            <div @click="addCalendarClick">存储时间</div>
          </div>
          <Calendar
            ref='Calendar'
            :markDateMore='timeList'
            v-on:isToday='clickToday'
            agoDayHide='1554048000'
            futureDayHide='1561910399'
            :sundayStart = 'true'
            v-on:choseDay='clickDay'
            v-on:changeMonth='changeDate'
          ></Calendar>
        </div>
        <div class="flex-row-between mingci" @click="clickDefinitions">
          <div><span class="color-999">D</span> 未存储</div>
          <div><span class="main-color">D</span> 存储未约</div>
          <div><span class="main-color borderRadius">D</span> 有约需确认</div>
          <div><span class="main-color borderRadius borderRadiusBack">D</span> 已约 <i class="iconfont iconjiantou" style="font-size: 0.15rem"></i></div>
        </div>
      </div>
      <!--<div class="calendarMsg">-->
        <!--<div class="flex-row-between">-->
          <!--<div>存储时间</div>-->
          <!--<div>是</div>-->
        <!--</div>-->
        <!--<div class="flex-row-between">-->
          <!--<div>时间段</div>-->
          <!--<div></div>-->
        <!--</div>-->
        <!--<div class="flex-row-between">-->
          <!--<div>约讲</div>-->
          <!--<div>已存</div>-->
        <!--</div>-->
      <!--</div>-->
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
      timeList: [],
      authStatus: 0,
      className: 'mark1',
      listData: []
    }
  },
  computed: {},
  mounted () {
    this.loadDataList()
    this.loadData()
  },
  methods: {
    noneCalendarClick () {
      lib.MessageAlert_Error('请您先认证，再添加储存时间')
      this.$router.push('/personal/information/authentication-center')
    },
    noneCalendarClicked () {
      lib.MessageAlert_Error('请您先完善信息，再添加储存时间')
      this.$router.push('/personal/information/basedata')
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          _this.sex = res.result.sex
        } else {
          console.log(res.message)
        }
      })
    },
    loadDataList () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      _this.$_HTTPData.getSavedTime(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.timeList = res.result
          for (let i = 0; i < _this.timeList.length; i++) {
            _this.$set(_this.timeList[i], 'className', 'mark1')
          }
          console.log(_this.timeList)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    addCalendarClick () {
      this.$router.push('/calendar/addcalendat')
    },
    clickDefinitions () {
      this.$router.push('/calendar/definitions')
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
  .wapper{border-radius:0.05rem;margin: 0 0.1rem;}
  .calendar{background:rgba(255,255,255,1);}
  .caozuo{padding: 0.15rem 0;font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);border-bottom: 0.01rem solid #ccc;margin: 0 0.15rem;}
  .mingci{padding: 0.2rem 0;margin: 0 0.15rem;font-size: 0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .borderRadius{border:0.01rem solid rgba(249,91,64,1);border-radius: 1rem;padding: 0 0.05rem;}
  .borderRadiusBack{background: rgba(249,91,64,1);color: #fff;}
  .wh_container >>> .mark1 {color: rgba(249,91,64,1);}
  .wh_container >>> .mark2 {background: rgba(249,91,64,1);color: #fff;border-radius: 1rem;width: 0.4rem!important;}
  .wh_container >>> .mark3 {color: rgba(249,91,64,1);border: 0.01rem solid rgba(249,91,64,1);border-radius: 1rem;width: 0.4rem!important;}
  .none-rili{text-align: center;padding: 0 0 1rem 0;}
  .none-rili p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);}
</style>
