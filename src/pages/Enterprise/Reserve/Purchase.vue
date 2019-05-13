<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="CoData">
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">服务地</div>
          <div class="CoData-list-right"><input type="text" v-model="place" placeholder="请输入服务地" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">详细地址</div>
          <div class="CoData-list-right"><input type="text" v-model="address" placeholder="请填写详细地址" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">联系人</div>
          <div class="CoData-list-right"><input type="text" v-model="name" placeholder="请填写联系人" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">联系方式</div>
          <div class="CoData-list-right">158****2233</div>
        </div>
        <div class="CoData-list flex-row-between" style="border: 0">
          <div class="CoData-list-left">备注</div>
          <div class="CoData-list-right"><input type="text" v-model="demand" placeholder="请填备注信息" v-on:input="inputValue"/></div>
        </div>
      </div>
      <div class="CoData-total">
        合计：<span class="main-color">2000.00</span>元
      </div>
      <div class="CoData-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'Purchase',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '购买',
      address: '',
      demand: '',
      place: '',
      name: '',
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  created () {},
  computed: {},
  methods: {
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
  },
  watch: {
    inputValue () {
      if (this.address !== '' && this.demand !== '' && this.place !== '' && this.name !== '') {
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
  .CoData-total{font-size:0.18rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: right;padding: 0.35rem 0.2rem 0 0;}

</style>
