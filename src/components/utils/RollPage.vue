<template>
  <div class="page-bar">
    <ul class="page-num-ul clearfix">
      <li style="margin-right: 10px">共{{page.totalCount}}条记录&nbsp;&nbsp; {{page.currentPage}}/{{page.totalPage}}页</li>
      <span v-if="page.currentPage > 1">
        <a href="javascript:;" @click="firstPage">首页</a>
        <a href="javascript:;" @click="prevPage">上一页</a>
      </span>
      <span v-if="page.currentPage < page.totalPage">
        <a href="javascript:;" @click="nextPage">下一页</a>
        <a href="javascript:;" @click="lastPage">最后一页</a>
      </span>
    </ul>
    <span class="page-go-form"><label>跳转至</label>
      <input type="text" name="inputPage" class="page-key" v-model="targetPage" />页
      <button type="button" class="page-btn" @click="jumpTo">GO</button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'RollPage',
  props: ['page'],
  data() {
    return {
      targetPage: ''
    };
  },
  methods: {
    firstPage() {
      this.$emit('jumpToPage', 1);
    },
    prevPage() {
      this.$emit('jumpToPage', this.page.currentPage - 1);
    },
    nextPage() {
      this.$emit('jumpToPage', this.page.currentPage + 1);
    },
    lastPage() {
      this.$emit('jumpToPage', this.page.totalPage);
    },
    jumpTo() {
      let regexp=/^[1-9]\d*$/;
      if(!regexp.test(this.targetPage)) alert("请输入大于0的正整数！");
      else if((this.targetPage - this.page.totalPage) > 0) alert("请输入小于总页数的页码");
      else this.$emit('jumpToPage', this.targetPage);
    }
  }
}
</script>

<style scoped>
  .page-num-ul a {
    margin-right: 10px;
    border: 1px solid white;
  }
  .page-btn {
    cursor: pointer;
  }
</style>