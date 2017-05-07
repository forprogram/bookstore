<style type="text/css">
#book_detail{
  width: 100%;
  margin-bottom: 50px;
  padding: 10px;
  box-sizing: border-box;
}
#img_wrap{
  width: 100%;
  text-align:center;
  border-bottom: 4px solid #ddd;
}
#img_wrap>img{
  width: 110px;
}
.buy-bar-wrap {
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ddd;
  height: 2.5rem;
}
.buy-bar-wrap button {
  background: #F50829;
  color: #fff;
  outline: none;
  height: 2.5rem;
  width: 18%;
}
.buy-bar-wrap button:disabled {
  background: #ce4255 !important;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.buy-bar-wrap  button.leave-msg {
  width: 14%;
  background-color: #fff;
  color: #000;
}
.buy-bar-wrap input {
  background-color: #ddd;
  height: 2.5rem;
  width: 64%;
  text-indent: 14px;
}

/*comment*/
.comments {
  padding: 0 10px;
  text-align: left;
}
.comments h4 {
  border-bottom: 1px solid #ddd;
  height: 50px;
  line-height: 50px;
}
.comments-loading p {
  margin-bottom: 0;
  margin-top: 2rem;
  padding: .1rem 0;
  color: #ccc;
  font-size: 1.4rem;
}

.comments-loading span {
  display: inline-block;
  width: 0;
  height: 0;
  border: .4rem solid #F50827;
  border-radius: 100%;
  margin: 0 .5rem;
  animation: commentsLoading 1s infinite;
}
span#cl-first {
  animation-delay: 0s;
}
span#cl-first ~ span {
  animation-delay: .1s;
}
span#cl-first ~ span ~ span {
  animation-delay: .2s;
}

@keyframes commentsLoading {
  0% {
    transform: scale(0.5);
    background: #F50827;
  }
  50% {
    transform: scale(1);
    background: #fff;
  }
  100% {
    transform: scale(0.5);
    background: #F50827;
  }
}
.bookdetail-item {
  padding: 6px 0;
  border-bottom: 4px solid #ddd;
}
.bookdetail-item > h3 {
  padding-bottom: 6px;
}
.bookdetail-item > h3 > span {
  font-size: 12px;
  color: #ccc;
}
.catalog {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}
</style>
<template>
  <div id="book_detail">
    <div id="img_wrap">
      <img :src="book.images.large">
    </div>

    <div class="bookdetail-item">
      <h3>基本信息</h3>
      <p>书名: {{book.title}}</p>
      <p>作者: {{book.author}}</p>
      <p>出版社: {{book.publisher}}</p>
      <p>ISBN: {{book.isbn}}</p>
      <p>页数: {{book.pages}}</p>
      <p>成色: {{book.quality}}</p>
    </div>
    <div class="bookdetail-item" @click="fordetail2 = !fordetail2">
      <h3>图书简介<span>点击查看详细或缩略</span></h3>
      <p :class="{'catalog': fordetail2}">{{book.summary}}</p>
    </div>
    <div class="bookdetail-item">
      <h3>图书赠言</h3>
      <p>{{book.shareWord}}</p>
    </div>
    <div class="bookdetail-item" @click="fordetail1 = !fordetail1">
      <h3>目录<span>点击查看详细或缩略</span></h3>
      <p :class="{'catalog': fordetail1}" v-html="book.catalog"></p>
    </div>
    <div class="comments">
      <h4>留言</h4>
      <div v-if="!this.comments[0] && commentsLoading === false">
        目前无留言
      </div>
      <div>
        <comment-item  @click.native="showCommentBar(index)" :comment="comment" :user-data="userData" v-for="(comment, index) in comments" :key="comment._id"></comment-item>
      </div>
      <div class="comments-loading">
        <p v-show="commentsLoading"><span id="cl-first"></span><span></span><span></span></p>
    </div>
  </div>
    <div class="buy-bar-wrap">
      <div v-show="showBuyBar">
        <button class="fl leave-msg" @click="handleBuyBar">留言</button>
        <button class="fr" disabled v-if="book.type !== 0">已下架</button>
        <button class="fr" v-else @click="buyit">购买</button>
        <button class="fr" v-if="(!!~userData.collectBook.indexOf(book._id)) || hasCollect"  disabled>已收藏</button>
        <button class="fr"  v-else @click="addToCollection">收藏</button>
      </div>
      <div v-show="!showBuyBar">
        <button class="fl" @click="showBuyBar = !showBuyBar">返回购买</button>
        <input type="text" v-model="comment" :placeholder="holderContent">
        <button class="fr" @click="postComment">发送</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {Toast, MessageBox} from 'mint-ui';
