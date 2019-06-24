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
            :agoDayHide='timest'
            futureDayHide='1564588799'
            :sundayStart = 'true'
            v-on:choseDay='clickDay'
            v-on:changeMonth='changeDate'
          ></Calendar>
        </div>
        <div class="calebdar-time" v-show="tiemShow">
          <p>请选择时间段</p>
          <div class="calebdar-time-div flex-row-around">
            <div class="flex-row-between padding-bottom-15">
              <div>
                <el-time-select
                  placeholder="起始时间"
                  v-model="startTime"
                  :picker-options="{
                        start: '09:00',
                        step: '01:00',
                        end: '23:00',
                        editable: false
                      }">
                </el-time-select>
              </div>
              <div>
                <el-time-select
                  placeholder="结束时间"
                  v-model="endTime"
                  :picker-options="{
                        start: '10:00',
                        step: '01:00',
                        end: '23:00',
                        minTime: startTime,
                        editable: false
                      }">
                </el-time-select>
              </div>
            </div>
          </div>
        </div>
        <div class="none-rili">
          <p>温馨提示：存储时间后，企业可以在您存储的时间内进行约讲，讲课费用将在企业评价后进入钱包中，平台将收取n%的服务费</p>
        </div>
        <div class="class-btn" v-show="tiemShow">
          <div class="btn-border" @click="subClick">提交</div>
        </div>
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
      dateTimeEnd: '',
      dateInfo: [],
      calendarTimeToday: '1559635453',
      tiemShow: false,
      startTime: '',
      endTime: ''
    }
  },
  computed: {
    timest () {
      let tmp = Date.parse(new Date()).toString()
      tmp = tmp.substr(0, 10)
      tmp.toString()
      return tmp
    }
  },
  mounted () {
    this.loadDataList()
  },
  methods: {
    clickDay (data) {
      lib.LoadingHide()
      this.calendarData = Date.parse(data)
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', _this.calendarData)
      _this.$_HTTPData.getDateInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.dateInfo = res.result
          if (_this.dateInfo === null) {
            lib.MessageAlert_Success('当前日期可储存')
            _this.tiemShow = true
          } else {
            lib.MessageAlert_Warning('当前日期已储存')
            _this.tiemShow = false
          }
        }
      })
    },
    loadDataList () {
      // let tmp = Date.parse(new Date()).toString()
      // tmp = tmp.substr(0, 10)
      // this.calendarTimeToday = tmp
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      _this.$_HTTPData.getSavedTime(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          let temp = JSON.stringify(res.result)
          let temp2 = temp.replace(/status/g, 'className')
          _this.calendarList = JSON.parse(temp2)
          for (let i = 0; i < _this.calendarList.length; i++) {
            let item = _this.calendarList[i]
            if (item.className === 0) {
              item.className = 'mark1'
            }
            if (item.className === 1) {
              item.className = 'mark2'
            }
            if (item.className === 2) {
              item.className = 'mark3'
            }
          }
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    subClick () {
      let date = new Date(this.calendarData)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      this.calendarData = Y + M + D
      let beginDate = moment(`${this.calendarData} ${this.startTime}`, 'YYYY-MM-DD HH:mm:ss').format()
      let endDate = moment(`${this.calendarData} ${this.endTime}`, 'YYYY-MM-DD HH:mm:ss').format()
      let date2 = new Date(beginDate)
      let Y2 = date2.getFullYear() + '/'
      let M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '/'
      let D2 = (date2.getDate() < 10 ? '0' + (date2.getDate()) : date2.getDate()) + ' '
      let h = (date2.getHours() < 10 ? '0' + (date2.getHours()) : date2.getHours()) + ':'
      let m = (date2.getMinutes() < 10 ? '0' + (date2.getMinutes()) : date2.getMinutes()) + ':'
      let s = (date2.getSeconds() < 10 ? '0' + date2.getSeconds() : date2.getSeconds())
      beginDate = Y2 + M2 + D2 + h + m + s
      let date3 = new Date(endDate)
      let Y3 = date3.getFullYear() + '/'
      let M3 = (date3.getMonth() + 1 < 10 ? '0' + (date3.getMonth() + 1) : date3.getMonth() + 1) + '/'
      let D3 = (date3.getDate() < 10 ? '0' + (date3.getDate()) : date3.getDate()) + ' '
      let h2 = (date3.getHours() < 10 ? '0' + (date3.getHours()) : date3.getHours()) + ':'
      let m2 = (date3.getMinutes() < 10 ? '0' + (date3.getMinutes()) : date3.getMinutes()) + ':'
      let s2 = (date3.getSeconds() < 10 ? '0' + date3.getSeconds() : date3.getSeconds())
      endDate = Y3 + M3 + D3 + h2 + m2 + s2
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
          lib.MessageAlert_Success(res.message)
          _this.$router.push('/calendar/index')
        } else {
          lib.MessageAlert_Success(res.message)
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
  .wh_container >>> .mark2 {color: rgba(249,91,64,1);border: 0.01rem solid rgba(249,91,64,1);border-radius: 1rem;width: 0.4rem!important;}
  .wh_container >>> .mark3 {background: rgba(249,91,64,1);color: #fff;border-radius: 1rem;width: 0.4rem!important;}
  .none-rili{text-align: center;padding: 0.2rem 0.35rem 0.6rem 0.35rem;}
  .none-rili p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);}
  .class-btn{padding-bottom: 0.6rem;}
  .calebdar-time{padding: 0.3rem 0.2rem 0.2rem 0.2rem;}
  .calebdar-time p{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.15rem;}
  .calebdar-time{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
  .calebdar-time-div{}
  .calebdar-time-div .calebdar-time-div-border{border-bottom: 0.01rem solid #E8E8E8;padding-bottom: 0.14rem;}
  .calebdar-time-div-block{color: #999999!important;}
</style>
