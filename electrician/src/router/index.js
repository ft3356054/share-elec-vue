import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  //用户端
  {
    path: '/customer',
    name: 'home',
    component: () => import("../views/customer/Home/home.vue"),
  },
  {
    path: '/Pay/:orderId', //支付
    name: 'Pay',
    component: () => import('../views/Payment/Pay.vue'),
  },
  {
    path: '/Paytwo', //支付  扫码
    name: 'Paytwo',
    component: () => import('../views/Payment/Paytwo.vue'),
  }, {
    path: '/Payments', //支付成功
    name: 'Payments',
    component: () => import('../views/Payment/Payments.vue')
  }, {
    path: '/Paymentf', //支付失败
    name: 'Paymentf',
    component: () => import('../views/Payment/Paymentf.vue')
  }, {
    path: "/Infrom", //搜索资讯
    name: "Infrom",
    component: () => import("../views/InformationDe/infrom.vue")
  }, {
    path: '/Indet', //资讯详情
    name: 'Indet',
    component: () => import('../views/InformationDe/Indet.vue')
  }, {
    path: '/order', //我的订单
    name: 'order',
    component: () => import('../views/order/order.vue')
  }, {
    path: '/My', //我的信息
    name: 'My',
    component: () => import('../views/My/my.vue')
  }, {
    path: '/autation', //电工认证
    name: 'autation',
    component: () => import('../views/My/autation.vue')
  }, {
    path: '/autCom', //电工认证 搜索公司
    name: 'autCom',
    component: () => import('../views/My/autCom.vue')
  }, {
    path: '/complaint', //投诉
    name: 'complaint',
    component: () => import('../views/complaint/complaint.vue')
  }, {
    path: '/estimate', //评价
    name: 'estimate',
    component: () => import('../views/estimate/estimate.vue')
  }, {
    path: '/demand', //需求发起
    name: 'demand',
    component: () => import('../views/demand/demand.vue')
  }, {
    path: '/search', //搜索页面
    name: 'search',
    component: () => import('../views/order/search.vue')
  }, {
    path: '/Message', //消息列表
    name: 'Message',
    component: () => import('../views/Message/Message.vue')
  }, {
    path: '/noArrived', //订单详情  未到达
    name: 'noArrived',
    component: () => import('../views/About/noArrived.vue')
  }, {
    path: '/accepted', //订单详情  待验收
    name: 'accepted',
    component: () => import('../views/About/accepted.vue')
  },,{
    path: '/complete', //订单详情  以完成
    name: 'complete',
    component: () => import('../views/About/complete.vue')
  },{
      path: '/stayOrder',  //订单详情  待接单
      name: 'stayOrder',
      component: () => import('../views/About/stayOrder.vue')
    },
    {
       path: '/stayMake',  //订单详情  待预约
       name: 'stayMake',
      component: () => import('../views/About/stayMake.vue')
     },
     {
      path: '/stayRepair',  //订单详情  待维修
      name: 'stayRepair',
      component: () => import('../views/About/stayRepair.vue')
    },
    {
      path: '/stayScene',  //订单详情  待现场勘查
      name: 'stayScene',
      component: () => import('../views/About/stayScene.vue')
    },
   {
      path: '/cancelled',  //订单详情  以取消
      name: 'cancelled',
      component: () => import('../views/About/cancelled.vue')
    },
    {
      path: '/details', //消息详情   进行中
      name: 'details',
      component: () => import("../views/About/details.vue")
    },{
      path: '/prodemo', //消息详情   探查完成
      name: 'prodemo',
      component: () => import("../views/About/prodemo.vue")
    },
   // 电工端
    // 首页
    {
      path: '/electricianend',
      name: 'Home',
      component: () => import('@/pages/electricianend/home')
    },
    // 抢单
    {
      path: '/ordergrabbing',
      name: 'Ordergrabbing',
      component: () => import('@/pages/electricianend/ordergrabbing')
    },
    // 待预约
    {
      path: '/appointment:orderId/:electricianId',
      name: 'Appointment',
      component: () => import('@/pages/electricianend/appointment')

    },
    // 订单详情
    {
      path: '/ordergrabbingdetail/detail',
      name: 'Ordergrabbingdetail',
      component: () => import('@/pages/electricianend/ordergrabbingdetail/detail')

    },
    // 我的订单
    {
      path: '/myorderabbing',
      name: 'Myordergrabbing',
      component: () => import('@/pages/electricianend/myorderabbing')
    },
    // 去维修
    {
      path: '/repair:orderId/:electricianId',
      name: 'Repair',
      component: () => import('@/pages/electricianend/repair')
    },
    // 地图导航
    {
      path: '/navigation',
      name: 'Navigation',
      component: () => import('@/pages/electricianend/repair/navigation')
    },
    // 个人信息
    {
      path: '/userinformation',
      name: 'Userinformation',
      component: () => import('@/pages/electricianend/userinformation')
    },
    // 电工认证
    {
      path: '/authentication',
      name: 'Authentication',
      component: () => import('@/pages/electricianend/authentication')
    },
     // 电工认证
     {
      path: '/companyselection',
      name: 'Companyselection',
      component: () => import('@/pages/electricianend/authentication/companyselection')
    },
    // 消息中心
    {
      path: '/messages',
      name: 'Messages',
      component: () => import('@/pages/electricianend/messages')
    },
    // 已取消
    {
      path: '/statusfile/cancelled',
      name: 'Cancelled',
      component: () => import('@/pages/electricianend/statusfile/cancelled')
    },
    // 已完成
    {
      path: '/statusfile/completed',
      name: 'Completed',
      component: () => import('@/pages/electricianend/statusfile/completed')

    },
    // 现场勘察
    {
      path: '/prospecting',
      name: 'Prospecting',
      component: () => import('@/pages/electricianend/prospecting')
    },
    // 退回订单
    {
      path: '/returnorder',
      name: 'Returnorder',
      component: () => import('@/pages/electricianend/returnorder')
    },
    // 退回订单
    {
      path: '/cancel',
      name: 'Cancel',
      component: () => import('@/pages/electricianend/returnorder/cancel')
    },
    // 上传合同
    {
      path: '/uploadcontract',
      name: 'Uploadcontract',
      component: () => import('@/pages/electricianend/uploadcontract')
    },
    // 人员增加
    {
      path: '/personneladd',
      name: 'Personneladd',
      component: () => import('@/pages/electricianend/personneladd')
    },
    // 完成施工
    {
      path: '/completion',
      name: 'Completion',
      component: () => import('@/pages/electricianend/completion')
    },
    // 上传报告
    {
      path: '/servicereport',
      name: 'Servicereport',
      component: () => import('@/pages/electricianend/servicereport')
    },
    // 服务评价
    {
      path: '/evaluate',
      name: 'Evaluate',
      component: () => import('@/pages/electricianend/evaluate')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



