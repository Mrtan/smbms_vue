<template>
  <div class="login_bg">
    <section class="loginBox">
      <header class="loginHeader">
        <h1>超市订单管理系统</h1>
      </header>
      <section class="loginCont">
        <div class="loginForm">
          <div class="inputbox">
            <label for="userCode">用户名：</label>
            <input type="text" class="input-text" v-model="userCode" name="userCode" placeholder="请输入用户名" required />
          </div>
          <div class="inputbox">
            <label for="userPassword">密码：</label>
            <input type="password" v-model="userPassword" name="userPassword" placeholder="请输入密码" required />
            <div class="info">{{error}}</div>
          </div>
          <div class="subBtn">
            <input type="submit" value="登录" @click="login"/>
            <input type="reset" value="重置" @click="reset"/>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { inject } from 'vue';
export default {
  name: 'Login',
  setup() {
    const emitter = inject("emitter");
    const notify = (user) => {
      emitter.emit("getUser", user);
    };
    return { notify }
  },
  data() {
    return {
      userCode: '',
      userPassword: '',
      error: ''
    }
  },
  methods: {
    login() {
      let url = `http://localhost:8080/login?userCode=${this.userCode}&userPassword=${this.userPassword}`;
      axios.post(url).then(res => {
        if (res.data.status == "success") {
          sessionStorage.setItem('loginStatus', "success");
          this.session.user = res.data.user;
          this.$router.push('/');
        } else this.error = '用户名或密码错误';
      });
    },
    reset() {
      this.userCode = '';
      this.userPassword = '';
    }
  },
}
</script>