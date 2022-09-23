<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>订单管理页面 >> 信息查看</span>
  </div>
  <div class="providerView">
    <p><strong>订单编号：</strong><span>{{bill.billCode}}</span></p>
    <p><strong>商品名称：</strong><span>{{bill.productName}}</span></p>
    <p><strong>商品单位：</strong><span>{{bill.productUnit}}</span></p>
    <p><strong>商品数量：</strong><span>{{bill.productCount}}</span></p>
    <p><strong>总金额：</strong><span>{{bill.totalPrice}}</span></p>
    <p><strong>供应商：</strong><span>{{bill.proName}}</span></p>
    <p><strong>是否付款：</strong>{{bill.isPayment == 1 ? '未付款' : '已付款'}}</p>
    <div class="providerAddBtn">
      <input type="button" name="back" value="返回" @click="back">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'BillView',
  props: ['id'],
  data() {
    return {
      bill: {}
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  created() {
    axios.get('http://localhost:8080/bills/' + this.id).then(res => {
      if (res.status == 200) this.bill = res.data;
    });
  },
}
</script>