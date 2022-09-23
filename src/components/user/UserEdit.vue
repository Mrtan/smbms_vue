<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>用户管理页面 >> 用户添加页面</span>
  </div>
  <div class="providerAdd">
    <div v-if="isAdd">
      <label for="userCode">用户编码：</label>
      <input type="text" name="userCode" v-model="userCode" @focus="remind('* 用户编码是您登录系统的账号', $event)" @blur="validate('userCode',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="userName">用户名称：</label>
      <input type="text" name="userName" v-model="userName" @focus="remind('* 用户名长度必须是大于1小于10的字符', $event)" @blur="validate('userName', $event)">
      <span color="red">*</span>
    </div>
    <div v-if="isAdd">
      <label for="userPassword">用户密码：</label>
      <input type="password" name="userPassword" v-model="userPassword" @focus="remind('* 密码长度必须是大于6小于20', $event)" @blur="validate('userPassword', $event)">
      <span color="red">*</span>
    </div>
    <div v-if="isAdd">
      <label for="ruserPassword">确认密码：</label>
      <input type="password" name="ruserPassword" v-model="ruserPassword" @focus="remind('* 请输入与上面一致的密码', $event)" @blur="validate('ruserPassword', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label>用户性别：</label>
      <select name="gender" v-model="gender">
        <option value="1">男</option>
        <option value="2">女</option>
      </select>
    </div>
    <div>
      <label for="birthday">出生日期：</label>
      <input type="text" Class="Wdate" name="birthday" ref="birthday" readonly="readonly" onclick="WdatePicker();" @focus="remind('* 点击输入框，选择日期', $event)" @blur="validate('birthday', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="phone">用户电话：</label>
      <input type="text" name="phone" v-model="phone" @focus="remind('* 请输入手机号', $event)" @blur="validate('phone', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="address">用户地址：</label>
      <input name="address" v-model="address">
    </div>
    <div>
      <label>用户角色：</label>
      <select name="userRole" v-model="userRole" @focus="remind('* 请选择用户角色', $event)" @blur="validate('userRole', $event)">
        <option value="0">--请选择--</option>
        <option v-for="role in roles" :value="role.id">{{role.roleName}}</option>
      </select>
      <span color="red">*</span>
    </div>
    <div class="providerAddBtn">
      <input type="button" name="add" value="保存" @click="save">
      <input type="button" name="back" value="返回" @click="back">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { showInfoTip } from '../../composables/utils';

const PAGE_SIZE = 5;

export default {
  name: "UserEdit",
  props: ['id'],
  data() {
    return {
      roles: [],
      userCode: '',
      userCodeFit: false,
      userName: '',
      userNameFit: false,
      userPassword: '',
      userPasswordFit: false,
      ruserPassword: '',
      ruserPasswordFit: false,
      birthday: '',
      birthdayFit: false,
      phone: '',
      phoneFit: false,
      userRole: 0,
      userRoleFit: false,
      gender: 1,
      address: '',
    }
  },
  computed: {
    isAdd() {
      return !this.id;
    }
  },
  methods: {
    remind(info, $event) {
      showInfoTip($event, 'info', info);
    },
    
    validate(field, $event) {
      if (field == 'userCode') {
        if (this.userCode == '') {
          showInfoTip($event, 'error', '用户编号不能为空');
          this.userCodeFit = false;
          return;
        }

        let url = `http://localhost:8080/users?currentPage=1&pageSize=${PAGE_SIZE}&userCode=${this.userCode}`;
        axios.get(url).then((res) => {
          if (res.status != 200) {
            showInfoTip($event, 'error', '服务器错误');
            this.userCodeFit = false;
            return;
          }
          if (res.data.total > 0) {
            showInfoTip($event, 'error', '该用户账号已存在');
            this.userCodeFit = false;
            return;
          }
          showInfoTip($event, 'success', '该账号可以使用');
          this.userCodeFit = true;
        });
      }

      if (field == 'userName') {
        let isFit = (this.userName.length > 1 && this.userName.length < 10);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '用户名输入的不符合规范，请重新输入');
        this.userNameFit = isFit;
      }

      if (field == 'userPassword') {
        let isFit = (this.userPassword.length > 6 && this.userPassword.length < 20);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '密码输入不符合规范，请重新输入');
        this.userPasswordFit = isFit;
      }

      if (field == 'ruserPassword') {
        let isFit = (this.ruserPassword.length > 6 && this.ruserPassword.length < 20 && this.ruserPassword == this.userPassword);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '两次密码输入不一致，请重新输入');
        this.ruserPasswordFit = isFit;
      }

      if (field == 'birthday') {
        this.birthday = this.$refs.birthday.value;

        let isFit = (this.birthday && this.birthday != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '选择的日期不正确，请重新输入');
        this.birthdayFit = isFit;
      }

      if (field == 'phone') {
        let patrn=/^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
        let isFit = this.phone.match(patrn);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '您输入的手机号格式不正确');
        this.phoneFit = isFit;
      }

      if (field == 'userRole') {
        let isFit = (this.userRole != 0);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '请重新选择用户角色');
        this.userRoleFit = isFit;
      }
    },

    getIsAllFit(fits) {
      let isAllFit = true;
      fits.forEach((fit) => {
        if (!this[fit]) isAllFit = false;
      });
      if (!isAllFit) alert('请检查表单数据');
      return isAllFit;
    },

    addUser() {
      let fits = ['userCodeFit', 'userNameFit', 'userPasswordFit', 'ruserPasswordFit', 'birthdayFit', 'phoneFit', 'userRoleFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.post('http://localhost:8080/users', {
        userCode: this.userCode,
        userName: this.userName,
        password: this.ruserPassword,
        birthday: this.birthday,
        phone: this.phone,
        userRole: this.userRole,
        gender: this.gender,
        address: this.address
      }).then(res => {
        if (res.data) $.notify("保存成功", { className: 'success', position: 'left top' });
        else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },

    editUser() {
      let fits = ['userNameFit', 'birthdayFit', 'phoneFit', 'userRoleFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.put('http://localhost:8080/users', {
        id: this.id,
        userName: this.userName,
        birthday: this.birthday,
        phone: this.phone,
        userRole: this.userRole,
        gender: this.gender,
        address: this.address
      }).then(res => {
        if (res.data) $.notify("保存成功", { className: 'success', position: 'left top' });
        else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },

    save() {
      if (this.isAdd) this.addUser();
      else this.editUser();
    },

    back() {
      this.$router.back();
    }
  },
  created() {
    axios.get("http://localhost:8080/roles").then((res) => {
      if (res.status == 200) this.roles = res.data || [];
    });
    
    if (this.id) {
      axios.get('http://localhost:8080/users/' + this.id).then(res => {
        if (res.status == 200) {
          let codes = ['userName', 'gender', 'birthday', 'phone', 'address', 'userRole'];
          codes.forEach(code => {
            let value = res.data[code];
            this[code] = value;
            if (code == 'birthday') this.$refs.birthday.value = value.substring(0, 10);
          });

          let fits = ['userNameFit', 'birthdayFit', 'phoneFit', 'userRoleFit'];
          fits.forEach(fit => {
            this[fit] = true;
          });
        } 
      });
    }
  }
}
</script>

<style scoped>
  .providerAdd span {
    margin-left: 5px;
  }
  .providerAddBtn input {
    margin: 0 5px;
    padding: 0;
  }
</style>