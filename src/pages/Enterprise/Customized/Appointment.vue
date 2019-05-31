<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div v-show="calendarShow">
        <div>
          <Calendar
            ref='Calendar'
            :markDateMore='listDatasTime'
            v-on:isToday='clickToday'
            agoDayHide='1554048000'
            futureDayHide='1561910399'
            :sundayStart = 'true'
            v-on:choseDay='clickDay'
            v-on:changeMonth='changeDate'
          ></Calendar>
        </div>
        <div>
          <div class="choice-time-list">
            <div class="flex-row-between choice-time-list-div" style="padding-bottom: 0.2rem;">
              <div class="choice-time-list-left">所选时间</div>
              <div>{{calendarData}}</div>
            </div>
            <div class="flex-row-between choice-time-list-div">
              <div class="choice-time-list-left">可预约时间范围</div>
              <div>
                <p>{{timeSaveBegin}}至</p>
                <p>{{timeSaveEnd}}</p>
              </div>
            </div>
            <div class="flex-row-between choice-time-list-div padding-top-15">
              <div class="choice-time-list-left">约讲时间</div>
              <div class="choice-time-list-right flex-row-between">
                <div class="choice-time-list-right-border"><yd-datetime type="time" v-model="dateTimeBegin" slot="right"></yd-datetime></div>
                <div class="">&nbsp;—&nbsp;</div>
                <div class="choice-time-list-right-border"> <yd-datetime type="time" v-model="dateTimeEnd" slot="right"></yd-datetime></div>
              </div>
            </div>
          </div>
          <div class="choice-btn">
            <div class="btn-border" @click="appointmentClick">下一步</div>
          </div>
        </div>
      </div>
      <div class="form-data" v-show="formDataShow">
        <div class="CoData">
          <div class="CoData-list flex-row-between">
            <div class="CoData-list-left">约讲企业</div>
            <div class="CoData-list-right">{{myInfoData.name}}</div>
          </div>
          <div class="CoData-list flex-row-between" style="padding: 0">
            <div class="CoData-list-left">约讲地</div>
            <div class="CoData-list-right flex-row-between">
              <div>
                <yd-cell-group>
                  <yd-cell-item>
                    <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly v-on:input="inputValue">
                  </yd-cell-item>
                </yd-cell-group>
                <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
              </div>
              <div><i class="iconfont iconjiantou"></i></div>
            </div>
          </div>
          <div class="CoData-list flex-row-between">
            <div class="CoData-list-left">详细地址</div>
            <div class="CoData-list-right"><input type="text" v-model="address" placeholder="请填写详细地址" v-on:input="inputValue"/></div>
          </div>
          <div class="CoData-list flex-row-between">
            <div class="CoData-list-left">参与人数</div>
            <div class="CoData-list-right"><input type="text" v-model="number" placeholder="请填写参与人数" v-on:input="inputValue"/></div>
          </div>
          <div class="CoData-list flex-row-between">
            <div class="CoData-list-left">联系人</div>
            <div class="CoData-list-right"><input type="text" v-model="linkman" placeholder="请填写联系人" v-on:input="inputValue"/></div>
          </div>
          <div class="CoData-list flex-row-between">
            <div class="CoData-list-left">联系方式</div>
            <div class="CoData-list-right"><input type="text" v-model="phone" placeholder="请填写联系方式" v-on:input="inputValue"/></div>
          </div>
          <div class="CoData-list flex-row-between">
            <div class="CoData-list-left">需求</div>
            <div class="CoData-list-right"><input type="text" v-model="demand" placeholder="请填写您的需求" v-on:input="inputValue"/></div>
          </div>
          <div class="CoData-list flex-row-between" style="border: 0">
            <div class="CoData-list-left">约讲时间</div>
            <div class="CoData-list-right">
              <div class="time">{{calendarData}}&nbsp;&nbsp;<span>{{dateTimeBegin}}-{{dateTimeEnd}}</span></div>
            </div>
          </div>
        </div>
        <div class="CoData-btn">
          <div @click="appointmentFormDataClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