import commentItem from '../components/Comment-item.vue';
export default{
  data(){
    return{
      book:{
        images:{}
      },
      hasCollect: false,
      showBuyBar: true,
      holderContent: '输入留言内容',
      comment: '',
      isOverflow: false,
      comments: [
      ],
      commentsLoading: true,
      receiver: null,
      fordetail1: true,
      fordetail2: true
    }
  },
  components: {commentItem},
  props: ['userData'],
  watch: {
    'comments'(val, oldVal) {
      if (val !== oldVal) {
        this.comments.sort((prev, next) => {
          return new Date(next.createAt) - new Date(prev.createAt);
        })
      }
    },
  },
  methods:{
    handleBuyBar() {
      this.showBuyBar = !this.showBuyBar;
      this.holderContent = '输入留言内容';
      this.receiver = null;
    },
    buyit() {
      if (!this.userData._id) {
        Toast({
          message: '还未登录，正在跳转到登录页面',
          duration: 1500
        });
        setTimeout( () => {
          location.href= IP + ":8090/#/signin";
        }, 1500);
        return;
      };

      if (this.book.user._id === this.userData._id) {
        Toast({
          message: '您不能购买自己发布的书籍',
          duration: 1500
        });
        return;
      } else {
        location.href= IP + ":8090/#/order/" + this.book._id;
      }
    },
    addToCollection() {
      if (!this.userData._id) {
        Toast({
          message: '还未登录，正在跳转到登录页面',
          duration: 1500
        });
        setTimeout( () => {
          location.href= IP + ":8090/#/signin";
        }, 1500);

        return;
      }

      this.$http.post(IP + ':2017/addBookCollect', {bookID: this.book._id, userID: this.userData._id}).then(({data}) => {
          Toast({
            message: '收藏成功',
            duration: 1000
          });
          this.hasCollect = true;
          BUS.$emit('user', data);
      });
    },
    getComnent() {
      this.commentsLoading = true;
      this.$http.post(IP + ':2017/showBookComnent', {bookID: this.book._id}).then(({data}) => {
        this.comments = data;
        this.commentsLoading = false;
      });
    },
    postComment() {
      if (!this.userData._id) {
        Toast({
          message: '还未登录，正在跳转到登录页面',
          duration: 1500
        });
        setTimeout( () => {
          location.href= IP + ":8090/#/signin";
        }, 1500);

        return;
      }
      let reg = /((<script).*(\/script>))|((on)\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+)))/g,
      commentContent = this.comment.trim();

      this.sending = true;

      if (!commentContent) {
        this.errorHint('评论内容不能为空。');
      } else if (commentContent.length > 140) {
        this.errorHint('评论内容应少于140字。');
      } else if (reg.test(commentContent)) {
        this.errorHint('你输入的内容存在非法字符，请检查修改评论后重新提交。');
      } else {
        let data = {
          'giver': this.userData._id,
          'book': this.book._id,
          'content': commentContent,
          'createAt': new Date(),
        };
        if (this.receiver) {
          data.receiver = this.receiver;
        }
        this.$http.post(
          IP + ':2017/upComment',
          data
        ).then(({data}) => {
          console.log(data);
          this.comments.unshift(data);
          this.comment = '';
          this.receiver = null;
          this.holderContent = '输入留言内容';
        }).catch(err => {
          this.errHint('提交失败，请重新提交。');
        });
      }
    },
    showCommentBar(index) {
      if (this.comments[index].giver._id === this.userData._id) {
        Toast({
          message: '不能回复自己',
          duration: 800
        });
        return;
      }
      this.showBuyBar = false;
      this.receiver = this.comments[index].giver._id;
      this.holderContent = `回复${this.comments[index].giver.name}`;

    },
    errorHint(errText) {
      console.error(errText);
      return false;
    },
    contentLength() {
      this.isOverflow = this.comment.length > 140 ? true : false;
    }

  },
  created() {

    this.$http.post(IP + ':2017/bookdetail', this.$route.params).then( ({data}) => {
      this.book = data;
      BUS.$emit('show_book_title',this.book.title+this.book.subtitle);
    }).then(()=> {
      this.getComnent();
    }); 
  },
}
</script>
