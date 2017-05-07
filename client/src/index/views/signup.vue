<template>
  <div id="signup" @blur.capture="test_all($event)">
    <input type="text" name="name" placeholder="用户名" v-model="user_info.name">
    <p v-if="test.name">{{warn_name}}</p>
    <input type="password" name="password" placeholder="输入包含数字、字母的8位以上密码" v-model="user_info.password">
    <p v-if="test.password">{{warn_password}}</p>
    <input type="password" name="repeat_password" placeholder="重复输入密码" v-model="repeat_password">
    <p v-if="test.repeat_password">{{warn_repeat_password}}</p>
    <input type="text" name="phone" placeholder="手机" v-model="user_info.phone">
    <p v-if="test.phone">{{warn_phone}}</p>
    <div>
      <button id="get_code">获取验证码</button>
      <input type="text" name="code" placeholder="验证码" v-model="code">
    </div>
    <p v-if="test.code">{{warn_code}}</p>
    <button id="up_signup" @click="signup">注册</button>
  </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
export default {
  name:'signup',
  data(){
    return{
      user_info:{
        name:'',
        password:'',
        phone:'',
      },
      test:{},
      repeat_password:'',
      code:'',
      warn_name:'必填字段。',
      warn_password:'必填字段。',
      warn_repeat_password:'必填字段。',
      warn_phone:'必填字段。',
      warn_code:'暂时别理我。'
    }
  },
  components: {Toast},
  methods:{
    test_all:function(e){
      //使用capture，在整个表单的div使用事件委托，
      let i = e.target.name;

      //此处用eval()也能解决，但是es6的对象属性表达式则更帅气，
      //[]内可使用表达式求得属性名。
      let a = null;
      if (i==='repeat_password' || i==='code') {
        a = this[i];
      }else{
        a = this.user_info[i];
      }
      if (!a || a.trim()==='') {
        // console.log(i,a);
        this.$set(this.test,i,true);
      }else{
        switch (i){
          case 'password':
            if (! /^\w{8,20}$/.test(a) ) {
              this.warn_password = "输入包含数字、字母的8位以上密码";
              this.$set(this.test,i,true);

            }else{
              this.warn_password = "必填字段。";
              this.$set(this.test,i,false);
            }
            if (this.repeat_password !== this.user_info.password) {
              this.warn_repeat_password = "密码不一致";
              this.$set(this.test,'repeat_password',true);
            }
            break;
          case 'repeat_password':
            if (this.repeat_password!==this.user_info.password) {
              this.warn_repeat_password = "密码不一致";
              this.$set(this.test,i,true);
            }
            else{
              this.warn_repeat_password = "必填字段。";
              this.$set(this.test,i,false);
            }
            break;
          case 'phone':
            if (!/^1[34578]\d{9}$/.test(a)) {
              this.warn_phone = "手机号码格式错误";
              this.$set(this.test,i,true);
            }
            else{
              this.warn_phone = "必填字段。";
              this.$set(this.test,i,false);
            }
            break;
          case 'code':
            // if (!/^1[34578]\d{9}$/.test(a)) {
            //  this.warn_phone = "手机号码格式错误";
            //  this.$set(this.test,i,true);
            // }
            //else{
              //this.warn_code = "";
              this.$set(this.test,i,false);
            //}
            break;
        };
      } 
    },
    signup:function(){
      for(let key in this.test){
        if (key!=''&&this.test[key]===true) {
          alert('请按照提示修改信息');
          return;
        }
      }
      for(let key in this.user_info) {
        if (this.user_info[key]==='') {
          alert('您有地方未填');
          return;
        }
      }
      this.$http.post(IP + ':2017/signup',{user_info:this.user_info,code:this.code}, {credentials:true}).then( res => {
          return res.json();
        }).then( (json)=>{
          if (json !== 1) {

            Toast({
              message: '注册并登陆成功',
              iconClass: 'icon icon-success',
              duration: 1000
            });
            BUS.$emit('user', json);
            setTimeout(() => {
              location.href= IP+ ":8090/#/index";
            }, 1000);
          }
        });
    }
  },
  watch:{
  },
  created(){
    //console.log(this.$watch);
  }
}
</script>
<style type="text/css">
#signup{
  padding: 0 18px;
  width: 100%;
  box-sizing: border-box;
}
#signup>input{
  width: 100%;
  height: 36px;
  border: 1px solid #727272;
  box-sizing: border-box;
  margin-top: 14px;
  text-indent: 10px;

}
#signup>p{
  display: block;
  width: 100%;
  height: 28px;
  background-color: #e27777;
  color: #fff;
  line-height: 28px;
  font-size: 12px;
  text-indent: 10px;
}
#signup>a{
  text-decoration:underline;
  color: #999999;
  font-size: 14px;
}
#signup>div{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#signup>div>#get_code{
  margin-top: 10px;
  width: 40%;
  height: 36px;
  background-color: #26a2ff;
  color: #fff;
}
#signup>div>input{
  width: 50%;
  height: 36px;
  border: 1px solid #727272;
  box-sizing: border-box;
  text-align: center;

}
#signup>#up_signup{
  margin-top: 10px;
  width: 100%;
  height: 42px;
  background-color: #26a2ff;
  color: #fff;
}
</style>