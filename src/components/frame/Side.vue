<template>
  <h2 class="leftH2"><span class="span1"></span> 功能列表 <span></span></h2>
  <nav>
    <ul class="list">
      <li><router-link to="/bill/list">订单管理</router-link></li>
      <li><router-link to="/provider/list">供应商管理</router-link></li>
      <li><router-link to="/user/list">用户管理</router-link></li>
      <li><router-link to="/user/modifypwd">密码修改</router-link></li>
      <li><router-link to="/login">退出系统</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Side',
}
</script>