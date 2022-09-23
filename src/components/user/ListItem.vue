<template>
  <tr>
    <td><span>{{user.userCode}}</span></td>
    <td><span>{{user.userName}}</span></td>
    <td><span>{{user.gender == 1 ? '男' : '女'}}</span></td>
    <td><span>{{age}}</span></td>
    <td><span>{{user.phone}}</span></td>
    <td><span>{{userRoleName}}</span></td>
    <td>
      <span>
        <router-link :to="{name: 'user-view', params: {id: user.id}}">
          <img src="/assets/images/read.png" alt="查看" title="查看" />
        </router-link>
      </span>
      <span>
        <router-link :to="{name: 'user-edit', params: {id: user.id}}">
          <img src="/assets/images/xiugai.png" alt="修改" title="修改" />
        </router-link>
      </span>
      <span>
        <a href="javascript:;" @click="removeUser">
          <img src="/assets/images/schu.png" alt="删除" title="删除" />
        </a>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
    name: "ListItem",
    props: ['user', 'roles'],
    computed: {
      userRoleName() {
        let role = this.roles.find(role => {
          return role.id == this.user.userRole;
        });
        return role ? role.roleName : '';
      },
      age() {
        let birthday = this.user.birthday;
        if (!birthday || birthday == '') return;

        let curYear = new Date().getFullYear();
        let birYear = new Date(birthday).getFullYear();
        return curYear - birYear;
      }
    },
    methods: {
      removeUser() {
        this.$emit('removeUser', this.user);
      }
    }
}
</script>