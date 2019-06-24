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
        <yd-button type="hollow" @click.native="show1 = true">按区域筛选</yd-button>
        <yd-button type="hollow" @click.native="show2 = true">按技能筛选</yd-button>
        <yd-button type="hollow" @click.native="show3 = true">按价格筛选</yd-button>
      </div>
      <div class="class-list" v-show="classList">
        <div class="class-list-div flex-row-start" v-for='(item, index) of listData' :key="index" @click="pushDetailsClick(item)">
          <div class="class-list-div-left">
            <img :src="item.photo"/>
          </div>
          <div class="class-list-div-right">
            <label>{{item.name}}<i class="iconfont iconnan main-color" v-if="item.sexuality === 1"></i><i class="iconfont iconnv main-color" v-if="item.sexuality === 2"></i></label>
            <p>{{item.birthday}}岁 | 工作{{item.workingAge}}年 | 青岛</p>
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
    </div>
    <tabbar-ent :idx="0"></tabbar-ent>
    <div class="index-popup">
      <!--区域-->
      <yd-popup v-model="show1" position="bottom">
        <div class="index-popup-div">
          <div class="flex-row-around">
            <div class="index-popup-div-font">请选择要搜索的区域：</div>
            <div class="index-popup-div-font">
              <yd-cell-group>
                <yd-cell-item>
                  <input slot="right" type="text" @click.stop="cell1 = true" v-model="model1" readonly>
                </yd-cell-item>
              </yd-cell-group>
              <yd-cityselect v-model="cell1" :callback="result1" :items="district"></yd-cityselect>
            </div>
          </div>
        </div>
        <yd-button type="danger" style="margin: 30px;" @click.native="show1 = false">完成1</yd-button>
      </yd-popup>
      <!--技能-->
      <yd-popup v-model="show2" position="bottom">
        <yd-button type="danger" style="margin: 30px;" @click.native="show2 = false">完成2</yd-button>
      </yd-popup>
      <!--价格-->
      <yd-popup v-model="show3" position="bottom">
        <yd-button type="danger" style="margin: 30px;" @click.native="show3 = false">完成3</yd-button>
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
      selected: '',
      selected2: '',
      selected3: '',
      listData: [],
      listDataMyInfo: '',
      show1: false,
      show2: false,
      show3: false,
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
      district: AreaJson
    }
  },
  computed: {
  },
  mounted () {
    this.loadData()
    this.loadDataMyInfo()
  },
  methods: {
    result1 (ret) {
      this.model1 = `${ret.itemName1} ${ret.itemName2} ${ret.itemName3}`
      let temp = []
      temp.push(ret.itemValue1)
      temp.push(ret.itemValue2)
      temp.push(ret.itemValue3)
      this.areaValue = temp
      console.log(this.areaValue)
    },
    handleChange (value) {
      console.log(value)
    },
    allClick () {
      this.loadData()
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
          console.log(res.message)
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
            console.log(_this.listData[i].birthday)
            let birthday = new Date(_this.listData[i].birthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].birthday = age
            console.log(_this.listData[i].birthday)
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
</style>
