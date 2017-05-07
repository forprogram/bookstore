<style type="text/css">
.formargin {
  padding-bottom: 40px;
}
.search-wrap {
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  position: fixed;
  z-index: 1;
  background-color: #fff;
}
.search-wrap > input{
  background-color: #e4e4e4;
  height: 30px;
  width: 80%;
  border-radius: 20px;
  text-indent: 16px;
}
.search-wrap > button {
  margin-left: 20px;
}
</style>
<template>
<div class="formargin">
  <div class="search-wrap">
    <input type="text" v-model="value" name="search" placeholder="输入搜索的内容">
    <button @click="emitSearch">搜索</button>
  </div>
</div>
</template>

<script>

export default {
  name: 'page-search',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    emitSearch() {
      if (this.$route.name === 'classShare') {
        BUS.$emit('searchClass', this.value)
      } else {
        BUS.$emit('searchBook', this.value)
      }
    },
  }
};
</script>

<style lang="css">
  .page-search {
    height: 100%;
  }
</style>