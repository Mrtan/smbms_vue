<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>用户管理页面 >> 用户添加页面</span>
  </div>
  <div class="providerAdd">
    <div>
      <label for="proCode">供应商编码：</label>
      <input type="text" name="proCode" v-model="proCode" @focus="remind('* 请输入供应商编码', $event)"
        @blur="validate('proCode', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="proName">供应商名称：</label>
      <input type="text" name="proName" v-model="proName" @focus="remind('* 请输入供应商名称', $event)"
        @blur="validate('proName', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="proContact">联系人：</label>
      <input type="text" name="proContact" v-model="proContact" @focus="remind('* 请输入联系人', $event)"
        @blur="validate('proContact', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="proPhone">联系电话：</label>
      <input type="text" name="proPhone" v-model="proPhone" @focus="remind('* 请输入手机号', $event)"
        @blur="validate('proPhone', $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="proAddress">联系地址：</label>
      <input type="text" name="proAddress" v-model="proAddress">
    </div>
    <div>
      <label for="proFax">传真：</label>
      <input type="text" name="proFax" v-model="proFax">
    </div>
    <div>
      <label for="proDesc">描述：</label>
      <input type="text" name="proDesc" v-model="proDesc">
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

export default {
  name: "ProviderEdit",
  props: ['id'],
  data() {
    return {
      proCode: '',
      proCodeFit: false,
      proName: '',
      proNameFit: false,
      proContact: '',
      proContactFit: false,
      proPhone: '',
      proPhoneFit: false,
      proAddress: '',
      proFax: '',
      proDesc: '',
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
      if (field == 'proCode') {
        let isFit = (this.proCode != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '编码不能为空，请重新输入');
        this.proCodeFit = isFit;
      }

      if (field == 'proName') {
        let isFit = (this.proName != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '供应商名称不能为空，请重新输入');
        this.proNameFit = isFit;
      }

      if (field == 'proContact') {
        let isFit = (this.proContact != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '联系人不能为空，请重新输入');
        this.proContactFit = isFit;
      }

      if (field == 'proPhone') {
        let patrn = /^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
        let isFit = this.proPhone.match(patrn);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '您输入的手机号格式不正确');
        this.proPhoneFit = isFit;
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

    addProvider() {
      let fits = ['proCodeFit', 'proNameFit', 'proContactFit', 'proPhoneFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.post('http://localhost:8080/providers', {
        proCode: this.proCode,
        proName: this.proName,
        proContact: this.proContact,
        proPhone: this.proPhone,
        proAddress: this.proAddress,
        proFax: this.proFax,
        proDesc: this.proDesc,
      }).then(res => {
        if (res.data) $.notify("保存成功", { className: 'success', position: 'left top' });
        else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },

    editProvider() {
      let fits = ['proCodeFit', 'proNameFit', 'proContactFit', 'proPhoneFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.put('http://localhost:8080/providers', {
        id: this.id,
        proCode: this.proCode,
        proName: this.proName,
        proContact: this.proContact,
        proPhone: this.proPhone,
        proAddress: this.proAddress,
        proFax: this.proFax,
        proDesc: this.proDesc,
      }).then(res => {
        if (res.data) $.notify("保存成功", { className: 'success', position: 'left top' });
        else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },

    save() {
      if (this.isAdd) this.addProvider();
      else this.editProvider();
    },

    back() {
      this.$router.back();
    }
  },
  created() {
    if (this.id) {
      axios.get('http://localhost:8080/providers/' + this.id).then(res => {
        if (res.status == 200) {
          let codes = ['proCode', 'proName', 'proContact', 'proPhone', 'proAddress', 'proFax', 'proDesc'];
          codes.forEach(code => {
            this[code] = res.data[code];
          });

          let fits = ['proCodeFit', 'proNameFit', 'proContactFit', 'proPhoneFit'];
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