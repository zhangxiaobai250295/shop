import Vue from 'vue'

// 底部导航
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

// loading 加载动画
import { Loading } from 'vant';
Vue.use(Loading);

// 引入图片的加载动画
import { Image } from 'vant';
Vue.use(Image);

// 消息提示
import { Toast } from 'vant';
Vue.use(Toast);

// 弹出框 ，用处：在购物车商品删除时提示用户是否删除
import { Dialog } from 'vant';
Vue.use(Dialog);

// 导航条
import { NavBar } from 'vant';
Vue.use(NavBar);

// 购物车的地址模块
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue
  .use(ContactCard)
  .use(ContactList)
  .use(ContactEdit);

// 购物车地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);

// 购物车地址编辑
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

// 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

// 提交订单栏
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

// 宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

// 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示
import { Popup } from 'vant';
Vue.use(Popup);

// 用于选择时间，支持日期、时分等时间维度，通常与 弹出层 组件配合使用
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

// 商品卡片
import { Card } from 'vant';
Vue.use(Card);

// 标签页
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);