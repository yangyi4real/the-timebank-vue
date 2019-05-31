<template>
  <div class="body">
    <div class="home-nav text-center">
      日历
    </div>
    <div class="wapper">
      <div class="calendar">
        <div class="none-rili" v-if="this.listData.authStatus === '' || this.listData.authStatus === null">
          <div style="background:rgba(255,255,255,1);">
            <div class="caozuo">
              <div>
                <div class="flex-row-between">
                  <div @click="clickedToday">回到今天</div>
                  <div @click="noneCalendarClick" v-if="this.listData.sex !== '' && this.listData.sex !== null">存储时间</div>
                  <div @click="noneCalendarClicked" v-if="this.listData.sex === '' || this.listData.sex === null">存储时间</div>
                </div>
                <div>
                  <Calendar
                    ref='Calendar'
                    :markDateMore='timeList'
                    agoDayHide='1554048000'
                    futureDayHide='1561910399'
                    :sundayStart = 'true'
                    v-on:choseDay='clickDay'
                  ></Calendar>
                </div>
              </div>
            </div>
            <div class="flex-row-between mingci" @click="clickDefinitions">
              <div><span class="color-999">D</span> 未存储</div>
              <div><span class="main-color">D</span> 存储未约</div>
              <div><span class="main-color borderRadius">D</span> 有约需确认</div>
              <div><span class="main-color borderRadius borderRadiusBack">D</span> 已约 <i class="iconfont iconjiantou" style="font-size: 0.15rem"></i></div>
            </div>
          </div>
          <div style="padding-top: 0.3rem;">
            <p>计划赶不上变化</p>
            <p>还是去存储三个月内的时间吧~</p>
            <br>
            <br>
            <br>
            <div class="btn-border-black" v-if="this.listData.sex === '' || this.listData.sex === null" @click="$router.push('/personal/information/basedata')">完善信息</div>
          </div>
        </div>
        <div v-if="this.listData.authStatus === 1">
          <div style="background:rgba(255,255,255,1);">
            <div class="flex-row-between caozuo">
              <div @click="clickedToday">回到今天</div>
              <div @click="addCalendarClick">存储时间</div>
            </div>
            <Calendar
              ref='Calendar'
              :markDateMore='timeList'
              agoDayHide='1554048000'
              futureDayHide='1561910399'
              :sundayStart = 'true'
              v-on:choseDay='clickDay'
            ></Calendar>
            <div class="flex-row-between mingci" @click="clickDefinitions">
              <div><span class="color-999">D</span> 未存储</div>
              <div><span class="main-color">D</span> 存储未约</div>
              <div><span class="main-color borderRadius">D</span> 有约需确认</div>
              <div><span class="main-color borderRadius borderRadiusBack">D</span> 已约 <i class="iconfont iconjiantou" style="font-size: 0.15rem"></i></div>
            </div>
          </div>
          <div class="calendarMsg" v-show="storageDiv">
            <div class="calendarMsg-list">
              <div class="flex-row-between padding-bottom-15">
                <div>存储时间</div>
                <div>是</div>
              </div>
              <div class="flex-row-between padding-bottom-15">
                <div>时间段</div>
                <div>
                  <div>{{begin}} 至</div>
                  <div>{{end}}</div>
                </div>
              </div>
              <div class="flex-row-between">
                <div>约讲</div>
                <div v-if="this.statuss === 0">已存</div>
                <div v-if="this.statuss === 1">已约</div>
                <div v-if="this.statuss === 2">已讲</div>
              </div>
            </div>
            <div class="calendarMsg-msg" v-if="this.storage.message !== '当日无储存时间'">
              <div v-if="this.storageList.order !== null">
                <div class="main-color flex-row-between">
                  <div>约讲编号：{{storageList.order.id}}</div>
                  <div v-if="this.storageList.order.orderStatus === 1">待确认</div>
                  <div v-if="this.storageList.order.orderStatus === 3">待开课</div>
                  <div v-if="this.storageList.order.orderStatus === 4">待评价</div>
                  <div v-if="this.storageList.order.orderStatus === 5">已完成</div>
                </div>
                <label>约讲企业：{{storageList.company.companyName}}</label>
                <p>约讲地址：{{storageList.order.address}}</p>
                <p>约讲时间：{{storageList.order.begin}} 至 {{storageList.order.end}}</p>
                <p>约讲人数：{{storageList.order.joinNum}}人</p>
                <p>需求：{{storageList.order.purpose}}</p>
              </div>
            </div>
          </div>
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
      timeList: [],
      authStatus: 0,
      listData: [],
      storageList: {
        company: {},
        order: {},
        timeSave: {}
      },
      begin: '',
      end: '',
      statuss: '',
      storageDiv: false,
      storage: {
        message: ''
      }
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
          let temp = JSON.stringify(res.result)
          let temp2 = temp.replace(/status/g, 'className')
          _this.timeList = JSON.parse(temp2)
          for (let i = 0; i < _this.timeList.length; i++) {
            let item = _this.timeList[i]
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
      let calendarTime = Date.parse(data)
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', calendarTime)
      _this.$_HTTPData.getDateInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.storage = res
          _this.storage.message = res.message
          _this.storageList = res.result
          if (_this.storageList !== null) {
            console.log('1111')
            _this.storageDiv = true
          } else {
            _this.storageDiv = false
          }
          _this.storageList.timeSave = res.result.timeSave
          _this.end = res.result.timeSave.end
          _this.begin = res.result.timeSave.begin
          _this.statuss = res.result.timeSave.status
          console.log(_this.storageList)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    clickedToday () {
      let myDate = new Date()
      myDate.toLocaleDateString()
      this.$refs.Calendar.ChoseMonth(myDate)
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{border-radius:0.05rem;margin: 0 0.1rem;}
  /*.calendar{}*/
  .caozuo{padding: 0.15rem 0;font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);border-bottom: 0.01rem solid #ccc;margin: 0 0.15rem;}
  .mingci{padding: 0.2rem 0;margin: 0 0.15rem;font-size: 0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .borderRadius{border:0.01rem solid rgba(249,91,64,1);border-radius: 1rem;padding: 0 0.05rem;}
  .borderRadiusBack{background: rgba(249,91,64,1);color: #fff;}
  .wh_container >>> .mark1 {color: rgba(249,91,64,1);}
  .wh_container >>> .mark3 {background: rgba(249,91,64,1);color: #fff;border-radius: 1rem;width: 0.4rem!important;}
  .wh_container >>> .mark2 {color: rgba(249,91,64,1);border: 0.01rem solid rgba(249,91,64,1);border-radius: 1rem;width: 0.4rem!important;}
  .none-rili{text-align: center;padding: 0 0 1rem 0;}
  .none-rili p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);}
  .calendarMsg{background:rgba(255,255,255,1);margin: 0.1rem 0;padding: 0 0.15rem 00.15rem;}
  .calendarMsg .calendarMsg-list{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding: 0.2rem 0;}
  .padding-bottom-15{padding-bottom: 0.15rem;}
  .calendarMsg-msg{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;border-top: 0.01rem solid #E8E8E8;padding-bottom: 1rem}
  .calendarMsg-msg .main-color{padding: 0.1rem 0;}
  .calendarMsg-msg label{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.16rem;display: block;}
  .calendarMsg-msg p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-bottom: 0.1rem;}
</style>
