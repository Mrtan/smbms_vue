<template>
  <img class="wColck" src="/assets/images/clock.jpg" />
  <div class="wFont">
    <h2>{{userName}}</h2>
    <p>欢迎来到超市订单管理系统!</p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
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