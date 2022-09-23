<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>订单管理页面</span>
  </div>
  <div class="search">
    <span>商品名称：</span>
    <input name="productName" type="text" v-model="queryProductName">

    <span>供应商：</span>
    <select name="providerId" v-model="queryProviderId">
      <option value="0">--请选择--</option>
      <option v-for="provider in providers" :value="provider.id">{{provider.proName}}</option>
    </select>

    <span>是否付款：</span>
    <select name="isPayment" v-model="queryIsPayment">
      <option value="0">--请选择--</option>
      <option value="1">未付款</option>
      <option value="2">已付款</option>
    </select>

    <input value="查 询" type="submit" id="searchbutton" @click="queryBill">
    <router-link to="/bill/add" >添加订单</router-link>
  </div>

  <table class="providerTable" cellpadding="0" cellspacing="0">
    <tr class="firstTr">
      <th width="10%">订单编码</th>
      <th width="20%">商品名称</th>
      <th width="10%">供应商</th>
      <th width="10%">订单金额</th>
      <th width="10%">是否付款</th>
      <th width="10%">创建时间</th>
      <th width="30%">操作</th>
    </tr>
    <ListItem v-for="bill in bills" :key="bill.id" :bill=bill :providers=providers @removeBill="removeBill" />
  </table>

  <RollPage :page=page @jumpToPage="jumpToPage" />
</template>

<script>
import axios from 'axios'
import RollPage from '../utils/RollPage.vue';
import ListItem from './ListItem.vue';

const PAGE_SIZE = 5;

export default {
  name: "BillList",
  components: { RollPage, ListItem },
  data() {
    return {
      queryProductName: '',
      queryProviderId: 0,
      queryIsPayment: 0,
      providers: [],
      bills: [],
      page: {
        totalCount: 0,
        pageSize: PAGE_SIZE,
        totalPage: 0,
        currentPage: 1,
      }
    };
  },
  methods: {
    getAllProviders() {
      axios.get("http://localhost:8080/providers/all").then((res) => {
        if (res.status == 200) this.providers = res.data || [];
      });
    },
    getBillsByConditions(currentPage, pageSize, productName, providerId, isPayment) {
      let url = `http://localhost:8080/bills?currentPage=${currentPage}&pageSize=${pageSize}&productName=${productName}&providerId=${providerId}&isPayment=${isPayment}`;
      axios.get(url).then((res) => {
        if (res.status == 200) {
          this.bills = res.data.records || [];
          this.page.totalCount = res.data.total;
          this.page.totalPage = res.data.pages;
          this.page.currentPage = res.data.current;
        }
      });
    },
    queryBill() {
      this.getBillsByConditions(1, this.page.pageSize, this.queryProductName, this.queryProviderId, this.queryIsPayment);
    },
    jumpToPage(targetPage) {
      this.getBillsByConditions(targetPage, this.page.pageSize, this.queryProductName, this.queryProviderId, this.queryIsPayment);
    },
    removeBill(bill) {
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
          axios.delete('http://localhost:8080/bills/' + bill.id).then(res => {
            if (res.data) {
              let index = this.bills.indexOf(bill);
              if (index != -1) this.bills.splice(index, 1);
              $.notify("删除成功", { className: 'success', position: 'left top' });
            } else $.notify("删除失败", { className: 'error', position: 'left top' });
          });
        }
      });
    }
  },
  created() {
    this.getAllProviders();
    this.queryBill();
  }
}
</script>