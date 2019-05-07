<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="CoData">
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业头像</div>
          <div class="CoData-list-right"><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业名称</div>
          <div class="CoData-list-right"><input type="text" v-model="CoName" placeholder="请填写真实名称" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">简称</div>
          <div class="CoData-list-right"><input type="text" v-model="CoAbbName" placeholder="请填写简称" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">注册时间</div>
          <div class="CoData-list-right flex-row-between">
            <div>
              <yd-cell-group>
                <yd-cell-item>
                  <yd-datetime type="month" v-model="registerDate" slot="right" start-date="1920-01" :end-date="nowTime" v-on:input="inputValue"></yd-datetime>
                </yd-cell-item>
              </yd-cell-group>
            </div>
            <div><i class="iconfont iconjiantou"></i></div>
          </div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">注册地址</div>
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
          <div class="CoData-list-left">联系人</div>
          <div class="CoData-list-right"><input type="text" v-model="userName" placeholder="请填写真实名称" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">联系方式</div>
          <div class="CoData-list-right"><input type="text" v-model="userPhone" placeholder="请填写有效联系方式" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业邮箱</div>
          <div class="CoData-list-right"><input type="text" v-model="CoEMail" placeholder="请填写正确的企业邮箱" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">上传营业执照</div>
          <div class="CoData-list-right"><i class="iconfont iconjiantou"></i></div>
        </div>
      </div>
        <div class="CoData-btn">
          <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">提交</div>
        </div>
    </div>
  </div>
</template>

<script>
import AreaJson from '../../../common/areaCode'
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'EnterpriseInfo',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '企业信息',
      CoName: '',
      CoAbbName: '',
      userName: '',
      userPhone: '',
      CoEMail: '',
      registerDate: '',
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
      if (this.CoName !== '' && this.CoAbbName !== '' && this.userName !== '' && this.CoEMail !== '' && this.registerDate !== '' && this.areaValue !== '') {
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
      if (this.CoName !== '' && this.CoAbbName !== '' && this.userName !== '' && this.CoEMail !== '' && this.registerDate !== '' && this.areaValue !== '') {
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
  .CoData .CoData-list{border-bottom: 0.01rem solid #E8E8E8;line-height: 0.5rem;height: 0.5rem;}
  .CoData .CoData-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .CoData .CoData-list .CoData-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData-btn{padding: 0.85rem 0;}
</style>
