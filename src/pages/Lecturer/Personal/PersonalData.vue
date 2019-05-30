<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="pro-data">
        <div class="pro-data-head padding-20">
          <div class="clearfix">
            <div class="head flex-row-start fl">
              <div class="head-img">
                <img :src="listData.photo"/>
              </div>
              <div>
                <label>{{listData.name}}<i class="iconfont iconnv main-color"></i></label>
                <p>24岁 | 工作{{listData.workingAge}}年 | 青岛</p>
              </div>
            </div>
            <div class="fr">
              <i class="iconfont iconbianji main-color"></i>
            </div>
          </div>
          <div class="pro-data-head-number">
            <div><i class="iconfont iconshouji main-color"></i></div>
            <div><i class="iconfont iconyouxiang main-color"></i></div>
          </div>
        </div>
        <div class="pro-data-intention padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>存储意向</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            <div><i class="iconfont iconqiwangzhiwei main-color"></i>{{listData.skillLevel}}</div>
            <div class="padding-20"><i class="iconfont iconditu main-color"></i>{{listData.expectedLocation}}</div>
            <div><i class="iconfont icongongzi main-color"></i>{{listData.expectedSalary}}元/小时</div>
          </div>
        </div>
        <div class="pro-data-introduce padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>个人介绍</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            {{listData.introduction}}
          </div>
        </div>
        <div class="pro-data-class padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>课程介绍</div>
            <div class="main-color">添加</div>
          </div>
          <div class="flex-row-between padding-15-top">
            <div>课程名称</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="padding-15-top">课程标签</div>
          <div class="padding-15-top">课程内容/描述</div>
        </div>
        <div class="pro-data-service padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>服务案例</div>
            <div class="main-color">添加</div>
          </div>
          <div class="flex-row-between">
            <div>课程名称</div>
            <div><i class="iconfont iconbianji main-color"></i></div>
          </div>
          <div class="padding-15-top">企业名称</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'PersonalData',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '个人资料',
      listData: {
        name: '',
        photo: '',
        serialNumber: '',
        skillLevel: '',
        livingLocation: '',
        bouns: '',
        balance: '',
        introduction: '',
        sdg: '',
        authStatus: '',
        sex: ''
      }
    }
  },
  created () {},
  computed: {
  },
  mounted () {
    this.getMyinfo()
  },
  methods: {
    getMyinfo () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    }
    // cancelClick () {},
    // pushClick () {
    //   this.$router.push('')
    // }
  },
  watch: {}
}
</script>

<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;padding-top: 0.25rem}
  .pro-data{padding: 0 0.2rem;}
  .pro-data-border{border-top: 0.01rem solid #E8E8E8;}
  .padding-20{padding: 0.2rem 0;}
  .padding-15-top{padding-top: 0.15rem}
  .pro-data-title{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.2rem;}
  .pro-data-head .head-img img{width:0.67rem;height:0.67rem;background:rgba(216,216,216,1);border-radius:0.05rem;margin-right: 0.15rem}
  .pro-data-head .head label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .pro-data-head .head label i{padding-left: 0.1rem;}
  .pro-data-head .head p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .pro-data-head .pro-data-head-number{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .pro-data-head .pro-data-head-number div{padding-top: 0.2rem}
  .pro-data-head .pro-data-head-number div i{padding-right: 0.15rem;}
  .pro-data-introduce-cont div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .pro-data-introduce-cont div i{padding-right: 0.15rem;}
  pro-data-introduce-cont{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .pro-data-introduce-cont img{margin: 0.15rem 0;}
</style>
