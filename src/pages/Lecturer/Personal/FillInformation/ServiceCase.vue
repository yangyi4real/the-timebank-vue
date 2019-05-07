<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="course">
        <div class="course-list flex-row-between">
          <div>课程名称</div>
          <div><input type="text" v-model="courseName" v-on:input="inputValue"/></div>
        </div>
        <div class="course-list flex-row-between" style="border: 0">
          <div>企业名称</div>
          <div><input type="text" v-model="enterpriseName" v-on:input="inputValue"/></div>
        </div>
      </div>
      <div class="course-btn flex-row-between">
        <div @click="cancelClick" class="btn-small-border">删除</div>
        <div @click="pushClick" :class="{ 'btn-small-opacity': inOperation, 'btn-small': operation}">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'ServiceCase',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '服务案例',
      courseName: '',
      enterpriseName: '',
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  created () {},
  computed: {
  },
  methods: {
    cancelClick () {},
    pushClick () {
      this.$router.push('')
    },
    inputValue () {
      if (this.courseName !== '' && this.enterpriseName !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    }
  },
  mounted () {},
  watch: {
    inputValue () {
      if (this.courseName !== '' && this.enterpriseName !== '') {
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
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;padding-top: 0.25rem}
  .course{margin: 0 0.2rem;padding-bottom: 0.2rem;}
  .course-list{padding: 0.15rem 0;font-size:0.16rem;border-bottom: 0.01rem solid #E8E8E8;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .course-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .course-btn{padding-bottom: 0.6rem;width: 3.14rem;margin: 0 auto;padding-top: 3rem}
  .btn-small-opacity{width:1.27rem;height:0.48rem;line-height: 0.48rem;background:rgba(249,91,64,1);border-radius:0.05rem;opacity:0.503;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);text-align: center;}
  .btn-small{width:1.27rem;height:0.48rem;line-height: 0.48rem;background:rgba(249,91,64,1);border-radius:0.05rem;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);text-align: center;}
  .btn-small-border-opacity{width:1.27rem;height:0.48rem;line-height: 0.48rem;border-radius:0.05rem;opacity:0.503;border:0.01rem solid rgba(249,91,64,1);font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center;}
  .btn-small-border{width:1.27rem;height:0.48rem;line-height: 0.48rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center;}
</style>
