<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>订单管理页面 >> 订单添加页面</span>
  </div>
  <div class="providerAdd">
    <div>
      <label for="billCode">订单编码：</label>
      <input type="text" name="billCode" v-model="billCode" :readonly="!isAdd" @focus="remind('* 请输入订单编码', $event)" @blur="validate('billCode',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="productName">商品名称：</label>
      <input type="text" name="productName" v-model="productName" @focus="remind('* 请输入商品名称', $event)" @blur="validate('productName',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="productUnit">商品单位：</label>
      <input type="text" name="productUnit" v-model="productUnit" @focus="remind('* 请输入商品单位', $event)" @blur="validate('productUnit',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="productCount">商品数量：</label>
      <input type="text" name="productCount" v-model="productCount" @focus="remind('* 请输入大于0的正自然数，小数点后保留2位', $event)" @blur="validate('productCount',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="totalPrice">总金额：</label>
      <input type="text" name="totalPrice" v-model="totalPrice" @focus="remind('* 请输入大于0的正自然数，小数点后保留2位', $event)" @blur="validate('totalPrice',  $event)">
      <span color="red">*</span>
    </div>
    <div>
      <label for="providerId">供应商：</label>
      <select name="providerId" v-model="providerId" @focus="remind('* 请选择供应商', $event)" @blur="validate('providerId',  $event)">
        <option value="0">--请选择--</option>
        <option v-for="provider in providers" :value="provider.id">{{provider.proName}}</option>
      </select>
      <span color="red">*</span>
    </div>
    <div>
      <label>是否付款：</label>
      <input type="radio" name="isPayment" value="1" v-model="isPayment" :checked="isPayment == 1">未付款
      <input type="radio" name="isPayment" value="2" v-model="isPayment" :checked="isPayment == 2">已付款
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
  name: "BillEdit",
  props: ['id'],
  data() {
    return {
      providers: [],
      billCode: '',
      billCodeFit: false,
      productName: '',
      productNameFit: false,
      productUnit: '',
      productUnitFit: false,
      productCount: '',
      productCountFit: false,
      totalPrice: '',
      totalPriceFit: false,
      providerId: 0,
      providerIdFit: false,
      isPayment: 1,
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
      if (field == 'billCode') {
        let isFit = (this.billCode != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '编码不能为空，请重新输入');
        this.billCodeFit = isFit;
      }

      if (field == 'productName') {
        let isFit = (this.productName != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '商品名称不能为空，请重新输入');
        this.productNameFit = isFit;
      }

      if (field == 'productUnit') {
        let isFit = (this.productUnit != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '单位不能为空，请重新输入');
        this.productUnitFit = isFit;
      }

      if (field == 'productCount') {
        let isFit = (this.productCount != '');
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '单位不能为空，请重新输入');
        this.productCountFit = isFit;
      }

      if (field == 'productCount') {
        let reg = /^[0-9]+(.[0-9]{2})?$/;
        let isFit = this.productCount.match(reg);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '您输入的商品数量格式不正确');
        this.productCountFit = isFit;
      }

      if (field == 'totalPrice') {
        let reg = /^[0-9]+(.[0-9]{2})?$/;
        let isFit = this.totalPrice.match(reg);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '您输入的金额格式不正确');
        this.totalPriceFit = isFit;
      }

      if (field == 'providerId') {
        let isFit = (this.providerId != 0);
        if (isFit) showInfoTip($event, 'success', '');
        else showInfoTip($event, 'error', '供应商不能为空，请选择');
        this.providerIdFit = isFit;
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

    addBill() {
      let fits = ['billCodeFit', 'productNameFit', 'productUnitFit', 'productCountFit', 'totalPriceFit', 'providerIdFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.post('http://localhost:8080/bills', {
        billCode: this.billCode,
        productName: this.productName,
        productUnit: this.productUnit,
        productCount: this.productCount,
        totalPrice: this.totalPrice,
        providerId: this.providerId,
        isPayment: this.isPayment,
      }).then(res => {
        if (res.data) $.notify("保存成功", { className: 'success', position: 'left top' });
        else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },

    editBill() {
      let fits = ['billCodeFit', 'productNameFit', 'productUnitFit', 'productCountFit', 'totalPriceFit', 'providerIdFit'];
      let isAllFit = this.getIsAllFit(fits);
      if (!isAllFit) return;

      axios.put('http://localhost:8080/bills', {
        id: this.id,
        billCode: this.billCode,
        productName: this.productName,
        productUnit: this.productUnit,
        productCount: this.productCount,
        totalPrice: this.totalPrice,
        providerId: this.providerId,
        isPayment: this.isPayment,
      }).then(res => {
        if (res.data) $.notify("保存成功", { className: 'success', position: 'left top' });
        else $.notify("保存失败", { className: 'error', position: 'left top' });
      });
    },

    save() {
      if (this.isAdd) this.addBill();
      else this.editBill();
    },

    back() {
      this.$router.back();
    }
  },
  created() {
    axios.get("http://localhost:8080/providers/all").then((res) => {
      if (res.status == 200) this.providers = res.data || [];
    });

    if (this.id) {
      axios.get('http://localhost:8080/bills/' + this.id).then(res => {
        if (res.status == 200) {
          let codes = ['billCode','productName','productUnit','productCount','totalPrice','providerId','isPayment'];
          codes.forEach(code => {
            let value = res.data[code];
            this[code] = value;
            if (code == 'birthday') this.$refs.birthday.value = value.substring(0, 10);
          });

          let fits = ['billCodeFit', 'productNameFit', 'productUnitFit', 'productCountFit', 'totalPriceFit', 'providerIdFit'];
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