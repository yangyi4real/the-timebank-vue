<template>
  <div class="body">
    <div class="navbar">
      <div class="left-btn" @click="leftItemTouched">
        <i class="iconfont iconxiazai6"></i>
      </div>
      <div class="item title">
        个人资料
      </div>
    </div>
    <div class="wapper">
      <div class="pro-data" v-if="this.listData.sex === '' || this.listData.sex === null">
        <div class="pro-data-head padding-20">
          <div class="clearfix">
            <div class="head flex-row-start fl">
              <div class="head-img">
                <img src="../../../assets/icon/user_icon.png"/>
              </div>
              <div>
                <label>{{listData.nickname}}</label>
                <!--<p>{{listData.birthday}}岁 | 工作{{listData.workingAge}}年 | {{listData.livingLocation}}</p>-->
              </div>
            </div>
            <div class="fr">
              <i class="iconfont iconbianji main-color" @click="modifyDase"></i>
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
            <div><i class="iconfont iconbianji main-color" @click="modifyIntention"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            <div><i class="iconfont iconqiwangzhiwei main-color"></i>技能标签</div>
            <div class="padding-20"><i class="iconfont iconditu main-color"></i>意向地点</div>
            <div><i class="iconfont icongongzi main-color"></i>意向薪酬</div>
          </div>
        </div>
        <div class="pro-data-introduce padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>个人介绍</div>
            <div><i class="iconfont iconbianji main-color" @click="modifyFrofile"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            添加个人描述，可让企业更好地认识你
          </div>
        </div>
        <!--<div class="pro-data-class padding-20 pro-data-border">-->
        <!--<div class="flex-row-between pro-data-title">-->
        <!--<div>课程介绍</div>-->
        <!--<div class="main-color">添加</div>-->
        <!--</div>-->
        <!--<div class="flex-row-between padding-15-top">-->
        <!--<div>课程名称</div>-->
        <!--<div><i class="iconfont iconbianji main-color"></i></div>-->
        <!--</div>-->
        <!--<div class="padding-15-top">课程标签</div>-->
        <!--<div class="padding-15-top">课程内容/描述</div>-->
        <!--</div>-->
        <!--<div class="pro-data-service padding-20 pro-data-border">-->
        <!--<div class="flex-row-between pro-data-title">-->
        <!--<div>服务案例</div>-->
        <!--<div class="main-color">添加</div>-->
        <!--</div>-->
        <!--<div class="flex-row-between">-->
        <!--<div>课程名称</div>-->
        <!--<div><i class="iconfont iconbianji main-color"></i></div>-->
        <!--</div>-->
        <!--<div class="padding-15-top">企业名称</div>-->
        <!--</div>-->
      </div>
      <div class="pro-data" v-if="this.listData.sex !== '' && this.listData.sex !== null">
        <div class="pro-data-head padding-20">
          <div class="clearfix">
            <div class="head flex-row-start fl">
              <div class="head-img">
                <img :src="listData.photo"/>
              </div>
              <div>
                <label>{{listData.name}}<i class="iconfont iconnan main-color" v-if="listData.sex === 1"></i><i class="iconfont iconnv main-color" v-if="listData.sex === 2"></i></label>
                <p>{{listData.birthday}}岁 | 工作{{listData.workAge}}年 | {{listData.livingLocation}}</p>
              </div>
            </div>
            <div class="fr">
              <i class="iconfont iconbianji main-color" @click="modifyDase"></i>
            </div>
          </div>
          <div class="pro-data-head-number">
            <div><i class="iconfont iconshouji main-color"></i>{{listData.phone}}</div>
            <div><i class="iconfont iconyouxiang main-color"></i>{{listData.email}}</div>
          </div>
        </div>
        <div class="pro-data-intention padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>存储意向</div>
            <div><i class="iconfont iconbianji main-color" @click="modifyIntention"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            <div><i class="iconfont iconqiwangzhiwei main-color"></i>{{listData.skillLevel}}</div>
            <div class="padding-20"><i class="iconfont iconditu main-color"></i>{{listData.expectLocation}}</div>
            <div><i class="iconfont icongongzi main-color"></i>{{listData.price}}元/小时</div>
          </div>
        </div>
        <div class="pro-data-introduce padding-20 pro-data-border">
          <div class="flex-row-between pro-data-title">
            <div>个人介绍</div>
            <div><i class="iconfont iconbianji main-color" @click="modifyFrofile"></i></div>
          </div>
          <div class="pro-data-introduce-cont">
            {{listData.introduction}}
          </div>
        </div>
        <div class="pro-data-class padding-20 pro-data-border">
          <div class="pro-data-title">
            <div>课程介绍</div>
          </div>
          <div v-for="(item, index) of listData.classIntroEntityList" :key="index" class="class-list">
            <div class="padding-15-top">
              <div>{{item.className}}</div>
            </div>
            <div class="padding-15-top">{{item.tags}}</div>
            <div class="padding-15-top">{{item.description}}</div>
          </div>
        </div>
        <div class="pro-data-service padding-20 pro-data-border">
          <div class="pro-data-title">
            <div>服务案例</div>
          </div>
          <div v-for="(item, index) of listData.classExampleEntityList" :key="index" class="class-list">
            <div class="flex-row-between">
              <div>{{item.className}}</div>
            </div>
            <div class="padding-15-top">{{item.companyName}}</div>
          </div>
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
    leftItemTouched () {
      this.$router.push('/personal/index')
    },
    getMyinfo () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          let birthday = new Date(_this.listData.birthday.replace(/-/g, '/'))
          let d = new Date()
          let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
          _this.listData.birthday = age
          let secondDate = new Date(_this.listData.workAge.replace(/-/g, '/'))
          let workYears = d.getFullYear() - secondDate.getFullYear()
          _this.listData.workAge = workYears
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    modifyDase () {
      this.$router.push('/personal/information/basedata-show')
    },
    modifyIntention () {
      this.$router.push('/personal/information/intention-show')
    },
    modifyFrofile () {
      this.$router.push('/personal/information/profile-show')
    }
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
  .class-list{padding-bottom: 0.2rem}
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.66rem;
    z-index: 10;
    text-align: center;
    background: #f5f5f5;
  }
  .navbar .item {
    min-width: 0.2rem;
  }
  .navbar .left-btn {
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.1rem 0;
    user-select: none;
    color: black;
    font-size: 0.18rem;
  }
  .navbar .left-btn:active {
    color: #dcbc6c;
  }
  .navbar .title {
    padding: 0.2rem 0;
    user-select: none;
    color: black;
    font-size: 0.2rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    flex: 1;
    text-align: center;
  }
  .navbar .right-btn {
    width: 0.6rem;
    margin-right: 0.1rem;
    padding: 0.12rem 0 0.08rem 0;
    user-select: none;
    color: black;
    font-size: 0.15rem;
    text-align: right;
  }
  .navbar .right-btn:active {
    color: #dcbc6c;
  }
</style>
