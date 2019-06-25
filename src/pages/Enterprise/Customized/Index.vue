<template>
  <div class="body">
    <div class="home-nav text-center">
      时间银行
    </div>
    <div class="search">
      <yd-search v-model="searchValue" :on-submit="submitHandler" placeholder="输入关键字进行搜索"></yd-search>
    </div>
    <div class="banner">
      <swiper :options="swiperOption">
        <swiper-slide><img src="../../../assets/icon/qiye.jpg"></swiper-slide>
        <swiper-slide><img src="../../../assets/icon/dingzhi.jpg"></swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <div class="wapper">
      <div class="class-select flex-row-between">
        <div class="all" @click="allClick">全部讲师</div>
        <div>
          <yd-button type="hollow" @click.native="show1 = true" class="tag">区域<i class="iconfont icontubiao-"></i></yd-button>
          <yd-button type="hollow" @click.native="show2 = true" class="tag">技能<i class="iconfont icontubiao-"></i></yd-button>
          <yd-button type="hollow" @click.native="show3 = true" class="tag">价格<i class="iconfont icontubiao-"></i></yd-button>
        </div>
      </div>
      <div class="class-list" v-show="classList">
        <div class="class-list-div flex-row-start" v-for='(item, index) of listData' :key="index" @click="pushDetailsClick(item)">
          <div class="class-list-div-left">
            <img :src="item.photo"/>
          </div>
          <div class="class-list-div-right">
            <label>{{item.name}}<i class="iconfont iconnan main-color" v-if="item.sexuality === 1"></i><i class="iconfont iconnv main-color" v-if="item.sexuality === 2"></i></label>
            <p>{{item.birthday}}岁 | 工作{{item.workingAge}}年 | {{item.livingLocation}}</p>
            <p><i class="iconfont iconqiwangzhiwei main-color"></i>{{item.skillLevel}}</p>
            <p><i class="iconfont iconditu main-color"></i>{{item.expectedLocation}}</p>
            <p><i class="iconfont icongongzi main-color"></i>{{item.expectedSalary}}元/小时</p>
          </div>
        </div>
      </div>
      <div class="class-list-none" v-show="classListNone">
        <p>完善企业信息</p>
        <p>通过审核后就可以进行约课啦</p>
        <div class="class-btn">
          <div class="btn-border" @click="pushClick">完善企业信息</div>
        </div>
      </div>
      <div class="class-list-none" v-show="classListNone2">
        <p>暂无搜索内容，看看其他内容吧</p>
      </div>
    </div>
    <tabbar-ent :idx="0"></tabbar-ent>
    <div class="index-popup">
      <!--区域-->
      <yd-popup v-model="show1" position="bottom">
        <div class="index-popup-div">
          <div class="">
            <!--<div class="index-popup-div-font">请选择要搜索的区域：</div>-->
            <div class="index-popup-div-font">
              <yd-cell-group>
                <yd-cell-item>
                  <input slot="left" type="text" @click.stop="cell1 = true" v-model="model1" readonly placeholder="请选择要搜索的区域">
                </yd-cell-item>
              </yd-cell-group>
              <yd-cityselect v-model="cell1" :callback="result1" :items="district"></yd-cityselect>
            </div>
          </div>
        </div>
        <div class="select-index">
          <div @click="addressClicked" class="select-btn">完成</div>
        </div>
        <!--<yd-button type="danger" style="margin: 30px;" @click.native="show1 = false" class="btn-border-opacity">完成1</yd-button>-->
      </yd-popup>
      <!--技能-->
      <yd-popup v-model="show2" position="bottom">
        <div class="index-popup-div">
          <div class="index-popup-div-font">请选择要搜索的技能：</div>
          <div class="skill-div">
            <div class="clearfix">
              <div v-for="(item, index) in skillList" :key="index"><span :class="active === item.name?'active':'Classification'" @click="oncheck(item.name)">{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="select-index2">
          <div @click="skillClicked" class="select-btn">完成</div>
        </div>
        <!--<yd-button type="danger" style="margin: 30px;" @click.native="show2 = false">完成2</yd-button>-->
      </yd-popup>
      <!--价格-->
      <yd-popup v-model="show3" position="bottom">
        <div class="index-popup-div">
          <div class="index-popup-div-font">请输入要搜索的价格范围：</div>
          <div class="price-div flex-row-between">
            <div>
              <input type="number" placeholder="最低价" v-model="miniPrice"/>
            </div>
            <div class="main-color"> — </div>
            <div>
              <input type="number" placeholder="最高价" v-model="maxPrice"/>
            </div>
          </div>
        </div>
        <div class="select-index">
          <div @click="priceClicked" class="select-btn">完成</div>
        </div>
        <!--<yd-button type="danger" style="margin: 30px;" @click.native="show3 = false">完成3</yd-button>-->
      </yd-popup>
    </div>
  </div>
</template>

<script>
import TabbarEnt from '../../../views/Tabbar/TabbarEnt'
import TipsTools from '../../../common/TipsTools'
import AreaJson from '../../../common/areaCode'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Popup } from 'mint-ui'
import 'mint-ui/lib/style.css'

