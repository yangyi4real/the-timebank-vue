<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="basedata-main">
        <div class="basedata-list">
          <div class="flex-row-between">
            <div class="basedata-list-left">认证状态</div>
            <div>
              <span>{{ getStatusTitle }}</span><i class="iconfont iconjiantou"></i>
            </div>
          </div>
          <div class="tips">认证后将可存储时间并开始约课</div>
        </div>
        <div class="basedata-list">
          <div class="flex-row-between">
            <div class="basedata-list-left">认证金额</div>
            <div>
              <label>300.00元</label>
            </div>
          </div>
          <div class="tips">取消认证时，认证费用将退还给您</div>
        </div>
        <div class="basedata-list flex-row-between">
          <div class="basedata-list-left">身份证</div>
          <div>
            <input type="text" placeholder="上传身份证正反面"/><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div class="basedata-list-left">资质证书</div>
          <div>
            <input type="text" placeholder="最多上传9张"/><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="basedata-list flex-row-between" style="border: 0">
          <div class="basedata-list-left">授课照片</div>
          <div>
            <input type="text" placeholder="最多上传3张"/><i class="iconfont iconjiantou"></i>
          </div>
        </div>
      </div>
      <p class="text-center main-color tips-p">以上信息作为平台审核认证讲师资格使用</p>
      <div class="authentication-btn">
        <div class="btn-border-black" @click="pushClick" v-show="btnShow">确定</div>
        <div class="btn-border-black" @click="cancelClick">取消认证</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'Authentication',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '讲师认证',
      btnShow: true,
      statusTitleCanTab: false
    }
  },
  created () {},
  computed: {
    /**
     * 获取认证状态
     */
    getStatusTitle () {
      if (this.statusTitleCanTab) {
        return `已认证`
      } else {
        return `未认证`
      }
    }
  },
  methods: {
    pushClick () {
      this.$router.push('/personal/payment')
    },
    cancelClick () {
      let _this = this
      this.$dialog.confirm({
        title: '<p style="text-align: center;font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.1rem">确定取消认证？</p>',
        mes: '<p style="text-align: center;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.22rem!important;">取消后，未来已存储时间将全部失效，并且不可继续约课</p>',
        opts: [
          {
            txt: '取消',
            color: '#ccc',
            callback: () => {}
          },
          {
            txt: '确定',
            color: true,
            callback: () => {
              _this.$router.push('/personal/information/authentication')
            }
          }
        ]
      })
    }
  },
  mounted () {},
  watch: {}
}
</script>

<style scoped>
  input:focus {outline: none;}
  .tips{font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-top: 0.08rem}
  .tips-p{font-size:13px;font-family:PingFangSC-Regular;font-weight:400;padding-top: 0.1rem;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .basedata-main{margin: 0 0.2rem;padding-top: 0.2rem;}
  .basedata-main .basedata-list{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .basedata-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-list span{border-radius:0.03rem;border:0.01rem solid rgba(249,91,64,1);padding: 0 0.1rem;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-list label{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-main .basedata-list i{padding-left: 0.15rem;}
  .basedata-main .basedata-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .authentication-btn{padding: 0.5rem 0;}
  .authentication-btn div{margin-top: 0.3rem}
</style>
