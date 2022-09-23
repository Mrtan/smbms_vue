<template>
  <header class="publicHeader">
    <h1><router-link to="/">超市订单管理系统</router-link></h1>
    <div class="publicHeaderR">
      <p><span style="color: #fff21b">{{userName}}</span> , 欢迎你！</p>
      <router-link to="/login">退出</router-link>
    </div>
  </header>
  <section class="publicTime">
    <span id="time"></span>
    <a href="javascript:;">温馨提示：为了能正常浏览，请使用高版本浏览器！（IE10+）</a>
  </section>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      userName: ''
    }
  },
  created() {
    let user = this.session.user;
    if (user) this.userName = user.userName || '';
  }
}
</script>