/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars,no-useless-constructor */
/**
 * 功能描述：UserModel.js 用户模型
 * @Author：公言山
 * @Date：2018/2/9 17:00
 */
let nickName,
  id,
  profile,
  loginId,
  realName,
  userType,
  qq,
  mobilePhone,
  managerUserId,
  inviteCode,
  idCardTypeCode,
  idCardType,
  idCard,
  iconUrl,
  email,
  brokerUserId,
  brokerLevel,
  brokerInviteCode,
  brokerCompanyId,
  activeStatus,
  modifiedTime,
  remark,
  registTime,
  requestIp,
  lastIp,
  lastTimeStr,
  lbsProvince,
  lbsDistrict,
  lbsCity,
  lbsProvinceCode,
  lbsDistrictCode,
  lbsCityCode,
  authBrokerStatus,
  auth4Status,
  authStatus,
  authSignStatus,
  walletAddress,
  activation,
  assessStatus,
  prodStatus,
  agentLevel,
  agentLevel2
export default class UserModel {
  constructor (options) {
    this.setOptions(options)
  }
  setOptions (options) {
    if (options) {
      nickName = options.nickName
      loginId = options.loginId
      userType = options.userType
      id = options.id
      profile = options.profile
      realName = options.realName
      qq = options.qq
      mobilePhone = options.mobilePhone
      managerUserId = options.managerUserId
      inviteCode = options.inviteCode
      idCardTypeCode = options.idCardTypeCode
      idCardType = options.idCardType
      idCard = options.idCard
      iconUrl = options.iconUrl
      email = options.email
      brokerUserId = options.brokerUserId
      brokerLevel = options.brokerLevel ? options.brokerLevel : 0
      brokerInviteCode = options.brokerInviteCode
      brokerCompanyId = options.brokerCompanyId
      activeStatus = options.activeStatus
      modifiedTime = options.modifiedTime
      remark = options.remark
      registTime = options.registTime
      requestIp = options.requestIp
      lastIp = options.lastIp
      lastTimeStr = options.lastTimeStr
      lbsProvince = options.lbsProvince
      lbsDistrict = options.lbsDistrict
      lbsCity = options.lbsCity
      lbsProvinceCode = options.lbsProvinceCode
      lbsDistrictCode = options.lbsDistrictCode
      lbsCityCode = options.lbsCityCode
      authBrokerStatus = options.authBrokerStatus ? options.authBrokerStatus : 0
      auth4Status = options.auth4Status ? options.auth4Status : 0
      authStatus = options.authStatus ? options.authStatus : 0
      authSignStatus = options.authSignStatus
      walletAddress = options.walletAddress
      activation = options.activation ? options.activation : 0
      assessStatus = options.assessStatus ? options.assessStatus : 0
      prodStatus = options.prodStatus ? options.prodStatus : 0
      agentLevel = options.agentLevel ? options.agentLevel : 0
      agentLevel2 = options.agentLevel2 ? options.agentLevel2 : 0
    }
  }
  getId () {
    return id
  }
  getUserType () {
    return userType
  }
  getProfile () {
    return profile
  }
  show () {
    // console.log(`${this.getNickName()}`)
  }
  getNickName () {
    return nickName
  }
  getIconUrl () {
    return iconUrl
  }
  getRealName () {
    if (realName) {
      // return `${realName.substr(0, 1)}**`
      return realName
    } else {
      return null
    }
  }
  getRegistTime () {
    return registTime
  }
  getEmail () {
    return email
  }
  getLoginId () {
    return loginId
  }
  getPhoneNumber () {
    return mobilePhone
  }
  getRequestIp () {
    return requestIp
  }
  getLastIp () {
    return lastIp
  }
  getLastTime () {
    return lastTimeStr
  }
  getLbsProvince () {
    return lbsProvince
  }
  getLbsProvinceCode () {
    return lbsProvinceCode
  }
  getLbsCity () {
    return lbsCity
  }
  getLbsCityCode () {
    return lbsCityCode
  }
  getLbsDistrict () {
    return lbsDistrict
  }
  getLbsDistrictCode () {
    return lbsDistrictCode
  }
  getAreaInfo () {
    return {
      province: lbsProvince,
      city: lbsCity,
      district: lbsDistrict,
      address: `${lbsProvince}${lbsCity}${lbsDistrict}`
    }
  }
  getAuthBrokerStatus () {
    return authBrokerStatus
  }
  getInviteCode () {
    return inviteCode
  }
  getActiveStatus () {
    return activeStatus
  }
  getAuth4Status () {
    return auth4Status
  }
  getAuthStatus () {
    return authStatus
  }
  getAuthSignStatus () {
    return authSignStatus
  }
  getWalletAddress () {
    return walletAddress
  }
  getActivation () {
    return activation
  }
  getAssessStatus () {
    return assessStatus
  }
  getProdStatus () {
    return prodStatus + ''
  }
  getBrokerLevel () {
    return brokerLevel + ''
  }
  getAgentLevel () {
    return agentLevel + ''
  }
  getAgentLevel2 () {
    return agentLevel2 + ''
  }
}
