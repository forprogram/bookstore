<style type="text/css">
</style>
<template>
<div>
  <div>
    <bookItem v-for="(book,index) in books" :book="book" :key="index"></bookItem>
  </div>
</div>
</template>
<script type="text/javascript">
import bookItem from '../components/book-item.vue';
export default {
  data() {
    return {
      books: []
    }
  },
  components: {bookItem},
  created() {
    this.getBook();
    BUS.$on('updateClass', () => {
      this.getBook();
    });
  },
  methods: {
    getBook() {
      if (this.$route.name === 'myShareBook') {
        this.$http.get(IP+':2017/showMyBook', {credentials: true}).then(({data}) => {
          this.books = data;
        });
      } else {
        this.$http.get(IP+':2017/myCollectBook', {credentials: true}).then(({data}) => {
          console.log(data);
          this.books = data;
        });
      }
      
    }
  }
}
</script>