<style>
.comment-item {
  font-size: 1.4rem;
  border-bottom: 1px solid #ddd;

}
.comment-date {
  color: #ccc;
  font-size: 14px;
  line-height: 20px;
  height: 32px;
}

.comment-content {
  text-align: left;
}
.comment-giver 
,.comment-receiver{
  color: #CC0923;
}
.comment-meta {
  color: #C0BCB9;
  font-size: 1.2rem;
}
.comment-like {
  display: inline-block;
  position: relative;
  width: 50px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  float: right;
}
.comment-like span {
  display: inline-block;
  vertical-align: -.2rem;
  margin-right: .7rem;
  width: 1.2rem;
  height: 1.2rem;
  background-image: url('../../../assets/images/like.png');
  background-size: 200%;
}
.comment-like strong {
  font-size: 18px;
}
.comment-like.clicked span {
  background-position: -1.2rem 0;
}
.comment-reply {
  background: #F7F7F7;
  padding: .8rem 1.2rem;
  margin: 1rem 0;
  font-size: 1.2rem;
}
.comment-reply:before {
  display: inline-block;
  content: "";
  background: #CC0923;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  vertical-align: .1rem;
}
</style>
<template>
<div class="comment-item">
  <p class="comment-content">
    <span class="comment-giver">{{comment.giver.name}}</span>
    <span  v-if="comment.receiver">回复</span>
    <span class="comment-receiver" v-if="comment.receiver">{{comment.receiver.name}}</span>
    ：{{comment.content}}
  </p>
  <time class="comment-date">{{dateFormat}}</time>
  <div class="comment-like" 
    v-bind:class="{ 'clicked': isLike }" 
    @click.stop="actionFavorite">
      <span></span><strong>{{comment.likeCount}}</strong>
  </div>
</div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      isLike: false,
    }
  },
  props: ['comment', 'userData'],
  created() {
    this.isLike = !!~this.comment.likeID.indexOf(this.userData._id);
  },
  methods: {
    actionFavorite() {
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
      this.isLike = !this.isLike;
      this.isLike ? this.comment.likeCount++ : this.comment.likeCount--;
      this.$http.post(
        IP + ':2017/changeLike', 
        { 
          commentID: this.comment._id,
          isLike: this.isLike, 
          likeCount: this.comment.likeCount,
          likeID: this.userData._id
        }
        ).catch(err => {
        this.isLike = !this.isLike;
        this.isLike ? this.comment.likeCount++ : this.comment.likeCount--;
        console.log(err);
        alert('你的网络好像出了点问题!');
      });
    }
  },
  computed: {
    dateFormat() {
      let commentTime = new Date(this.comment.createAt);
      let timeDayMinutes = commentTime.getMinutes() < 10 ?
                             '0' + commentTime.getMinutes() :
                             commentTime.getMinutes();
      let timeDayHours = commentTime.getHours() < 10 ?
                             '0' + commentTime.getHours() :
                             commentTime.getHours();
      let commentTimeDate = (commentTime.getMonth() + 1) + '月' + commentTime.getDate() + '日 ';
      let commentTimeDay = timeDayHours + ':' + timeDayMinutes;

      let now = new Date();
      let dateDiff = now.getDate() - commentTime.getDate();

      let minutesDiff = now.getFullYear() == commentTime.getFullYear() ? 
      (now - commentTime) / 60000 : 
      999999;

      let timeSection = [1, 60, 1440, 2880, 4320, 525600];
      let timeTextArr = ['minutesBefore', 'hourBefore', 'yesterdayBefore', 'dayBeforeYesterday', 'date', 'fullDate'];
      let formatText = {
        'minutesBefore': Math.floor(minutesDiff) + '分钟前',
        'hourBefore': Math.floor(minutesDiff / 60) + '小时前',
        'yesterdayBefore': '昨天 ' + commentTimeDay,
        'dayBeforeYesterday': '前天 ' + commentTimeDay,
        'date': commentTimeDate + commentTimeDay,
        'fullDate': commentTime.getFullYear() + '年 ' + commentTimeDate + commentTimeDay
      };
      let dateFormat = '刚刚';

      if (dateDiff === 1 || dateDiff === 2) {
        return formatText[timeTextArr[dateDiff + 1]];
      }

      timeSection.forEach((item, index) => {

        if (item < minutesDiff) {
          dateFormat = formatText[timeTextArr[index]];
        }
      });

      return dateFormat;
    }
  }
}
</script>
