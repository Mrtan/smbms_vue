<template>
  <tr>
    <td><span>{{provider.proCode}}</span></td>
    <td><span>{{provider.proName}}</span></td>
    <td><span>{{provider.proContact}}</span></td>
    <td><span>{{provider.proPhone}}</span></td>
    <td><span>{{provider.proFax}}</span></td>
    <td><span>{{provider.creationDate}}</span></td>
    <td>
      <span>
        <router-link :to="{name: 'provider-view', params: {id: provider.id}}">
          <img src="/assets/images/read.png" alt="查看" title="查看" />
        </router-link>
      </span>
      <span>
        <router-link :to="{name: 'provider-edit', params: {id: provider.id}}">
          <img src="/assets/images/xiugai.png" alt="修改" title="修改" />
        </router-link>
      </span>
      <span>
        <a href="javascript:;" @click="removeProvider(provider.id, $event)">
          <img src="/assets/images/schu.png" alt="删除" title="删除" />
        </a>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
    name: "ListItem",
    props: ['provider'],
    methods: {
      removeProvider() {
        this.$emit('removeProvider', this.provider);
      }
    }
}
</script>