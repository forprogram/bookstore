<style>
.book-share{
  margin-bottom: 60px;
}

.mint-swipe {
  height: 170px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  margin-bottom: 6px;
}
.mint-swipe-item > img{
  width: 100%;  
}
</style>
<template>
<div class="book-share">
  <search></search>
  <mt-swipe :auto="4000">
    <mt-swipe-item>
      <img src="assets/images/ad_img1.jpg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="assets/images/ad_img2.jpg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="assets/images/ad_img3.jpg">
    </mt-swipe-item>
  </mt-swipe>
  <div>
      <book-item :book="book" v-for="(book,index) in books" :key="index"></book-item>
  </div>
</div>
</template>
<script type="text/javascript">
import { Swipe, SwipeItem } from 'mint-ui';
import bookItem from '../components/book-item.vue';
import search from '../components/search.vue';

export default {
  components:{
    Swipe, SwipeItem, bookItem, search
  },
  data(){
    return{
        books:{}
    }
  },
  created() {
    BUS.$on('searchBook', (value) => {
      this.search(value);
    });
    this.getBooks();
  },
  methods:{
    getBooks() {
      this.$http.get(IP + ':2017/showBook').then(({data})=>{
        this.books = data;
      }); 
    },
    search(value) {
      this.$http.post(IP + ":2017/selectedBookList", {value: value}).then(({data}) => {
        this.books = data;
      });    
    }
  }
}
</script>
