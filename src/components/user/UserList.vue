<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>用户管理页面</span>
  </div>

  <div class="search">
    <span>用户名：</span>
    <input name="queryname" class="input-text" type="text" v-model="queryUserName">

    <span>用户角色：</span>
    <select name="queryUserRole" v-model="queryUserRole">
      <option value="0">--请选择--</option>
      <option v-for="role in roles" :value="role.id">{{role.roleName}}</option>
    </select>

    <input value="查 询" type="submit" id="searchbutton" @click="queryUser">
    <router-link to="/user/add" >添加用户</router-link>
  </div>

  <table class="providerTable" cellpadding="0" cellspacing="0">
    <tr class="firstTr">
      <th width="10%">用户编码</th>
      <th width="20%">用户名称</th>
      <th width="10%">性别</th>
      <th width="10%">年龄</th>
      <th width="10%">电话</th>
      <th width="10%">用户角色</th>
      <th width="30%">操作</th>
    </tr>
    <ListItem v-for="user in users" :key="user.id" :roles=roles :user=user @removeUser="removeUser" />
  </table>

  <RollPage :page=page @jumpToPage="jumpToPage" />
</template>

<script>
import axios from 'axios'
import RollPage from '../utils/RollPage.vue';
import ListItem from './ListItem.vue';

const PAGE_SIZE = 5;

export default {
  name: "UserList",
  components: { RollPage, ListItem },
  data() {
    return {
      queryUserName: '',
      queryUserRole: 0,
      roles: [],
      users: [],
      page: {
        totalCount: 0,
        pageSize: PAGE_SIZE,
        totalPage: 0,
        currentPage: 1,
      }
    };
  },
  methods: {
    getAllRoles() {
      axios.get("http://localhost:8080/roles").then((res) => {
        if (res.status == 200) this.roles = res.data || [];
      });
    },
    getUsersByConditions(currentPage, pageSize, userName, userRole) {
      let url = `http://localhost:8080/users?currentPage=${currentPage}&pageSize=${pageSize}&userName=${userName}&userRole=${userRole}`;
      axios.get(url).then((res) => {
        if (res.status == 200) {
          this.users = res.data.records || [];
          this.page.totalCount = res.data.total;
          this.page.totalPage = res.data.pages;
          this.page.currentPage = res.data.current;
        }
      });
    },
    queryUser() {
      this.getUsersByConditions(1, this.page.pageSize, this.queryUserName, this.queryUserRole);
    },
    jumpToPage(targetPage) {
      this.getUsersByConditions(targetPage, this.page.pageSize, this.queryUserName, this.queryUserRole);
    },
    removeUser(user) {
      this.$swal({
        title: '确认删除?',
        text: "数据将会被删除!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '确认!',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('http://localhost:8080/users/' + user.id).then(res => {
            if (res.data) {
              let index = this.users.indexOf(user);
              if (index != -1) this.users.splice(index, 1);
              $.notify("删除成功", { className: 'success', position: 'left top' });
            } else $.notify("删除失败", { className: 'error', position: 'left top' });
          });
        }
      });
    }
  },
  created() {
    this.getAllRoles();
    this.queryUser();
  }
}
</script>