let lib = new TipsTools()
export default {
  name: 'CustomizedIndex',
  components: {
    TabbarEnt,
    Popup,
    swiper,
    swiperSlide
  },
  data () {
    return {
      searchValue: '',
      classList: false,
      classListNone: true,
      classListNone2: false,
      selected: '',
      selected2: '',
      selected3: '',
      listData: [],
      listDataMyInfo: '',
      show1: false,
      show2: false,
      show3: false,
      miniPrice: '',
      maxPrice: '',
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          progressbarOpposite: true,
          paginationClickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2,
          hideOnClick: true,
          clickable: true
        }
      },
      areaValue: [],
      cell1: false,
      model1: '',
      district: AreaJson,
      skillList: [
        {
          name: '行业经验'
        },
        {
          name: '市场'
        },
        {
          name: '销售'
        },
        {
          name: '运营'
        },
        {
          name: '人力'
        },
        {
          name: '财务'
        },
        {
          name: '金融'
        },
        {
          name: '餐饮'
        },
        {
          name: '零售'
        },
        {
          name: '法律'
        },
        {
          name: '品牌管理'
        },
        {
          name: '新媒体营销'
        },
        {
          name: '公关传播'
        },
        {
          name: '商业合作'
        },
        {
          name: '市场调研'
        },
        {
          name: '应用推广'
        },
        {
          name: '整合营销'
        },
        {
          name: '职业技能培训'
        },
        {
          name: '职业规划'
        },
        {
          name: '互联网+'
        },
        {
          name: '产品设计'
        },
        {
          name: '研发管理'
        },
        {
          name: '测试管理'
        },
        {
          name: '数据分析'
        },
        {
          name: '新媒体运营'
        },
        {
          name: '活动运营'
        },
        {
          name: '产品运营'
        },
        {
          name: '用户运营'
        },
        {
          name: '内容运营'
        },
        {
          name: '网络运营'
        },
        {
          name: '商业数据分析'
        },
        {
          name: '创业和投资融'
        },
        {
          name: '团队搭建'
        },
        {
          name: '股权分配'
        },
        {
          name: '商业计划'
        },
        {
          name: '融资'
        },
        {
          name: '商业模式'
        },
        {
          name: '创业经验'
        },
        {
          name: '风险投资'
        },
        {
          name: '资本投资服务'
        },
        {
          name: '创业方法论'
        },
        {
          name: '心理'
        },
        {
          name: '个人成长'
        },
        {
          name: '情绪压力'
        },
        {
          name: '人际关系'
        },
        {
          name: '职场心理'
        }
      ],
      active: ''
    }
  },
  computed: {
  },
  mounted () {
    this.loadData()
    this.loadDataMyInfo()
  },
  methods: {
    oncheck (name) {
      this.active = name
    },
    result1 (ret) {
      this.model1 = `${ret.itemName1} ${ret.itemName2} ${ret.itemName3}`
      let temp = []
      temp.push(ret.itemValue1)
      temp.push(ret.itemValue2)
      temp.push(ret.itemValue3)
      this.areaValue = temp
    },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.model === '') {
        lib.MessageAlert_Error('请选择区域')
        return false
      }
      return true
    },
    checkInputValue2 () {
      if (this.active === '') {
        lib.MessageAlert_Error('请选择技能标签')
        return false
      }
      return true
    },
    checkInputValue3 () {
      if (this.miniPrice === '') {
        lib.MessageAlert_Error('请输入价格')
        return false
      }
      if (this.maxPrice === '') {
        lib.MessageAlert_Error('请输入价格')
        return false
      }
      if (this.maxPrice < this.miniPrice) {
        lib.MessageAlert_Error('最低价不得高于最高价')
        return false
      }
      return true
    },
    // 全部讲师
    allClick () {
      this.classListNone = false
      this.classList = true
      this.classListNone2 = false
      this.loadData()
    },
    // 按地域搜索
    addressClicked () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('companyId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
      _this.$_HTTPData.getLectureList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.show1 = false
          _this.listData = res.result
          _this.model1 = ''
          _this.areaValue = ''
          for (let i = 0; i < _this.listData.length; i++) {
            let birthday = new Date(_this.listData[i].birthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].birthday = age
            let secondDate = new Date(_this.listData[i].workingAge.replace(/-/g, '/'))
            let workYears = d.getFullYear() - secondDate.getFullYear()
            _this.listData[i].workingAge = workYears
          }
          if (_this.listData.length === 0) {
            debugger
            _this.classListNone = false
            _this.classList = false
            _this.classListNone2 = true
          }
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    // 按技能搜索
    skillClicked () {
      if (!this.checkInputValue2()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('companyId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('skillLevel', _this.active)
      _this.$_HTTPData.getLectureList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.show2 = false
          _this.listData = res.result
          _this.active = ''
          for (let i = 0; i < _this.listData.length; i++) {
            let birthday = new Date(_this.listData[i].birthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].birthday = age
            let secondDate = new Date(_this.listData[i].workingAge.replace(/-/g, '/'))
            let workYears = d.getFullYear() - secondDate.getFullYear()
            _this.listData[i].workingAge = workYears
          }
          if (_this.listData.length === 0) {
            debugger
            _this.classListNone = false
            _this.classList = false
            _this.classListNone2 = true
          }
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    // 按价格搜索
    priceClicked () {
      if (!this.checkInputValue3()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('companyId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('low', _this.miniPrice)
      formData.append('high', _this.maxPrice)
      _this.$_HTTPData.getLectureList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.show3 = false
          _this.listData = res.result
          _this.miniPrice = ''
          _this.maxPrice = ''
          for (let i = 0; i < _this.listData.length; i++) {
            let birthday = new Date(_this.listData[i].birthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].birthday = age
            let secondDate = new Date(_this.listData[i].workingAge.replace(/-/g, '/'))
            let workYears = d.getFullYear() - secondDate.getFullYear()
            _this.listData[i].workingAge = workYears
          }
          if (_this.listData.length === 0) {
            debugger
            _this.classListNone = false
            _this.classList = false
            _this.classListNone2 = true
          }
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    submitHandler (value) {
      this.$dialog.toast({mes: `搜索：${value}`})
    },
    pushDetailsClick (item) {
      this.$router.push(`/customized/details/${item.id}`)
    },
    pushClick () {
      this.$router.push('/user/enterpriseInfo')
    },
    loadDataMyInfo () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 2)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listDataMyInfo = res.result
          _this.getList()
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('companyId', _this.$SaiLei.cookiesGet('user_id'))
      _this.$_HTTPData.getLectureList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          for (let i = 0; i < _this.listData.length; i++) {
            let birthday = new Date(_this.listData[i].birthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].birthday = age
            let secondDate = new Date(_this.listData[i].workingAge.replace(/-/g, '/'))
            let workYears = d.getFullYear() - secondDate.getFullYear()
            _this.listData[i].workingAge = workYears
          }
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    getList () {
      if (this.listDataMyInfo.authStatus === 1) {
        this.classListNone = false
        this.classList = true
      } else {
        this.classListNone = true
        this.classList = false
      }
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;text-align: center}
  .search{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;margin: 0 0.1rem;}
  .banner{margin: 0.1rem;position: relative;}
  .banner img{width: 100%;height:1.6rem;}
  .class-select{padding: 0.15rem 0;border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;}
  .class-list{margin: 0 0.2rem;padding-bottom: 0.8rem;}
  .class-list .class-list-div{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .class-list .class-list-div .class-list-div-left img{width:1.4rem;height:1.2rem;background:rgba(216,216,216,1);border-radius:0.05rem;}
  .class-list .class-list-div .class-list-div-right{text-align: left;padding-left: 0.2rem;}
  .class-list .class-list-div .class-list-div-right label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .class-list .class-list-div .class-list-div-right label i{padding-left: 0.1rem;}
  .class-list .class-list-div .class-list-div-right p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .class-list .class-list-div .class-list-div-right p i{padding-right: 0.1rem;}
  .class-list-none{padding: 0.6rem 0;}
  .class-list-none p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .class-btn{margin: 0.5rem 0;}
  .class-select select{
    appearance:none!important;
    -moz-appearance:none!important;
    -webkit-appearance:none!important;
    border: 0.01rem solid #fff;
  }
  .class-select select{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .class-select .all{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .index-popup-div{padding: 0.2rem;}
  .index-popup-div-font{font-size: 0.15rem;font-family:PingFangSC-Regular;font-weight:400;}
  .index-popup-div-font input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;font-family: PingFangSC-Regular;font-weight: 400;}
  .select-btn{width:3.74rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);color:rgba(255,255,255,1);}
  .select-index{margin-top: 3rem;}
  .select-index2{margin: 0.3rem 0 0.6rem 0;}
  .active{float: left;margin-left: 0.1rem;padding: 0.1rem;background: rgba(249,91,64,1);margin-bottom: 0.1rem;border-radius: 0.04rem;font-size: 0.14rem;color: #fff;}
  .Classification {float: left;margin-left: 0.1rem;padding: 0.1rem;background: #f7f7f7;margin-bottom: 0.1rem;border-radius: 0.04rem;font-size: 0.14rem;}
  .skill-div{padding-top: 0.2rem;}
  .skill-div p{font-size: 0.14rem;font-family:PingFangSC-Regular;font-weight:400;padding-bottom: 0.1rem;}
  .price-div{padding-top: 0.2rem;}
  .price-div input{line-height: 0.4rem;height: 0.4rem;outline: none;border: 0.01rem solid #F95B40;font-size: 0.14rem;padding-left: 0.1rem;width: 1.7rem;border-radius: 0.05rem;font-family:PingFangSC-Regular;}
  .tag{font-family:PingFangSC-Regular;font-size: 0.14rem;}
</style>
