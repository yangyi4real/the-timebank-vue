<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="calendar">
        <div>
          <Calendar
            ref='Calendar'
            :markDateMore='calendarList'
            v-on:isToday='clickToday'
            agoDayHide='1554048000'
            futureDayHide='1561910399'
            :sundayStart = 'true'
            v-on:choseDay='clickDay'
            v-on:changeMonth='changeDate'
          ></Calendar>
        </div>
        <div class="calebdar-time">
          <p>时间段</p>
          <div class="calebdar-time-div flex-row-around">
            <div class="calebdar-time-div-border"><yd-datetime start-date="09:00" end-date="23:59" type="time" v-model="dateTimeBegin" slot="right"></yd-datetime></div>
            <div class="calebdar-time-div-block">—</div>
            <div class="calebdar-time-div-border"><yd-datetime start-date="09:00" end-date="23:59" type="time" v-model="dateTimeEnd" slot="right"></yd-datetime></div>
          </div>
        </div>
      </div>
      <div class="none-rili">
        <p>温馨提示：存储时间后，企业可以在您存储的时间内进行约讲，讲课费用将在企业评价后进入钱包中，平台将收取n%的服务费</p>
      </div>
      <div class="class-btn">
        <div class="btn-border" @click="subClick">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
import Calendar from 'vue-calendar-component'
import TipsTools from '../../../common/TipsTools'
import moment from 'moment'

let lib = new TipsTools()

export default {
  name: 'AddCalendar',
  components: {
    Navbar,
    Calendar
  },
  data () {
    return {
      titleMsg: '存储时间',
      calendarList: [],
      calendarData: '',
      dateTimeBegin: '',
      dateTimeEnd: ''
    }
  },
  computed: {
  },
  mounted () {
    // this.loadDataList()
  },
  methods: {
    clickDay (data) {
      this.calendarData = data
    },
    // loadDataList () {
    //   let _this = this
    //   let formData = new FormData()
    //   formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
    //   _this.$_HTTPData.getSavedTime(_this, formData, function (res) {
    //     if (res.code === 0 || res.code === '000') {
    //       let temp = JSON.stringify(res.result)
    //       let temp2 = temp.replace(/status/g, 'className')
    //       _this.calendarList = JSON.parse(temp2)
    //       for (let i = 0; i < _this.calendarList.length; i++) {
    //         let item = _this.calendarList[i]
    //         console.log(item)
    //         if (item.className === 0) {
    //           item.className = 'mark1'
    //         }
    //         if (item.className === 1) {
    //           item.className = 'mark2'
    //         }
    //         if (item.className === 2) {
    //           item.className = 'mark3'
    //         }
    //       }
    //       console.log(_this.calendarList)
    //     } else {
    //       lib.MessageAlert_None(res.message)
    //     }
    //   })
    // },
    subClick () {
      let beginDate = moment(`${this.calendarData} ${this.dateTimeBegin}`, 'YYYY-MM-DD HH:mm:ss').format()
      let endDate = moment(`${this.calendarData} ${this.dateTimeEnd}`, 'YYYY-MM-DD HH:mm:ss').format()
      let calendarTime = Date.parse(this.calendarData)
      let beginDateTime = Date.parse(beginDate)
      let endDateTime = Date.parse(endDate)
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', calendarTime)
      formData.append('begin', beginDateTime)
      formData.append('end', endDateTime)
      _this.$_HTTPData.getStoreTime(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_None(res.message)
          _this.$router.push('/calendar/index')
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    clickToday (data) {
      // console.log('跳到了本月今天', data)
    },
    changeDate (data) {
      // console.log('左右点击切换月份', data)
    }
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .wh_container >>> .mark1 {color: rgba(249,91,64,1);}
  .wh_container >>> .mark2 {background: rgba(249,91,64,1);color: #fff;border-radius: 1rem;width: 0.4rem!important;}
  .wh_container >>> .mark3 {color: rgba(249,91,64,1);border: 0.01rem solid rgba(249,91,64,1);border-radius: 1rem;width: 0.4rem!important;}
  .none-rili{text-align: center;padding: 0.2rem 0.35rem 0 0.35rem;}
  .none-rili p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);}
  .class-btn{padding: 0.6rem 0;}
  .calebdar-time{padding: 0.3rem 0.2rem 0.2rem 0.2rem;}
  .calebdar-time p{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.08rem;}
  .calebdar-time{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
  .calebdar-time-div{padding: 0 0.8rem;}
  .calebdar-time-div .calebdar-time-div-border{border-bottom: 0.01rem solid #E8E8E8;padding-bottom: 0.14rem;}
  .calebdar-time-div-block{color: #999999!important;}
</style>