import Calendar from 'vue-calendar-component'
import TipsTools from '../../../common/TipsTools'
import AreaJson from '../../../common/areaCode'
import moment from 'moment'
let lib = new TipsTools()
export default {
  name: 'Appointment',
  components: {
    Navbar,
    Calendar
  },
  data () {
    return {
      titleMsg: '预约',
      calendarData: '请选择日期',
      dateTimeBegin: '00:00',
      dateTimeEnd: '00:00',
      calendarShow: true,
      formDataShow: false,
      address: '',
      demand: '',
      number: '',
      linkman: '',
      phone: '',
      areaValue: [],
      show1: false,
      model1: '',
      district: AreaJson,
      inOperation: true, // 灰色按钮
      operation: false,
      listDatasTime: [],
      myInfoData: {
        name: ''
      },
      chose: {
        order: '',
        timeSave: {}
      },
      appointmentList: [],
      choseList: [],
      timeSaveBegin: '',
      timeSaveEnd: ''
    }
  },
  computed: {
    getId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.nowTimes()
    this.loadDataList()
    this.loadData()
  },
  methods: {
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 2)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.myInfoData = res.result
          console.log(_this.myInfoData)
        } else {
          console.log(res.message)
        }
      })
    },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.address === '') {
        lib.MessageAlert_Error('请输入详细地址')
        return false
      }
      if (this.demand === '') {
        lib.MessageAlert_Error('请输入您的需求')
        return false
      }
      if (this.number === '') {
        lib.MessageAlert_Error('请输入参与人数')
        return false
      }
      if (this.linkman === '') {
        lib.MessageAlert_Error('请输入联系人')
        return false
      }
      if (this.phone === '') {
        lib.MessageAlert_Error('请输入联系人手机号')
        return false
      }
      if (this.model1 === '') {
        lib.MessageAlert_Error('请输入约讲地址')
        return false
      }
      return true
    },
    loadDataList () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.getId)
      _this.$_HTTPData.getSavedTime(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listDatasTime = res.result
          let temp = JSON.stringify(res.result)
          let temp2 = temp.replace(/status/g, 'className')
          _this.listDatasTime = JSON.parse(temp2)
          for (let i = 0; i < _this.listDatasTime.length; i++) {
            let item = _this.listDatasTime[i]
            console.log(item)
            if (item.className === 0) {
              item.className = 'mark1'
            }
          }
          console.log(_this.listDatasTime)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    clickDay (data) {
      this.calendarData = data
      let calendarTime = Date.parse(this.calendarData)
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.getId)
      formData.append('date', calendarTime)
      _this.$_HTTPData.getDateInfo(_this, formData, function (res) {
        lib.MessageAlert_None(res.message)
        _this.choseList = res
        _this.chose = res.result
        _this.chose.timeSave = res.result.timeSave
        if (res.message === '当日无储存时间') {
          _this.timeSaveBegin = ''
          _this.timeSaveEnd = ''
        } else {
          _this.timeSaveBegin = res.result.timeSave.begin
          _this.timeSaveEnd = res.result.timeSave.end
        }
        console.log(res.result)
      })
    },
    appointmentClick () {
      this.calendarShow = false
      this.formDataShow = true
    },
    appointmentFormDataClick () {
      let beginDate = moment(`${this.calendarData} ${this.dateTimeBegin}`, 'YYYY-MM-DD HH:mm:ss').format()
      let endDate = moment(`${this.calendarData} ${this.dateTimeEnd}`, 'YYYY-MM-DD HH:mm:ss').format()
      let calendarTime = Date.parse(this.calendarData)
      let beginDateTime = Date.parse(beginDate)
      let endDateTime = Date.parse(endDate)
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.getId)
      formData.append('companyId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('date', calendarTime)
      formData.append('begin', beginDateTime)
      formData.append('end', endDateTime)
      formData.append('address', _this.address)
      formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
      formData.append('joinNum', _this.number)
      formData.append('purpose', _this.demand)
      formData.append('linkman', _this.linkman)
      formData.append('phone', _this.phone)
      _this.$_HTTPData.getAppoint(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.appointmentList = res.result
          console.log(_this.appointmentList.price)
          _this.$router.push(`/personal/payment/${_this.appointmentList.price}`)
          lib.MessageAlert_Success(res.message)
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
    },
    result1 (ret) {
      this.model1 = `${ret.itemName1} ${ret.itemName2} ${ret.itemName3}`
      let temp = []
      temp.push(ret.itemValue1)
      temp.push(ret.itemValue2)
      temp.push(ret.itemValue3)
      this.areaValue = temp
    },
    // 计算当前日期
    timeFormate (timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      this.nowTime = year + '-' + month
    },
    nowTimes () {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 30 * 1000)
    },
    inputValue () {
      if (this.address !== '' && this.demand !== '' && this.number !== '' && this.areaValue !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    }
  },
  watch: {
    inputValue () {
      if (this.address !== '' && this.demand !== '' && this.number !== '' && this.areaValue !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    }
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .padding-top-15{padding-top: 0.15rem;}
  .choice-time-list{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;}
  .choice-time-list .choice-time-list-div{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;}
  .choice-time-list .choice-time-list-div .choice-time-list-right{color:rgba(249,91,64,1);}
  .choice-time-list-right .choice-time-list-right-border{border-bottom: 0.01rem solid #E8E8E8;}
  /*.choice-time-list-right div{padding-bottom: 0.14rem;}*/
  .choice-btn{padding: 0.6rem 0;}
  .CoData{padding-top: 0.35rem;margin: 0 0.2rem;}
  .CoData .CoData-list{border-bottom: 0.01rem solid #E8E8E8;padding: 0.15rem 0;}
  .CoData .CoData-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .CoData .CoData-list .CoData-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData-btn{padding: 0.85rem 0;}
  .CoData .CoData-list .CoData-list-right{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData .CoData-list .CoData-list-right .time{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .CoData .CoData-list .CoData-list-right .time span{color: #F95B40}
  .wh_container >>> .mark1 {color: rgba(249,91,64,1);}
  .wh_container >>> .mark2 {background: rgba(249,91,64,1);color: #fff;border-radius: 1rem;width: 0.4rem!important;}
  .wh_container >>> .mark3 {color: rgba(249,91,64,1);border: 0.01rem solid rgba(249,91,64,1);border-radius: 1rem;width: 0.4rem!important;}
</style>
