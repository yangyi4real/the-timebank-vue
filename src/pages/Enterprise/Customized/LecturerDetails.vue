<template>
    <div class="body">
      <navbar :title="titleMsg"></navbar>
      <div class="wapper">
        <div class="lecturer-data">
          <div class="lecturer-data-div1 clearfix">
            <div class="fl" style="width: 50%"><img :src="listDatas.photo"/></div>
            <div class="fl" style="width: 50%">
              <label>{{listDatas.name}}<i class="iconfont iconnv main-color" v-if="listDatas.sexuality === 1"></i><i class="iconfont iconnv main-color" v-if="listDatas.sexuality === 2"></i></label>
              <p>{{listDatas.birthday}}岁 | 工作{{listDatas.workingAge}}年 | 青岛</p>
              <p>{{listDatas.introduction}}</p>
            </div>
          </div>
          <div class="lecturer-data-div2">
            <p>授课方向：{{listDatas.skillLevel}}</p>
            <p>授课地点：{{listDatas.expectedLocation}}</p>
            <p>课程均价：{{listDatas.expectedSalary}}元/小时</p>
          </div>
          <div class="lecturer-data-div3 clearfix">
            <div class="lecturer-data-div3-left fl">
              <div style="text-align: center">
                <span style="font-size: 0.2rem;font-family: PingFangSC-Medium;font-weight: 500;color: rgba(249,91,64,1)">{{listDatas.lectureScore}}</span> 分
              </div>
              <p>综合评分</p>
            </div>
            <div class="lecturer-data-div3-right fr">
              <label>{{listDatas.classAmount}}</label>
              <p>平台约课数</p>
            </div>
          </div>
        </div>
        <div class="lecturer-skill">
          <div class="lecturer-skill-tab flex-row-around">
            <div v-for="(tag,index) in tabItems" :key="index" class="s-tab" :class="{ active: changeTab === index}" @click="tabsClicked(index)">
              {{ tag.name }}
            </div>
          </div>
          <div v-show="show1" class="lecturer-skill-div">
            <div style="padding-top: 0.2rem">
              {{listDatas.introduction}}
            </div>
          </div>
          <div v-show="show2" class="lecturer-skill-div">
            <div v-if="this.listDatas.classIntroEntityList.length === 0">
              <div class="lecturer-skill-div-class-title" style="padding-top: 0.2rem;text-align: center">暂无课程介绍</div>
            </div>
            <div class="lecturer-skill-div-class" v-for="(item,index) in listDatas.classIntroEntityList" :key="index" >
              <div class="lecturer-skill-div-class-title">课题：{{item.className}}</div>
              <div class="lecturer-skill-div-class-title">课程标签：</div>
              <div class="flex-row-start">
                <div class="tip">{{item.tags}}</div>
              </div>
              <div class="lecturer-skill-div-class-text">
                课程内容：{{item.description}}
              </div>
            </div>
          </div>
          <div v-show="show3" class="lecturer-skill-div">
            <div v-if="this.listDatas.classExampleEntityList.length === 0">
              <div class="lecturer-skill-div-class-title" style="padding-top: 0.2rem;text-align: center">暂无服务案例</div>
            </div>
            <div v-for="(item,index) in listDatas.classExampleEntityList" :key="index">
              <div class="lecturer-skill-div-case" >
                <label>课题：{{item.className}}</label>
                <label>企业名称：{{item.companyName}}</label>
              </div>
            </div>
          </div>
          <div v-show="show4" class="lecturer-skill-div">
            <div v-if="this.listDatas.evaluationEntityList.length === 0">
              <div class="lecturer-skill-div-class-title" style="padding-top: 0.2rem;text-align: center">暂无评价</div>
            </div>
            <div class="lecturer-skill-evaluate flex-row-start" v-for="(item,index) in listDatas.evaluationEntityList" :key="index" >
              <div class="lecturer-skill-evaluate-left"><img :src="profile"/></div>
              <div class="lecturer-skill-evaluate-right">
                <label>{{companyEntity}}</label>
                <!--<span>2019-04-21</span>-->
                <p><yd-rate slot="left" v-model="item.lectureScore" color="#E2E2E2" active-color="#FED500" size="0.2rem"></yd-rate></p>
                <div class="right-text">
                  {{item.companyContent}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="base-btn flex-row-start">
        <div class="base-btn-div base-btn-left"><a :href="'tel:' + '05328888888'">咨询</a></div>
        <div class="base-btn-div base-btn-right" @click="appointmentClick">预约</div>
      </div>
    </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'lecturerDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '讲师详情',
      tabItems: [
        {name: '讲师介绍'},
        {name: '课程介绍'},
        {name: '服务案例'},
        {name: '评价'}
      ],
      changeTab: 0,
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      listDatas: {
        classExampleList: [],
        classIntroEntityList: [],
        evaluationEntityList: []
      },
      evaluationTemp: '',
      companyEntity: '',
      profile: '',
      listDatasDetail: []
    }
  },
  computed: {
    getId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    tabsClicked (index) {
      this.changeTab = index
      if (this.changeTab === 0) {
        this.show1 = true
        this.show2 = false
        this.show3 = false
        this.show4 = false
      }
      if (this.changeTab === 1) {
        this.show1 = false
        this.show2 = true
        this.show3 = false
        this.show4 = false
      }
      if (this.changeTab === 2) {
        this.show1 = false
        this.show2 = false
        this.show3 = true
        this.show4 = false
      }
      if (this.changeTab === 3) {
        this.show1 = false
        this.show2 = false
        this.show3 = false
        this.show4 = true
      }
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.getId)
      _this.$_HTTPData.getLectureDetail(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listDatas = res.result
          let birthday = new Date(_this.listDatas.birthday.replace(/-/g, '/'))
          let d = new Date()
          let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
          _this.listDatas.birthday = age
          let secondDate = new Date(_this.listDatas.workingAge.replace(/-/g, '/'))
          let workYears = d.getFullYear() - secondDate.getFullYear()
          _this.listDatas.workingAge = workYears
          for (let i = 0; i < _this.listDatas.evaluationEntityList.length; i++) {
            _this.evaluationTemp = _this.listDatas.evaluationEntityList[i].orderId
            _this.loadDatas()
            console.log(_this.evaluationTemp)
          }
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    loadDatas () {
      let _this = this
      let formData = new FormData()
      formData.append('orderId', _this.evaluationTemp)
      _this.$_HTTPData.getOrderDetail(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listDatasDetail = res.result
          _this.companyEntity = res.result.companyEntity.companyName
          _this.profile = res.result.companyEntity.profile
          console.log(_this.listDatasDetail)
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    appointmentClick () {
      this.$router.push(`/customized/appointment/${this.getId}`)
    }
  }
}
</script>

<style scoped>
  .wapper{margin: 0.66rem 0.1rem;}
  .lecturer-data{background:rgba(255,255,255,1);border-radius:0.05rem;}
  .lecturer-data .lecturer-data-div1{padding-top: 0.4rem;padding-bottom: 0.3rem;margin: 0 0.35rem;}
  .lecturer-data .lecturer-data-div2{padding: 0.2rem 0;border-top: 0.01rem solid #E8E8E8;border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;}
  .lecturer-data .lecturer-data-div3{margin: 0 0.2rem;}
  .lecturer-data .lecturer-data-div1 img{width:1.4rem;height:1.2rem;background:rgba(216,216,216,1);border-radius:0.05rem;}
  .lecturer-data .lecturer-data-div1 label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .lecturer-data .lecturer-data-div1 label i{padding-left: 0.1rem;}
  .lecturer-data .lecturer-data-div1 p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .lecturer-data .lecturer-data-div2 p{font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .lecturer-data .lecturer-data-div3 .lecturer-data-div3-left{border-right: 0.01rem solid #E8E8E8;text-align: center;width: 50%;padding: 0.14rem 0;}
  .lecturer-data .lecturer-data-div3 .lecturer-data-div3-left label i{padding: 0 0.03rem;}
  .lecturer-data .lecturer-data-div3 .lecturer-data-div3-left p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-top: 0.15rem;}
  .lecturer-data .lecturer-data-div3 .lecturer-data-div3-right{width: 50%;padding: 0.14rem 0;text-align: center}
  .lecturer-data .lecturer-data-div3 .lecturer-data-div3-right label{font-size: 0.2rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
  .lecturer-data .lecturer-data-div3 .lecturer-data-div3-right p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-top: 0.15rem;}
  .lecturer-skill{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.1rem 0;}
  .lecturer-skill .lecturer-skill-tab{padding: 0.2rem 0;margin: 0 0.2rem;font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);border-bottom: 0.01rem solid #E8E8E8;}
  .lecturer-skill .lecturer-skill-div{padding: 0 0.2rem 1rem 0.2rem;}
  .star{color:rgba(254,213,0,1);}
  .active{color:rgba(249,91,64,1)}
  .base-btn{width: 100%;height: 0.69rem; position: fixed;z-index: 100; bottom: 0;left: 0;margin: 0 0.01rem;}
  .base-btn .base-btn-div{border: 0.01rem solid #F95B40;width: 2.06rem;height: 0.69rem;font-size: 0.18rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;border-radius: 0.05rem;line-height: 0.69rem;}
  .base-btn .base-btn-left{color:rgba(249,91,64,1);background: #fff;}
  .base-btn .base-btn-right{background:rgba(249,91,64,1);color: #fff;}
  .lecturer-skill-evaluate{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .lecturer-skill-evaluate .lecturer-skill-evaluate-left{padding-right: 0.1rem;}
  .lecturer-skill-evaluate .lecturer-skill-evaluate-left img{width:0.53rem;height:0.53rem;}
  .lecturer-skill-evaluate .lecturer-skill-evaluate-right label{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .lecturer-skill-evaluate .lecturer-skill-evaluate-right span{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:#A7A7A7;display: block;padding: 0.06rem 0;}
  .lecturer-skill-evaluate .lecturer-skill-evaluate-right p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .lecturer-skill-evaluate .lecturer-skill-evaluate-right p i{padding-right: 0.03rem;}
  .lecturer-skill-div-case{padding-top: 0.2rem;border-bottom: 0.01rem solid #E8E8E8;}
  .lecturer-skill-div-case p{font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.15rem;}
  .lecturer-skill-div-case label{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);display: block;padding-left: 0.15rem;padding-bottom: 0.15rem;}
  .lecturer-skill-div-class{border-bottom: 0.01rem solid #E8E8E8;padding-bottom: 0.1rem;}
  .lecturer-skill-div-class .lecturer-skill-div-class-title{font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding: 0.2rem 0;}
  .lecturer-skill-div-class .tip{width: 0.84rem;height: 0.31rem;background:rgba(249,91,64,1);border-radius:5px;text-align: center;color: #fff;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;line-height: 0.31rem;margin-right: 0.2rem;}
  .lecturer-skill-div-class .lecturer-skill-div-class-text{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.2rem;padding-top: 0.2rem}
</style>
