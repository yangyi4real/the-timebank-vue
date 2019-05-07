<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="CoData">
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">约讲企业</div>
          <div class="CoData-list-right">青岛赛雷信息科技有限公司</div>
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
          <div class="CoData-list-right">王琼</div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">联系方式</div>
          <div class="CoData-list-right">158****2233</div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">需求</div>
          <div class="CoData-list-right"><input type="text" v-model="demand" placeholder="请填写您的需求" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between" style="border: 0">
          <div class="CoData-list-left">约讲时间</div>
          <div class="CoData-list-right">
            <div class="time">2019-04-24 <span>9:00-18：00</span></div>
            <div class="time">2019-04-24 <span>9:00-18：00</span></div>
          </div>
        </div>
      </div>
      <div class="CoData-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import AreaJson from '../../../common/areaCode'
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'AppointmentInput',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '预约',
      address: '',
      demand: '',
      number: '',
      areaValue: [],
      show1: false,
      model1: '',
      district: AreaJson,
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  created () {
    this.nowTimes()
  },
  computed: {},
  methods: {
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
    pushClick () {},
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
  mounted () {
    this.nowTimes()
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
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .CoData{padding-top: 0.35rem;margin: 0 0.2rem;}
  .CoData .CoData-list{border-bottom: 0.01rem solid #E8E8E8;padding: 0.15rem 0;}
  .CoData .CoData-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .CoData .CoData-list .CoData-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData-btn{padding: 0.85rem 0;}
  .CoData .CoData-list .CoData-list-right .time{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .CoData .CoData-list .CoData-list-right .time span{color: #F95B40}
</style>
