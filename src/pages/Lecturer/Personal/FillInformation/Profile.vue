<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="profile-title">个人介绍</div>
      <div class="profile-text">
        <textarea draggable="false" v-model="profileMsg" placeholder="用文字描述自己或者直接上传一张简历图片吧~"></textarea>
      </div>
      <div class="profile-add-course" v-for="(item, index) in courseList" :key="index">
        <div class="profile-add-course-set flex-row-between">
          <div>课程介绍</div>
          <div><span @click="courseClick">添加</span></div>
        </div>
        <div class="profile-add-course-list flex-row-between">
          <div>{{item.courseName}}</div>
          <div><i class="iconfont iconbianji main-color"></i></div>
        </div>
        <div class="profile-add-course-list">
          {{item.courseLabel}}
        </div>
        <div class="profile-add-course-list">
          {{item.courseDescribe}}
        </div>
      </div>
      <div class="profile-add-case" v-for="(item, index) in caseList" :key="index + 1">
        <div class="profile-add-course-set flex-row-between">
          <div>服务案例</div>
          <div><span @click="addCaseClick">添加</span></div>
        </div>
        <div class="profile-add-course-list flex-row-between">
          <div>{{item.caseName}}</div>
          <div><i class="iconfont iconbianji main-color"></i></div>
        </div>
        <div class="profile-add-course-list">
          {{item.enterpriseName}}
        </div>
      </div>
      <div class="profile-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'Profile',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '介绍资料',
      profileMsg: '',
      courseList: [
        {courseName: '课程名称', courseLabel: '课程标签', courseDescribe: '课程内容/描述'}
      ],
      caseList: [
        {caseName: '课程名称', enterpriseName: '企业名称'}
      ],
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  created () {},
  computed: {
  },
  methods: {
    courseClick () {
      this.$router.push('/personal/information/course')
    },
    addCaseClick () {
      this.$router.push('/personal/information/serviceCase')
    },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.profileMsg === '') {
        lib.MessageAlert_Error('请填写个人介绍')
        return false
      }
      return true
    },
    pushClick () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('introduction', _this.profileMsg)
      formData.append('intros', '')
      formData.append('examples', '')
      _this.$_HTTPData.getIntroData(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          this.$dialog.confirm({
            title: '<p style="text-align: center;font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.1rem">保存成功</p>',
            mes: '<p style="text-align: center;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.22rem!important;">现在认证只需300元</p>' +
            '<p style="text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.22rem!important;">认证后将可存储时间并开始约课</p>' +
            '<p style="text-align: center;font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.22rem!important;">取消认证时，认证费用将退还给您</p>',
            opts: [
              {
                txt: '暂不认证',
                color: '#ccc',
                callback: () => {
                  _this.$router.push('/calendar/index')
                }
              },
              {
                txt: '去认证',
                color: true,
                callback: () => {
                  _this.$router.push('/personal/information/authentication')
                }
              }
            ]
          })
        } else {
          _this.TipsTools.MessageAlert_Error(res.message)
        }
      })
    },
    inputValue () {
      if (this.profileMsg !== '' && this.birthDate !== '' && this.workDate !== '' && this.EMail !== '' && this.areaValue !== '') {
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
      if (this.name !== '' && this.birthDate !== '' && this.workDate !== '' && this.EMail !== '' && this.areaValue !== '') {
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
  /*input:focus {outline: none;}*/
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .profile-title{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding: 0.2rem;}
  .profile-btn{padding: 0.6rem 0;}
  .profile-text{border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;padding-bottom: 0.2rem;}
  .profile-text textarea{width:3.54rem;height:1.4rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);padding: 0.19rem 0.15rem;font-size:0.14rem;
    font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .profile-add-course{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;}
  .profile-add-case{padding: 0.2rem 0;margin: 0 0.2rem;}
  .profile-add-course-set{padding-bottom: 0.10rem;font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .profile-add-course-set span{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .profile-add-course-list{padding-top: 0.15rem;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
</style>
