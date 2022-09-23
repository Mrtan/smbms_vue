<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>供应商管理页面</span>
  </div>

  <div class="search">
    <span>供应商编码：</span>
    <input name="proCode" type="text" v-model="proCode">

    <span>供应商名称：</span>
    <input name="proName" type="text" v-model="proName">

    <input value="查 询" type="submit" id="searchbutton" @click="queryProvider">
    <router-link to="/provider/add" >添加供应商</router-link>
  </div>

  <table class="providerTable" cellpadding="0" cellspacing="0">
    <tr class="firstTr">
      <th width="10%">供应商编码</th>
      <th width="20%">供应商名称</th>
      <th width="10%">联系人</th>
      <th width="10%">联系电话</th>
      <th width="10%">传真</th>
      <th width="10%">创建时间</th>
      <th width="30%">操作</th>
    </tr>
    <ListItem v-for="provider in providers" :key="provider.id" :provider=provider @removeProvider="removeProvider" />
  </table>

  <RollPage :page=page @jumpToPage="jumpToPage" />
</template>

<script>
import axios from 'axios'
import RollPage from '../utils/RollPage.vue';
import ListItem from './ListItem.vue';

const PAGE_SIZE = 5;

export default {
  name: "ProviderList",
  components: { RollPage, ListItem },
  data() {
    return {
      proCode: '',
      proName: '',
      providers: [],
      page: {
        totalCount: 0,
        pageSize: PAGE_SIZE,
        totalPage: 0,
        currentPage: 1,
      }
    };
  },
  methods: {
    getProvidersByConditions(currentPage, pageSize, proCode, proName) {
      let url = `http://localhost:8080/providers?currentPage=${currentPage}&pageSize=${pageSize}&proCode=${proCode}&proName=${proName}`;
      axios.get(url).then((res) => {
        if (res.status == 200) {
          this.providers = res.data.records || [];
          this.page.totalCount = res.data.total;
          this.page.totalPage = res.data.pages;
          this.page.currentPage = res.data.current;
        }
      });
    },
    queryProvider() {
      this.getProvidersByConditions(1, this.page.pageSize, this.proCode, this.proName);
    },
    jumpToPage(targetPage) {
      this.getProvidersByConditions(targetPage, this.page.pageSize, this.proCode, this.proName);
    },
    removeProvider(provider) {
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
          axios.delete('http://localhost:8080/providers/' + provider.id).then(res => {
            if (res.data) {
              let index = this.providers.indexOf(provider);
              if (index != -1) this.providers.splice(index, 1);
              $.notify("删除成功", { className: 'success', position: 'left top' });
            } else $.notify("删除失败", { className: 'error', position: 'left top' });
          });
        }
      });
    }
  },
  created() {
    this.queryProvider();
  }
}
</script>