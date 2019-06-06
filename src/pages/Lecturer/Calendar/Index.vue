<template>
  <div class="body">
    <div class="home-nav text-center">
      排课
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
          <!--过时未储存-->
          <div class="calendarMsg" v-show="notChoseEd">
            <div class="calendarMsg-list">
              <div class="flex-row-between padding-bottom-15">
                <div>存储时间</div>
                <div>
                  否
                </div>
              </div>
            </div>
          </div>
          <!--未储存-->
          <div class="calendarMsg" v-show="notChose">
            <div class="calendarMsg-list">
              <div class="flex-row-between padding-bottom-15">
                <div>存储时间</div>
                <div class="choseItems clearfix">
                  <div v-for="(item,index) in choseItems" :key="index" class="s-tab" :class="{active: choseItem === index}" @click="choseClicked(index)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div v-show="storageTime">
                <div class="flex-row-between padding-bottom-15">
                  <div>时间段</div>
                  <div class="clearfix">
                    <div class="fl main-color"><yd-datetime start-hour="9" end-hour="23" type="time" v-model="dateTimeBegin" slot="right"></yd-datetime></div>
                    <div class="fl" style="padding: 0 0.1rem;"> - </div>
                    <div class="fl main-color"><yd-datetime start-hour="10" end-hour="23" type="time" v-model="dateTimeEnd" slot="right"></yd-datetime></div>
                  </div>
                  <div class="btn-main" @click="addTime">保存时间</div>
                </div>
                <div class="flex-row-between">
                  <div>约讲</div>
                  <div>未约</div>
                </div>
              </div>
            </div>
          </div>
          <!--储存未约-->
          <div class="calendarMsg" v-show="ChoseNotAbout">
            <div class="calendarMsg-list">
              <div class="flex-row-between padding-bottom-15">
                <div>存储时间</div>
                <div class="choseItems clearfix">
                  <div v-for="(item,index) in choseItems2" :key="index" class="s-tab" :class="{active2: choseItem2 === index}" @click="choseClicked2(index)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div v-show="ChoseNotAboutTiem">
                <div class="flex-row-between padding-bottom-15">
                  <div>时间段</div>
                  <div class="clearfix">
                    <div>{{day}} {{begin}} 至 {{end}}</div>
                  </div>
                  <div class="btn-main" @click="cancelTime">取消</div>
                </div>
                <div class="flex-row-between">
                  <div>约讲</div>
                  <div>已存</div>
                </div>
              </div>
            </div>
          </div>
          <!--已约-->
          <div class="calendarMsg" v-show="ChoseAbout">
            <div class="calendarMsg-list">
              <div class="flex-row-between padding-bottom-15">
                <div>存储时间</div>
                <div>是</div>
              </div>
              <div class="flex-row-between padding-bottom-15">
                <div>时间段</div>
                <div>
                  <div>{{day}} {{begin}} 至 {{end}}</div>
                </div>
              </div>
              <div class="flex-row-between">
                <div>约讲</div>
                <div>已约</div>
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
import moment from 'moment'
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
      statuss: '',
      storage: {
        message: ''
      },
      day: '',
      begin: '',
      end: '',
      dateTimeBegin: '',
      dateTimeEnd: '',
      dateTimeBegin2: '',
      dateTimeEnd2: '',
      choseItem: 0,
      choseItem2: 1,
      choseItems: [
        {name: '否'},
        {name: '是'}
      ],
      choseItems2: [
        {name: '否'},
        {name: '是'}
      ],
      calendarTime: '',
      notChose: false, // 未来未储存
      ChoseNotAbout: false, // 已存未约
      ChoseAbout: false, // 已约
      notChoseEd: false, // 过去未储存
      storageTime: false, // 未来未储存time
      ChoseNotAboutTiem: true // 已存未约time
    }
  },
  computed: {},
  mounted () {
    this.loadDataList()
    this.loadData()
    this.loadDataToday()
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
    loadDataToday () {
      let calendarTime = Date.parse(new Date())
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', calendarTime)
      _this.calendarTime = calendarTime
      _this.$_HTTPData.getDateInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.storage = res
          _this.storage.message = res.message
          _this.storageList = res.result
          if (_this.storageList === null) {
            _this.notChose = false
            _this.ChoseNotAbout = false
            _this.ChoseAbout = false
            _this.notChoseEd = true
          } else if (_this.storageList !== null && _this.storageList.order === null) {
            _this.ChoseNotAbout = true
            _this.notChose = false
            _this.ChoseAbout = false
            _this.notChoseEd = false
          } else if (_this.storageList.order !== null && _this.storageList.order.orderStatus === 1) {
            _this.ChoseAbout = true
            _this.ChoseNotAbout = false
            _this.notChose = false
            _this.notChoseEd = false
          }
        }
      })
    },
    clickDay (data) {
      let calendarTime = Date.parse(data)
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', calendarTime)
      _this.calendarTime = calendarTime
      _this.$_HTTPData.getDateInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.storage = res
          _this.storage.message = res.message
          _this.storageList = res.result
          let myDate = new Date()
          myDate.toLocaleDateString()
          let myDateDay = Date.parse(myDate.toLocaleDateString())
          if (myDateDay > calendarTime) { // 今天之前
            console.log('今天之前')
            if (_this.storageList === null) {
              _this.notChose = false
              _this.ChoseNotAbout = false
              _this.ChoseAbout = false
              _this.notChoseEd = true
              _this.storageTime = false
              _this.choseItem = 0
              _this.choseItem2 = 1
            } else if (_this.storageList !== null && _this.storageList.order === null) {
              _this.ChoseNotAbout = true
              _this.notChose = false
              _this.ChoseAbout = false
              _this.notChoseEd = false
              _this.storageTime = false
              _this.choseItem = 0
              _this.choseItem2 = 1
            } else if (_this.storageList.order !== null && _this.storageList.order.orderStatus === 1) {
              _this.ChoseAbout = true
              _this.ChoseNotAbout = false
              _this.notChose = false
              _this.notChoseEd = false
              _this.storageTime = false
              _this.choseItem = 0
              _this.choseItem2 = 1
            }
          } else if (myDateDay === calendarTime) { // 今天
            console.log('今天')
            if (_this.storageList === null) {
              _this.notChoseEd = true
              _this.ChoseNotAbout = false
              _this.ChoseAbout = false
              _this.notChose = false
              _this.storageTime = false
              _this.choseItem = 0
              _this.choseItem2 = 1
            } else if (_this.storageList !== null && _this.storageList.order === null) {
              _this.ChoseNotAbout = true
              _this.notChose = false
              _this.ChoseAbout = false
              _this.notChoseEd = false
              _this.storageTime = false
              _this.choseItem = 0
              _this.choseItem2 = 1
            } else if (_this.storageList.order !== null && _this.storageList.order.orderStatus === 1) {
              _this.ChoseAbout = true
              _this.ChoseNotAbout = false
              _this.notChose = false
              _this.notChoseEd = false
              _this.storageTime = false
              _this.choseItem = 0
              _this.choseItem2 = 1
            }
          } else if (myDateDay < calendarTime) { // 今天之后
            if (_this.storageList === null) {
              console.log('今天之后')
              _this.notChose = true
              _this.notChoseEd = false
              _this.ChoseNotAbout = false
              _this.ChoseAbout = false
              _this.storageTime = false
              _this.choseItem = 0
            } else if (_this.storageList !== null && _this.storageList.order === null) {
              _this.ChoseNotAbout = true
              _this.notChose = false
              _this.ChoseAbout = false
              _this.notChoseEd = false
              _this.storageTime = false
              _this.choseItem = 0
            } else {
              _this.ChoseAbout = true
              _this.ChoseNotAbout = false
              _this.notChose = false
              _this.notChoseEd = false
              _this.storageTime = false
              _this.choseItem = 0
            }
          }
          _this.storageList.order = res.result.order
          _this.storageList.timeSave = res.result.timeSave
          _this.day = res.result.timeSave.date.substring(0, 10)
          _this.end = res.result.timeSave.end.substring(11, 16)
          _this.begin = res.result.timeSave.begin.substring(11, 16)
          _this.statuss = res.result.timeSave.status
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    clickedToday () {
      let myDate = new Date()
      myDate.toLocaleDateString()
      this.$refs.Calendar.ChoseMonth(myDate)
    },
    choseClicked (index) {
      this.choseItem = index
      if (this.choseItem === 0) {
        this.notChose = true
        this.storageTime = false
      } else {
        this.storageTime = true
      }
    },
    addTime () {
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
          lib.MessageAlert_None('储存成功，刷新日历')
          _this.loadDataList()
          _this.loadData()
          _this.loadDataToday()
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    choseClicked2 (index) {
      this.choseItem2 = index
      if (this.choseItem2 === 0) {
        this.ChoseNotAbout = true
        this.ChoseNotAboutTiem = false
        let _this = this
        let formData = new FormData()
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('date', _this.calendarTime)
        _this.$_HTTPData.getCancelSave(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_None('取消成功，刷新日历')
            _this.loadDataList()
            _this.loadData()
            _this.loadDataToday()
          } else {
            lib.MessageAlert_Error(res.message)
          }
        })
      } else {
        this.ChoseNotAbout = true
        this.ChoseNotAboutTiem = true
        console.log('tianjia')
      }
    },
    cancelTime () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', _this.calendarTime)
      _this.$_HTTPData.getCancelSave(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_None('取消成功，刷新日历')
          _this.loadDataList()
          _this.loadData()
          _this.loadDataToday()
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
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
  .choseItems{background: #ddd;}
  .choseItems div{height: 0.24rem;float: left;font-size: 0.14rem;color: #fff;padding: 0 0.05rem;}
  .active{background: rgba(249,91,64,1);}
  .active2{background: rgba(249,91,64,1);}
  .btn-main{color: #fff;background: rgba(249,91,64,1);padding: 0.03rem;border-radius: 0.05rem;}
</style>
