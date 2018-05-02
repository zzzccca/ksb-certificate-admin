import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  /*{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }*/
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
/*  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
    ]
  },*/
  {
    path: '/usersendb',
    component: Layout,
    redirect: '/usersendb/index',
      icon: 'icon-jijianfasong',
    noDropdown: true,
    children: [{ path: 'index', name: '管理员订单管理', component: _import('table/userSendB/index'), meta: { role: ['admin']}},
      { path: 'auditing', name: '用户寄件申请审核', component: _import('table/userSendB/auditing'), meta: { role: ['admin'] }}]
  },
  {
    path: '/',
    component: Layout,
    redirect:'/usersendb/index',
    hidden: true
  },
  {
    path: '/richText',
    component: Layout,
    redirect: '/richText/index',
    icon: 'icon-jijianfasong',
    noDropdown: true,
    children: [{ path: 'index', name: '首页说明', component: _import('table/richText/index'), meta: { role: ['admin']}},
      { path: 'auditing', name: '首页说明', component: _import('table/richText/index'), meta: { role: ['admin'] }}]
  },{
    path: '/upPassword',
    component: Layout,
    redirect: '/upPassword/index',
    icon: 'icon-jijianfasong',
    noDropdown: true,
    children: [{ path: 'index', name: '修改密码', component: _import('table/upPassword/index'), meta: { role: ['admin']}},
      { path: 'auditing', name: '修改密码', component: _import('table/upPassword/index'), meta: { role: ['admin'] }}]
  },



  // {

  //   path: '/userinfo',
  //   component: Layout,
  //   redirect: '/userinfo/index',
  //   // icon: 'icon-yonghuguanli',
  //   noDropdown: true,
  //   children: [{ path: 'index', name: '', component: _import('table/userinfo/index'), meta: { role: ['admin'] }}]
  // },
  // {
  //   path: '/cert',
  //   component: Layout,
  //   redirect: '/cert/index',
  //   // icon: 'icon-zhengshu',
  //   noDropdown: true,
  //   children: [{ path: 'index', name: '11 ', component: _import('table/cert/index'), meta: { role: ['admin']}},
  //     { path: 'modify', name: '证书管理修改', component: _import('table/cert/certModify'), meta: { role: ['admin'] }}]
  // },
  // {
  //   path: '/bindcert',
  //   component: Layout,
  //   redirect: '/bindcert/index',

  //   noDropdown: true,
  //   children: [{ path: 'index', name: ' ', component: _import('table/bindCert/index'), meta: { role: ['admin']}},
  //     { path: 'auditing', name: '证书绑定申请审核', component: _import('table/bindCert/auditing'), meta: { role: ['admin'] }}]
  // },
  // {
  //   path: '/usersenda',
  //   component: Layout,
  //   redirect: '/usersenda/index',
  //   // icon: 'icon-jijianfasong',
  //   noDropdown: true,
  //   children: [{ path: 'index', name: ' ', component: _import('table/userSendA/index'), meta: { role: ['admin']}},
  //     { path: 'auditing', name: '用户寄件申请审核', component: _import('table/userSendA/auditing'), meta: { role: ['admin'] }}]
  // },
  // {
  //   path: '/verify',
  //   component: Layout,
  //   redirect: '/verify/index',
  //   // icon: 'icon-verify',
  //   noDropdown: true,
  //   children: [{ path: 'index', name: ' ', component: _import('table/verifyRecord/index'), meta: { role: ['admin']}}]
  // },

  { path: '*', redirect: '/404', hidden: true }
];
