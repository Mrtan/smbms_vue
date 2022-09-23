<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>用户管理页面 >> 用户信息查看页面</span>
  </div>
  <div class="providerView">
    <p><strong>用户编号：</strong><span>{{user.userCode}}</span></p>
    <p><strong>用户名称：</strong><span>{{user.userName}}</span></p>
    <p><strong>用户性别：</strong><span>{{user.gender == 1 ? '男' : '女'}}</span></p>
    <p><strong>出生日期：</strong><span>{{birthday}}</span></p>
    <p><strong>用户电话：</strong><span>{{user.phone}}</span></p>
    <p><strong>用户地址：</strong><span>{{user.address}}</span></p>
    <p><strong>用户角色：</strong><span>{{user.roleName}}</span></p>
    <div class="providerAddBtn">
      <input type="button" name="back" value="返回" @click="back">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UserView',
  props: ['id'],
  data() {
    return {
      user: {}
    }
  },
  computed: {
    birthday() {
      let birthday = this.user.birthday || '';
      return birthday.substring(0, 10);
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  created() {
    axios.get('http://localhost:8080/users/' + this.id).then(res => {
      if (res.status == 200) this.user = res.data;
    });
  },
}
</script>