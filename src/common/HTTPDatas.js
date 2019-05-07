
// import Axios from 'axios'
import TipsTools from './TipsTools'
import SaiLei from './SaiLei'
const PUBLIC = false // 发布状态
class HTTPData {
  constructor () {
    this.host = ''
    this.location = ''
    if (PUBLIC) {
      this.host = ''
      this.location = ''
    } else {
      this.host = ''
      this.location = ''
    }
    this.TipsTools = new TipsTools()
    this.SaiLei = new SaiLei()
    // 请求路径对象
    this.url = {}
  }
}

export default HTTPData
