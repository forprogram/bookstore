<style type="text/css">
.book-item {
  border-collapse: collapse; 
  padding: 0;

}
.book-item th {
	min-width: 60px;
}
</style>
<template>
  <div>
    <table cellpadding="20" class="book-item">
      <tr>
        <th>缩略图</th>
        <th>书名</th>
        <th>作者</th>
        <th>出版社</th>
        <th>状态</th>
        <th>价格</th>
        <th></th>
        <th></th>
      </tr>
      <book-item :book="book" v-for="book in books" :key="book._id"></book-item>
    </table>
  </div>
</template>
<script type="text/javascript">
import bookItem from '../components/book-item.vue';
export default {
  data () {
    return {
      books:[]
    }
  },
  components: { bookItem },
  props: ['userData'],
  created() {
    BUS.$on('removeBook', () => {
      this.getBookList();
    });
    this.getBookList();
  },
  methods: {
    getBookList() {
      this.$http.get(IP + ':2017/bookList', {credentials: true}).then(({data}) => {
        this.books = data;
      });
    }
  }
}
</script>