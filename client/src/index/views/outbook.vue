<style type="text/css">
.IsbnSearch {
  width: 100%;
  height: 36px;
  border: 1px solid #26a2ff;
  box-sizing: border-box;
  margin: 20px 0;
  text-indent: 10px;
}
.book-info-front {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}
.book-info-front>img {
  margin: 10px 2%;
  transform: scale(0.7);
}
.book-info-front>div {
  transform: scale(0.9);
}
.mint-cell-title {
  width: 80px !important;
}
.publish-book {
  margin: 20px 0;
}
</style>
<template>
  <div class="page-navbar">
    <navbar class="page-part" v-model="selected">
      <tab-item id="1">自动填充</tab-item>
      <tab-item id="2">手动输入</tab-item>
    </navbar>
    <tab-container v-model="selected">
      <tab-container-item id="1">
        <input class="IsbnSearch" type="text" name="name" placeholder="输入书ISBN号" v-model="isbn">
        <my-button @click="filling" type="primary" size="large">查找</my-button>
      </tab-container-item>
      <tab-container-item id="2">
        <div class="book-info-front">
          <img :src="bookInfo.image">
          <div>
            <mt-field placeholder="书名" v-model="bookInfo.title"></mt-field>
            <mt-field v-show="bookInfo.subtitle" placeholder="副标题" v-model="bookInfo.subtitle"></mt-field>
            <mt-field placeholder="作者" v-model="bookInfo.author"></mt-field>
            <mt-field placeholder="出版社" v-model="bookInfo.publisher"></mt-field>
          </div>
        </div>
        <div class="book-info-other">
          <mt-field label="ISBN号" placeholder="ISBN号" v-model="bookInfo.isbn13"></mt-field>
          <mt-field label="新旧程度" placeholder="新旧程度" v-model="bookInfo.quality"></mt-field>
          <mt-field label="页数" placeholder="页数" v-model="bookInfo.pages"></mt-field>
          <mt-field label="图书原价" placeholder="图书原价" v-model="bookInfo.price"></mt-field>
          <mt-field label="分享价格" placeholder="分享价格，不带单位" v-model="bookInfo.sharePrice"></mt-field>
          <mt-field label="运费" placeholder="填真实运费，免邮则0，不带单位" v-model="bookInfo.deliveryPrice"></mt-field>
          <mt-field label="图书简介"  type="textarea" rows="4" v-model="bookInfo.summary"></mt-field>
          <mt-field label="目录" type="textarea" rows="4" v-model="bookInfo.catalog"></mt-field>
          <mt-field label="书籍赠言" type="textarea" rows="4" v-model="bookInfo.shareWord"></mt-field>
        </div>
        <my-button class="publish-book" @click="publishBook" type="primary" size="large">发布</my-button>
      </tab-container-item>
    </tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem, TabContainer, Cell, TabContainerItem, Button, Toast, Indicator} from 'mint-ui';
export default {
  data() {
    return {
      selected: '1',
      isbn: '',
      bookInfo: {
      },
      updateData: {

      }
    };
  },
  components: {Navbar, TabItem, TabContainer, Cell, TabContainerItem, 'my-button': Button},
  props: ['userData'],
  methods: {
    filling() {
      Indicator.open();
      if (this.isbn.trim()!=='') {
        this.$http.jsonp('https://api.douban.com/v2/book/isbn/' + this.isbn)
          .then(({data}) => {
            Indicator.close();
            this.bookInfo = data;
            this.isbn = '';
            this.selected = '2';
          })
          .catch((val) => {
            Indicator.close();
            Toast({
              message: '未找到该isbn号对应的书籍，请检查输入',
              duration: 1000
            });
          });

      }else {
        Toast({
          message: '请输入isbn号',
          duration: 1000
        });
      }
    },
    publishBook() {
      ({
        title: this.updateData.title,
        subtitle: this.updateData.subtitle,
        author: this.updateData.author,
        image: this.updateData.image,
        images: this.updateData.images,
        price: this.updateData.price,
        pages: this.updateData.pages,
        sharePrice: this.updateData.sharePrice,
        publisher: this.updateData.publisher,
        isbn13: this.updateData.isbn,
        quality: this.updateData.quality,
        catalog: this.updateData.catalog,
        summary: this.updateData.summary,
        shareWord: this.updateData.shareWord,
        deliveryPrice: this.updateData.deliveryPrice
      } = this.bookInfo);
      if(!this.userData._id) {
        Toast({
          message: '还未登录，正在跳转到登录页面',
          duration: 1500
        });
        setTimeout( () => {
          location.href= IP + ":8090/#/signin";
        }, 1500);
        return;
      };
      this.updateData.user = this.userData._id;
      let canfetch = true;
      for(let key in this.updateData) {
        if (this.updateData[key] === undefined) {
          canfetch = false;
          Toast({
            message: '请将信息填写完整，不明填写无',
            duration: 2000
          }); 
        }
      };
      if (canfetch) {
        this.$http.post(IP+':2017/publish', this.updateData).then( ({body}) => {
          if (body==='success') {
            Toast({
              message: '发布成功，正在返回首页',
              duration: 2000
            }); 
            setTimeout( () => {
              location.href= IP + ":8090/#/index";
            }, 2000);
          }
        });
      }
    }
    
  }
};
</script>