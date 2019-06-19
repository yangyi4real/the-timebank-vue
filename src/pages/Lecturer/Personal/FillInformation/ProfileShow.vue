<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div v-show="mainDiv">
        <div class="profile-title">个人介绍</div>
        <div class="profile-text">
          <textarea draggable="false" v-model="introduction" placeholder="用文字描述自己或者直接上传一张简历图片吧~"></textarea>
        </div>
        <div class="profile-add-course">
          <div class="profile-add-course-set flex-row-between">
            <div>课程介绍</div>
            <div><span @click="courseClick">添加</span></div>
          </div>
          <div v-for="(item, index) in introDataList" :key="index" style="border-bottom: 0.01rem solid #E8E8E8;padding-bottom: 0.2rem;">
            <div class="profile-add-course-list flex-row-between">
              <div>{{item.className}}</div>
              <div>
                <i class="iconfont iconbianji main-color" @click="courseModify(index)"></i>
                <i class="iconfont iconshanchu main-color" @click="courseDelClick(index)"></i>
              </div>
            </div>
            <div class="profile-add-course-list">
              {{item.tags}}
            </div>
            <div class="profile-add-course-list">
              {{item.description}}
            </div>
          </div>
        </div>
        <div class="profile-add-case">
          <div class="profile-add-course-set flex-row-between">
            <div>服务案例</div>
            <div><span @click="addCaseClick">添加</span></div>
          </div>
          <div v-for="(item, index) in introDatasList" :key="index + 1" style="border-bottom: 0.01rem solid #E8E8E8;padding-bottom: 0.2rem;">
            <div class="profile-add-course-list flex-row-between">
              <div>{{item.className}}</div>
              <div>
                <i class="iconfont iconbianji main-color" @click="caseModify(index)"></i>
                <i class="iconfont iconshanchu main-color" @click="caseDelClick(index)"></i>
              </div>
            </div>
            <div class="profile-add-course-list">
              {{item.companyName}}
            </div>
          </div>
        </div>
        <div class="profile-btn">
          <div @click="keepClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">保存</div>
        </div>
      </div>
      <div class="course" v-show="courseDiv">
        <div class="course">
          <div class="course-list flex-row-between">
            <div>课程名称</div>
            <div><input type="text" v-model="className" v-on:input="inputValue"/></div>
          </div>
          <div class="course-list flex-row-between">
            <div>课程标签</div>
            <div><input type="text" v-model="tags" v-on:input="inputValue"/></div>
          </div>
          <div class="course-text">
            <div class="course-text-title">课程内容/描述</div>
            <textarea draggable="false" v-model="description" v-on:input="inputValue" placeholder=""></textarea>
          </div>
        </div>
        <div class="course-btn flex-row-between">
          <div @click="courseCancelClick" class="btn-small-border">取消</div>
          <div @click="courseCompleteClick" :class="{ 'btn-small-opacity': inOperation, 'btn-small': operation}">完成</div>
        </div>
      </div>
      <div class="course" v-show="courseDiv2">
        <div class="course">
          <div class="course-list flex-row-between">
            <div>课程名称</div>
            <div><input type="text" v-model="className" v-on:input="inputValue"/></div>
          </div>
          <div class="course-list flex-row-between">
            <div>课程标签</div>
            <div><input type="text" v-model="tags" v-on:input="inputValue"/></div>
          </div>
          <div class="course-text">
            <div class="course-text-title">课程内容/描述</div>
            <textarea draggable="false" v-model="description" v-on:input="inputValue" placeholder=""></textarea>
          </div>
        </div>
        <div class="course-btn flex-row-between">
          <div @click="courseCancelClick" class="btn-small-border">取消</div>
          <div @click="courseCompleteClick2" :class="{ 'btn-small-opacity': inOperation, 'btn-small': operation}">完成</div>
        </div>
      </div>
      <div class="service-case" v-show="serviceDiv">
        <div class="course">
          <div class="course-list flex-row-between">
            <div>课程名称</div>
            <div><input type="text" v-model="className" v-on:input="inputValue"/></div>
          </div>
          <div class="course-list flex-row-between" style="border: 0">
            <div>企业名称</div>
            <div><input type="text" v-model="companyName" v-on:input="inputValue"/></div>
          </div>
        </div>
        <div class="course-btn flex-row-between">
          <div @click="caseCancelClick" class="btn-small-border">取消</div>
          <div @click="caseCompleteClick" :class="{ 'btn-small-opacity': inOperation, 'btn-small': operation}">完成</div>
        </div>
      </div>
      <div class="service-case" v-show="serviceDiv2">
        <div class="course">
          <div class="course-list flex-row-between">
            <div>课程名称</div>
            <div><input type="text" v-model="className" v-on:input="inputValue"/></div>
          </div>
          <div class="course-list flex-row-between" style="border: 0">
            <div>企业名称</div>
            <div><input type="text" v-model="companyName" v-on:input="inputValue"/></div>
          </div>
        </div>
        <div class="course-btn flex-row-between">
          <div @click="caseCancelClick" class="btn-small-border">取消</div>
          <div @click="caseCompleteClick2" :class="{ 'btn-small-opacity': inOperation, 'btn-small': operation}">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../../../../views/navbar/navbar'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'ProfileShow',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '介绍资料',
      introduction: '',
      introDataList: [], // 已完成的课程介绍list
      introDatasList: [], // 返回的课程案例list
      className: '',
      tags: '',
      description: '',
      companyName: '',
      inOperation: true, // 灰色按钮
      operation: false,
      mainDiv: true,
      courseDiv: false,
      courseDiv2: false,
      serviceDiv: false,
      serviceDiv2: false,
      dataIndex: '',
      dataIndex2: ''
    }
  },
  created () {},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.introduction = res.result.introduction
          _this.introDataList = res.result.classIntroEntityList
          _this.introDatasList = res.result.classExampleEntityList
          console.log(res.result)
        } else {
          console.log(res.message)
        }
      })
    },
    checkInputValueCourse () {
      if (this.className === '') {
        lib.MessageAlert_Error('请填写课程名称')
        return false
      }
      if (this.tags === '') {
        lib.MessageAlert_Error('请填写课程标签')
        return false
      }
      if (this.description === '') {
        lib.MessageAlert_Error('请填写课程内容/描述')
        return false
      }
      return true
    },
    checkInputValueCase () {
      if (this.className === '') {
        lib.MessageAlert_Error('请填写课程名称')
        return false
      }
      if (this.companyName === '') {
        lib.MessageAlert_Error('请填写企业名称')
        return false
      }
      return true
    },
    // 课程介绍点击完成
    courseCompleteClick () {
      if (!this.checkInputValueCourse()) { return }
      this.mainDiv = true
      this.courseDiv = false
      let temp = {className: this.className, tags: this.tags, description: this.description, userId: this.$SaiLei.cookiesGet('user_id')}
      this.introDataList.push(temp)
      // 清空文本框中的数据
      this.className = ''
      this.tags = ''
      this.description = ''
      console.log(this.introDataList)
    },
    // 课程介绍点击修改完成
    courseCompleteClick2 () {
      if (!this.checkInputValueCourse()) { return }
      this.mainDiv = true
      this.courseDiv2 = false
      this.introDataList.splice(this.dataIndex, 1)
      let temp = {className: this.className, tags: this.tags, description: this.description, userId: this.$SaiLei.cookiesGet('user_id')}
      this.introDataList.push(temp)
      // 清空文本框中的数据
      this.className = ''
      this.tags = ''
      this.description = ''
    },
    // 课程介绍点击修改
    courseModify (index) {
      this.dataIndex = index
      this.mainDiv = false
      this.courseDiv2 = true
      this.className = this.introDataList[index].className
      this.tags = this.introDataList[index].tags
      this.description = this.introDataList[index].description
    },
    // 课程案例点击完成
    caseCompleteClick () {
      if (!this.checkInputValueCase()) { return }
      this.mainDiv = true
      this.serviceDiv = false
      let tempData = {className: this.className, companyName: this.companyName, userId: this.$SaiLei.cookiesGet('user_id')}
      this.introDatasList.push(tempData)
      // 清空文本框中的数据
      this.className = ''
      this.companyName = ''
      console.log(this.introDatasList)
    },
    // 课程案例点击修改完成
    caseCompleteClick2 () {
      if (!this.checkInputValueCase()) { return }
      this.mainDiv = true
      this.serviceDiv2 = false
      this.introDatasList.splice(this.dataIndex2, 1)
      let tempData = {className: this.className, companyName: this.companyName, userId: this.$SaiLei.cookiesGet('user_id')}
      this.introDatasList.push(tempData)
      // 清空文本框中的数据
      this.className = ''
      this.companyName = ''
    },
    // 课程案例点击修改
    caseModify (index) {
      this.dataIndex2 = index
      this.mainDiv = false
      this.serviceDiv2 = true
      this.className = this.introDatasList[index].className
      this.companyName = this.introDatasList[index].companyName
      console.log(this.className)
      console.log(this.companyName)
    },
    // 点击添加课程介绍
    courseClick () {
      this.mainDiv = false
      this.courseDiv = true
    },
    // 点击添加课程案例
    addCaseClick () {
      this.mainDiv = false
      this.serviceDiv = true
    },
    // 点击删除课程案例
    courseDelClick (index) {
      if (!confirm('是否要删除当前数据')) {
        return
      }
      this.introDataList.splice(index, 1)
    },
    // 点击删除课程案例
    caseDelClick (index) {
      if (!confirm('是否要删除当前数据')) {
        return
      }
      this.introDatasList.splice(index, 1)
    },
    // 取消添加课程介绍
    courseCancelClick () {
      this.mainDiv = true
      this.courseDiv = false
      this.courseDiv2 = false
    },
    // 取消添加课程案例
    caseCancelClick () {
      this.mainDiv = true
      this.serviceDiv = false
      this.serviceDiv2 = false
    },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.introduction === '') {
        lib.MessageAlert_Error('请填写个人介绍')
        return false
      }
      return true
    },
    keepClick () {
      if (!this.checkInputValue()) { return }
      let myJSON = JSON.stringify(this.introDataList)
      // let myJSON = this.introDataList
      let myJSONData = JSON.stringify(this.introDatasList)
      // let myJSONData = this.introDatasList
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('introduction', _this.introduction)
      formData.append('intros', myJSON)
      formData.append('examples', myJSONData)
      _this.$_HTTPData.getIntroData(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.$router.push('/personal/personaldata')
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_Error(res.message)
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
  .profile-add-course{padding: 0.2rem 0;margin: 0 0.2rem;}
  .profile-add-case{padding: 0.2rem 0;margin: 0 0.2rem;}
  .profile-add-course-set{padding-bottom: 0.10rem;font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .profile-add-course-set span{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .profile-add-course-list{padding-top: 0.15rem;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .course{margin: 0 0.1rem;padding-bottom: 0.2rem;}
  .service-case{margin: 0 0.1rem;padding-bottom: 0.2rem;}
  .course-list{padding: 0.15rem 0;font-size:0.16rem;border-bottom: 0.01rem solid #E8E8E8;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .course-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .course-btn{padding-bottom: 0.6rem;width: 3.14rem;margin: 0 auto;padding-top: 3rem}
  .btn-small-opacity{width:1.27rem;height:0.48rem;line-height: 0.48rem;background:rgba(249,91,64,1);border-radius:0.05rem;opacity:0.503;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);text-align: center;}
  .btn-small{width:1.27rem;height:0.48rem;line-height: 0.48rem;background:rgba(249,91,64,1);border-radius:0.05rem;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);text-align: center;}
  .btn-small-border-opacity{width:1.27rem;height:0.48rem;line-height: 0.48rem;border-radius:0.05rem;opacity:0.503;border:0.01rem solid rgba(249,91,64,1);font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center;}
  .btn-small-border{width:1.27rem;height:0.48rem;line-height: 0.48rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center;}
  .course-text .course-text-title{padding: 0.15rem 0;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .course-text textarea{width:3.54rem;height:1rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);padding: 0.19rem 0.15rem;font-size:0.14rem;
    font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .course-list{padding: 0.15rem 0;font-size:0.16rem;border-bottom: 0.01rem solid #E8E8E8;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .course-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .course-btn{padding: 0.6rem 0;width: 3.14rem;margin: 0 auto}
  .btn-small-opacity{width:1.27rem;height:0.48rem;line-height: 0.48rem;background:rgba(249,91,64,1);border-radius:0.05rem;opacity:0.503;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);text-align: center;}
  .btn-small{width:1.27rem;height:0.48rem;line-height: 0.48rem;background:rgba(249,91,64,1);border-radius:0.05rem;font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,255,255,1);text-align: center;}
  .btn-small-border-opacity{width:1.27rem;height:0.48rem;line-height: 0.48rem;border-radius:0.05rem;opacity:0.503;border:0.01rem solid rgba(249,91,64,1);font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center;}
  .btn-small-border{width:1.27rem;height:0.48rem;line-height: 0.48rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);text-align: center;}
  .main-color{padding-right: 0.05rem}
  .popup{width: 100%;height: 100%;}
  .popup-bg{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: #000;opacity: 0.3;}
  .popup-main{position: fixed;background: #fff;width: 3.2rem;height: 2.1rem;border: 0.01rem solid #ccc;text-align: center;border-radius: 0.08rem;top: calc(50% - 1.6rem);left: calc(50% - 1.6rem);}
  .popup-main .msg{font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-top: 0.3rem;padding-bottom: 0.1rem;}
  .popup-main .msg i{font-weight: 600;font-size:0.19rem;}
  .popup-main .text{padding-bottom: 0.15rem;}
  .popup-main label{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-bottom: 0.1rem;display: block;}
  .popup-main p{font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.18rem;}
  .popup-main-btn{border-top: 0.01rem solid #E8E8E8;font-size:0.17rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .popup-main-btn div{width: 50%;padding: 0.18rem 0;}
  .popup-main-btn .div{border-right: 0.01rem solid #E8E8E8;color:rgba(143,143,143,1)!important;}
</style>
