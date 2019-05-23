<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="basedata-main">
        <div class="basedata-list flex-row-between">
          <div>头像</div>
          <div class="user-icon">
            <img :src="src" alt="">
            <input type="file" @change="getFile" ref="file" placeholder="上传照片">
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div>姓名</div>
          <div>
            <input type="text" v-model="name" placeholder="请填写真实姓名" v-on:input="inputValue"/>
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div>性别</div>
          <div class="flex-row-around">
            <div v-for="(item,index) in sex" :key="index" class="basedata-list-sex" :class="{ active: changeSex === index + 1}" @click="sexClicked(index)">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div>出生年月</div>
          <div class="flex-row-between">
            <div>
              <yd-cell-group>
              <yd-cell-item>
                <yd-datetime type="month" v-model="birthDate" slot="right" start-date="1920-01" :end-date="nowTime" v-on:input="inputValue"></yd-datetime>
              </yd-cell-item>
            </yd-cell-group>
            </div>
            <div><i class="iconfont iconjiantou"></i></div>
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div>参加工作时间</div>
          <div class="flex-row-between">
            <div>
              <yd-cell-group>
                <yd-cell-item>
                  <yd-datetime type="month" v-model="workDate" slot="right" start-date="1920-01" :end-date="nowTime" v-on:input="inputValue"></yd-datetime>
                </yd-cell-item>
              </yd-cell-group>
            </div>
            <div><i class="iconfont iconjiantou"></i></div>
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div>现居地</div>
          <div class="flex-row-between">
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
        <div class="basedata-list flex-row-between" style="border: 0">
          <div>电子邮箱</div>
          <div>
            <input type="text" v-model="EMail" v-on:input="inputValue" placeholder="点击编辑"/>
          </div>
        </div>
      </div>
      <div class="basedata-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import AreaJson from '../../../../common/areaCode'
import Navbar from '../../../../views/navbar/navbar'
// import FileManager from '../../../../common/FileManager'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'BaseData',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '基本信息',
      name: '',
      src: '',
      sex: [
        {name: '男'},
        {name: '女'}
      ],
      changeSex: 0,
      birthDate: '',
      workDate: '',
      EMail: '',
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
  computed: {
    // userInfo () {
    //   return this.$store.state.user
    // },
    // userProfile () {
    //   if (this.userInfo) {
    //     return this.userInfo.getProfile()
    //   } else {
    //     return ''
    //   }
    // }
  },
  methods: {
    getFile (e) {
      let _this = this
      var files = e.target.files[0]
      if (!e || !window.FileReader) return
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = function () {
        _this.src = this.result
      }
    },
    // userIconDidClicked () {
    // },
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
    // 性别按钮
    sexClicked (index) {
      this.changeSex = index + 1
    },
    /**
     * 点击了下一步按钮
     */
    pushClick () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('name', _this.name)
      formData.append('sex', _this.changeSex)
      formData.append('birthday', _this.birthDate)
      formData.append('workDate', _this.workDate)
      formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
      formData.append('email', _this.EMail)
      formData.append('profile', _this.src)
      _this.$_HTTPData.getFillInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success('设置成功')
          this.$router.push('/personal/information/intention')
        } else {
          console.log(res.message)
        }
      })
    },
    // pushClick () {
    //   this.$router.push('/personal/information/intention')
    // },
    inputValue () {
      if (this.name !== '' && this.birthDate !== '' && this.workDate !== '' && this.EMail !== '' && this.areaValue !== '') {
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
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .basedata-main{margin: 0 0.2rem;padding: 0.2rem 0 0.4rem 0;}
  .basedata-main .basedata-list{height: 0.5rem;line-height: 0.50rem;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);border-bottom: 0.01rem solid #E8E8E8;}
  .basedata-main .basedata-list i{padding-left: 0.15rem;}
  .basedata-main .basedata-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .basedata-list-sex{width:0.5rem;height:0.27rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);line-height: 0.23rem;text-align: center;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem}
  .active{background: rgba(249,91,64,1);color: #fff;}
  .basedata-btn{padding-bottom: 1rem;padding-top: 0.3rem;}
  .user-icon{position: relative;overflow: hidden;}
  .user-icon input{position: absolute;top: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)';}
  .user-icon img{width:0.35rem;height:0.35rem;}
</style>
