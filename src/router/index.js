import { createRouter, createWebHashHistory } from "vue-router"
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Bill from '../pages/Bill.vue';
import Provider from '../pages/Provider.vue';
import User from '../pages/User.vue';

import BillList from '../components/bill/BillList.vue';
import BillView from '../components/bill/BillView.vue';
import BillEdit from '../components/bill/BillEdit.vue';

import ProviderList from '../components/provider/ProviderList.vue';
import ProviderView from '../components/provider/ProviderView.vue';
import ProviderEdit from '../components/provider/ProviderEdit.vue';

import UserList from '../components/user/UserList.vue';
import UserView from '../components/user/UserView.vue';
import UserEdit from '../components/user/UserEdit.vue';
import ModifyPwd from '../components/user/ModifyPwd.vue';
import axios from "axios";

const routes = [{
  name: 'login',
  path: '/login',
  component: Login,
  meta: { title: '登录' }
},{
  name: 'home',
  path: '/',
  component: Home,
  meta: { title: '主页' },
  children: [{
    name: 'bill',
    path: '/bill',
    component: Bill,
    meta: { title: '订单管理' },
    children: [{
      name: 'bill-list',
      path: '/bill/list',
      component: BillList,
    }, {
      name: 'bill-view',
      path: '/bill/view/:id',
      component: BillView,
      props: true
    }, {
      name: 'bill-add',
      path: '/bill/add',
      component: BillEdit,
    }, {
      name: 'bill-edit',
      path: '/bill/edit/:id',
      component: BillEdit,
      props: true
    }]
  }, {
    name: 'provider',
    path: '/provider',
    component: Provider,
    meta: { title: '供应商管理' },
    children: [{
      name: 'provider-list',
      path: '/provider/list',
      component: ProviderList,
    }, {
      name: 'provider-view',
      path: '/provider/view/:id',
      component: ProviderView,
      props: true
    }, {
      name: 'provider-add',
      path: '/provider/add',
      component: ProviderEdit,
    }, {
      name: 'provider-edit',
      path: '/provider/edit/:id',
      component: ProviderEdit,
      props: true
    }]
  }, {
    name: 'user',
    path: '/user',
    component: User,
    meta: { title: '用户管理' },
    children: [{
      name: 'user-list',
      path: '/user/list',
      component: UserList,
    }, {
      name: 'user-view',
      path: '/user/view/:id',
      component: UserView,
      props: true
    }, {
      name: 'user-add',
      path: '/user/add',
      component: UserEdit,
    }, {
      name: 'user-edit',
      path: '/user/edit/:id',
      component: UserEdit,
      props: true
    }, {
      name: 'user-modifypwd',
      path: '/user/modifypwd',
      component: ModifyPwd,
    }]
  }]
}];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

router.beforeEach((to, from) => {
  let isLogin = sessionStorage.getItem('loginStatus') == 'success';
  if (to.name != 'login' && !isLogin) return { path: '/login' }

  if (to.name == 'login' && isLogin) {
    return axios.get('http://localhost:8080/logout').then(res => {
      if (res.data.status == 'success') {
        sessionStorage.clear();
        return { path: '/login' }
      } else return { path: from.path };
    });
  } 
})

router.afterEach((to, from) => {
	document.title = to.meta.title || '超市订单管理系统'
})

export default router

