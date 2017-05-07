<style type="text/css">
.books_de{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}
.books{
  width: 100%;
  height: 9rem;
  margin-bottom: 0.4rem;
  background-color: #fff;
  position: relative;
  padding: 0.2rem 0 0.6rem 1rem;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}

.book_owner {
  display: flex;
  height: 1.6rem;
  width: 100%;
}
.book_owner > img {
  height: 1.6rem;
  border-radius: 50%;
}
.book_owner > span {
  padding-left: 30px;
}
.img_wrap{
  width: 3rem;
  height: 6rem;
  display: flex;
  align-items: center;
  margin-top: 0.6rem;
}
.mainImg{
  height: 6rem;
  
}
.book_detail{
  height: 4.4rem;
  width: 70%;
  position: absolute;
  top: 1.2rem;
  right: 0;
  padding-top: 1.4rem;
}
.book_title{
  color: #444;
  font-size: 0.6rem;
}
.author{
  color: #999;
  font-size: 0.55rem;
  padding-top: 0.2rem;
}
.publisher{
  font-size: 0.55rem;
  color: #000;
}
.priceCon{
  padding-top: 0.4rem;
  font-size: 0.7rem;
  color: #000;
}
.buy_price,{
  color: #a1a1a1;
}
</style>
<template>
<div class="books">
  <router-link :to="{name: 'bookdetail', params: {bookID: book._id}}">
    <div class="book_owner" v-if="typeof(book.user) === 'object'">
      <img :src="book.user? book.user.avatar : ''">
      <span>卖家:{{book.user? book.user.name : ''}}</span>
    </div>
    <div class="books_de">
      <div class="img_wrap">
        <img :src="book.images.small" class="mainImg">
      </div>
      <div class="book_detail">
        <p class="book_title">{{book.title+' '+book.subtitle}}</p>
        <p class="author">{{book.author?book.author:'未录入作者'}}</p>
        <p class="publisher">{{book.publisher?book.publisher:'未录入出版社'}}</p>
        <div class="priceCon">
          <i class="buy_price">{{book.sharePrice}}元</i>
          <span>{{book.quality}}</span>
        </div>
      </div>
    </div>
    <my-button v-if="$route.name === 'myCollectBook'" @click.stop.prevent="removeToCollection" class="bottom-button" type="primary" size="normal">取消收藏</my-button>
    <my-button v-if="$route.name === 'myShareBook' && book.type === -1" class="bottom-button" type="primary" disabled size="normal">已下架</my-button>
    <my-button v-if="$route.name === 'myShareBook' && book.type === 1" class="bottom-button" type="primary" disabled size="normal">已卖出</my-button>
    <my-button  v-if="$route.name === 'myShareBook' && book.type === 0"  @click.stop.prevent="showDeleButton" class="bottom-button" type="primary" size="normal">下架</my-button>
  </router-link>
</div>
</template>
<script type="text/javascript">
import { Button, Toast, MessageBox} from 'mint-ui';
export default {
  props: ['book'],
  components: {'my-button': Button, MessageBox},
  methods: {
    showDeleButton() {
      MessageBox.confirm('确定下架该本书?').then( () => {
        this.delebook();
      }).catch(() => {
        return ;
      } );
    },
    delebook() {
      this.$http.post( IP+ ':2017/deletebook', {bookID: this.book._id}).then( ({data}) => {
          if (data === 0) {
            this.book.type = -1;
            Toast({
              message: '下架成功',
              duration: 1000
            });           
          }
        })
    },
    removeToCollection() {
      MessageBox.confirm('确定取消收藏该书?').then( () => {
        this.$http.post(IP + ':2017/removeCollectedBook', {bookID: this.book._id},{credentials: true}).then(({data})=> {
          BUS.$emit('user', data);
        });
      }).catch(() => {
        return ;
      } );
    }
  }
}
</script>