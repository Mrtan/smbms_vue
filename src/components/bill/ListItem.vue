<template>
  <tr>
    <td><span>{{bill.billCode}}</span></td>
    <td><span>{{bill.productName}}</span></td>
    <td><span>{{providerName}}</span></td>
    <td><span>{{bill.totalPrice}}</span></td>
    <td><span>{{bill.isPayment == 1 ? '未付款' : '已付款'}}</span></td>
    <td><span>{{bill.creationDate}}</span></td>
    <td>
      <span>
        <router-link :to="{name: 'bill-view', params: {id: bill.id}}">
          <img src="/assets/images/read.png" alt="查看" title="查看" />
        </router-link>
      </span>
      <span>
        <router-link :to="{name: 'bill-edit', params: {id: bill.id}}">
          <img src="/assets/images/xiugai.png" alt="修改" title="修改" />
        </router-link>
      </span>
      <span>
        <a href="javascript:;" @click="removeBill">
          <img src="/assets/images/schu.png" alt="删除" title="删除" />
        </a>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ListItem",
  props: ['bill', 'providers'],
  computed: {
    providerName() {
      let provider = this.providers.find(provider => {
        return provider.id == this.bill.providerId;
      });
      return provider ? provider.proName : '';
    }
  },
  methods: {
    removeBill() {
      this.$emit('removeBill', this.bill);
    }
  },
}
</script>