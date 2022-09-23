<template>
  <div class="location">
    <strong>你现在所在的位置是:</strong>
    <span>供应商管理页面 >> 信息查看</span>
  </div>
  <div class="providerView">
    <p><strong>供应商编码：</strong><span>{{provider.proCode}}</span></p>
    <p><strong>供应商名称：</strong><span>{{provider.proName}}</span></p>
    <p><strong>联系人：</strong><span>{{provider.proContact}}</span></p>
    <p><strong>联系电话：</strong><span>{{provider.proPhone}}</span></p>
    <p><strong>传真：</strong><span>{{provider.proFax}}</span></p>
    <p><strong>描述：</strong><span>{{provider.proDesc}}</span></p>
    <div class="providerAddBtn">
      <input type="button" name="back" value="返回" @click="back">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProviderView',
  props: ['id'],
  data() {
    return {
      provider: {}
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  created() {
    axios.get('http://localhost:8080/providers/' + this.id).then(res => {
      if (res.status == 200) this.provider = res.data;
    });
  },
}
</script>