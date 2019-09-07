import {HTTP} from './api/http'
import {config} from "../../config";

class HomeModel extends HTTP{
  getHomeData () {
    return this.ajax(config.BASE_URL + '/api/homeApi')
  }
}

export {HomeModel}