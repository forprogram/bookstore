<style type="text/css">
.classItem-wrap {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.top-button {
  position: absolute;
  right: 10px;
  bottom: 60px;
  z-index: 500;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 16px;
}
.bottom-button {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 16px;

}
.classItem > h3 {
  font-size: 26px;
  margin-bottom: 4px;
  font-weight: normal;
}
.classItem > p {
  margin-bottom: 2px;
  color: #545050;
}

</style>
<template>
<div v-if="($route.name === 'mycollectclass' 
      && !!~userData.collectClass.indexOf(classItem._id)) || $route.name !== 'mycollectclass'" class="classItem-wrap" @click="test">
  <div class="classItem">    
    <h3>{{classItem.name}}</h3>
    <p>类型：{{classItem.type}}</p>
    <p>学校：{{classItem.school}} <span>教室：{{classItem.classroom}}</span></p>
    <p>日期：{{classItem.date}}</p>
    <p>时间：{{classItem.upTime}}--{{classItem.downTime}}</p>
  </div>
  <my-button 
    v-if="($route.name==='classShare' 
      && !!~userData.collectClass.indexOf(classItem._id))
    ||hasCollect" 
    disabled 
    class="bottom-button" 
    type="primary" 
    size="normal">已收藏</my-button>
  <my-button v-else v-show="$route.name==='classShare'" @click.stop="addToCollection" class="bottom-button" type="primary" size="normal">+加入收藏</my-button>
  <my-button v-if="$route.name==='myCollectClass'" @click.stop="removeToCollection" class="top-button" type="primary" size="normal">取消收藏</my-button>
  <my-button  v-if="$route.name==='myShareClass' && classItem.status == 0" @click.stop="showDeleButton" class="bottom-button" type="primary" size="normal">下架</my-button>
  <my-button v-if="classItem.status == 1" disabled class="bottom-button" type="primary" size="normal">已下架</my-button>
</div>
</template>
<script type="text/javascript">
import { Button, Toast, MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      hasCollect: false,
    }
  },
  components: {'my-button': Button, MessageBox},
  props: ['classItem', 'userData'],
  methods: {
    test() {
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

      this.$http.post(IP + ':2017/addClassCollect', {classID: this.classItem._id, userID: this.userData._id}).then(({data}) => {
          Toast({
            message: '收藏成功',
            duration: 1000
          });
          this.hasCollect = true;
          BUS.$emit('user', data);
      });
    },
    removeToCollection() {
      MessageBox.confirm('确定取消收藏该课程?').then( () => {
        this.$http.post(IP + ':2017/removeCollectedClass', {classID: this.classItem._id}, {credentials: true}).then(({data})=> {
          console.log(data);
          BUS.$emit('user', data);
        });
      }).catch(() => {
        return ;
      } );
    },
    showDeleButton() {
      MessageBox.confirm('确定删除该课程?').then( () => {
        this.deleClass();
      }).catch(() => {
        return ;
      } );
    },
    deleClass() {
      this.$http.post(IP + ':2017/deleteClass', {classID: this.classItem._id}).then(({data}) => {
        if (data === 0) {
          Toast({
            message: '删除成功',
            duration: 1000
          });
          BUS.$emit('updateClass');
        }
      });
    }
  },
}
</script>