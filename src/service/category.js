import {HTTP} from './api/http'
import {config} from "../../config";

class CategoryModel extends HTTP{
  getCategoriesData () {   // 获取左边分类的数据
    return this.ajax(config.BASE_URL + '/api/homeApi/categories')
  }
  getCategoriesDetailData (path){   // 获取左边分类的数据的详细分类数据
    return this.ajax(config.BASE_URL + '/api/homeApi/categoriesdetail' + path)
  }
}

// export {CategoryModel}
export default CategoryModel