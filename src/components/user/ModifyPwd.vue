<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>密码修改页面</span>
  </div>
  <div class="providerAdd">
    <input type="hidden" name="method" value="savepwd">
    <div class="info">{{message}}</div>
    <div class="">
      <label for="oldPassword">旧密码：</label>
      <input type="password" name="oldpassword" v-model="oldpassword" @focus="remind('* 请输入原密码', $event)" @blur="validate('oldpassword',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="newPassword">新密码：</label>
      <input type="password" name="newpassword" v-model="newpassword" @focus="remind('* 密码长度必须是大于6小于20', $event)" @blur="validate('newpassword',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="rnewpassword">确认新密码：</label>
      <input type="password" name="rnewpassword" v-model="rnewpassword" @focus="remind('* 请输入与上面一致的密码', $event)" @blur="validate('rnewpassword',  $event)">
      <span color="red">*</span>
    </div>
    <div class="providerAddBtn">
      <input type="button" name="add" value="保存" @click="save" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { showInfoTip } from '../../composables/utils';
export default {
  name: "ModifyPwd",
  data() {
    return {
      oldpassword: '',
      oldpasswordFit: false,
      newpassword: '',
      newpasswordFit: false,
      rnewpassword: '',
      rnewpasswordFit: false
    }
  },
  methods: {
    remind(info, $event) {
      showInfoTip($event, 'info', info);
    },
    
    validate(field, $event) {
      if (field == 'oldpassword') {
        if (this.oldpassword == '') {
          showInfoTip($event, 'error', '请输入旧密码');
          this.oldpasswordFit = false;
          return;
        }

        let user = this.session.user;
        if (!user) {
          showInfoTip($event, 'error', '程序错误，请重新登录');
          this.oldpasswordFit = false;
          return;
        }

        if (user.userPassword != this.oldpassword) {
          showInfoTip($event, 'error', '原密码输入不正确');
          this.oldpasswordFit = false;
        } else {
          this.oldpasswordFit = true;
          showInfoTip($event, 'success', '');
        }
      }

      if (field == 'newpassword') {
        let isFit = (this.newpassword.length > 6 && this.newpassword.length < 20);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '密码输入不符合规范，请重新输入');
        this.newpasswordFit = isFit;
      }

      if (field == 'rnewpassword') {
        let isFit = (this.rnewpassword.length > 6 && this.rnewpassword.length < 20 && this.rnewpassword == this.newpassword);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '两次密码输入不一致，请重新输入');
        this.rnewpasswordFit = isFit;
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

    save() {
      let fits = ['oldpasswordFit', 'newpasswordFit', 'rnewpasswordFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.put('http://localhost:8080/users', {
        id: this.session.user.id,
        userPassword: this.rnewpassword,
      }).then(res => {
        if (res.data) {
          $.notify("保存成功", { className: 'success', position: 'left top' });
          this.session.user.userPassword = this.rnewpassword;
        } else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },
  }
}
</script>