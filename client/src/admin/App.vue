<style>
#app{
  margin: 0 50px;
}
#m_header{
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  height: 50px;
  justify-content:space-between;
}
#m_title{
  display: inline-block;
  margin:0; 
}
#m_content{
  margin-top: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
#right_content{
  width: 86%;
  padding: 30px;
  border:1px solid #000;
  border-radius: 10px;
  box-sizing: border-box;

}
</style>
<template>
  <div>
    <div id="m_header">
      <h1 id="m_title">宇宙最大的课程分享教材互借平台的后台管理系统</h1>
      <div id="userbar" v-show="$route.name !== 'signin'">
          <a href="javascript:void(0);">{{userData.name}}</a>
          <a href="javascript:void(0);" @click="signout" >登出</a>
      </div>  
    </div>
    <div id="m_content">
      <my-nav v-show="$route.name !== 'signin'"></my-nav>
      <div id="right_content">
        <router-view :user-data = "userData"></router-view>
      </div>
    </div>
  </div>
</template>

<script >
import myNav from './components/nav.vue';
import { Toast, MessageBox } from 'mint-ui';
export default {
  name: 'app',
  data () {
    return {
      userData: {}
    }
  },
  components:{
    'my-nav':myNav
  },
  created() {
    BUS.$on('user', (data) => {
      this.userData = data;
    });
    if (this.$route.name !== 'signin') {
      this.getUserData();
    }
  },
  methods:{
    getUserData() {
      this.$http.get( IP+ ':2017/admin', {credentials:true}).then( ({data}) => {
        if (data === 0) {
          this.$router.replace({name: 'signin'});
        } else if (data === 2) {
          Toast({
            message: '您的权限不足，请与管理员联系',
            duration: 1500
          });
          setTimeout( () => {
            this.$router.replace({name: 'signin'});
          }, 1500);
          return;
        } else {
          this.userData = data;
        }
      }).catch(err => console.log(err));
    },
    signout() {
      MessageBox.confirm('确定退出登录?').then( () => {
        this.$http.get( IP+ ':2017/signout').then( ({data}) => {
          console.log(data);
          if (data === 0) {
            Toast({
              message: '登出成功',
              duration: 1000
            });
            this.$router.replace({name: 'signin'});
          }
        })        
      }).catch((val) => {
        console.log(val);
      });

    }
  },
}
</script>


