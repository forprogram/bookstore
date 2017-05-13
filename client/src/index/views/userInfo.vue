<style type="text/css">
.avatar {
  width: 80px;
}
.info-item-wrap {
  border-bottom: 10px solid #eee;
}
.popup-val {
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;
}
.change-gender-wrap {
  text-align: center;
  width: 85%;
}

</style>
<template>
<div>
  <div class="info-item-wrap">
    <cell title="头像" icon="more">
      <img class="avatar" :src="userData.avatar">
    </cell>
    <cell @click.native="changeInfo('name')" title="昵称" is-link :value="userData.name"></cell>
    <cell @click.native="popupVisible = true" title="性别" is-link :value="gender[userData.gender]"></cell>
  </div>
  <div class="info-item-wrap">
    <cell @click.native="changeInfo('school')" title="学校" is-link :value="userData.school"></cell>
    <cell @click.native="changeInfo('institute')" title="学院" is-link :value="userData.institute"></cell>
    <cell @click.native="changeInfo('subject')" title="专业" is-link :value="userData.subject"></cell>
    <cell @click.native="changeInfo('grade')" title="年级" is-link :value="userData.grade"></cell>
  </div>
  <div class="info-item-wrap">
    <cell to="/address" title="配送地址" is-link></cell>
  </div>
  <div class="info-item-wrap">
    <cell title="登出" @click.native="signout"></cell>
  </div>
  <popup
  v-model="popupVisible" class="change-gender-wrap">
    <div >
      <radio
        title="请选择性别"
        v-model="value"
        :options="['男', '女']"
        pop-transition="popup-fade">
      </radio>
      <div class="mint-msgbox-btns">
        <button class="mint-msgbox-btn mint-msgbox-cancel" @click="popupVisible = false">取消</button>
        <button class="mint-msgbox-btn mint-msgbox-confirm" @click="changeGender">确定</button>
      </div>
    </div>
  </popup>
</div>
</template>
<script type="text/javascript">
import { Cell, Button, MessageBox, Toast, Popup, Radio } from 'mint-ui';
export default {
  data() {
    return {
      gender: ['男', '女', '未选择'],
      popupVisible: false,
      value: '',
    }
  },
  props: ['userData'],
  components: {
    Cell, 
    'my-button': Button, 
    Popup,
    Radio
  },
  methods: {
    changeGender() {
      let gender = 2;
      this.popupVisible = false;
      if (this.value === '') {
        Toast({
          message: '请检查您的输入是否合法',
          duration: 1000
        });
        return;
      } else if (this.value === '男') {
        gender = 0;
      } else {
        gender = 1;
      };

      this.$http.post(IP + ':2017/changeInfo', {userID: this.userData._id, type: 'gender', value: gender}).then(({data})=> {
        BUS.$emit('user', data);
      }).catch((val) => {
        console.log(val);
      });

    },
    changeInfo(type) {
      MessageBox.prompt(`请输入${type}`, '').then(({ value, action }) => {
        if (typeof value === 'object' || value === '') {
          Toast({
            message: '请检查您的输入是否合法',
            duration: 1000
          });
          return;
        }
        this.$http.post(IP + ':2017/changeInfo', {userID: this.userData._id, type: type, value: value}).then(({data})=> {
          BUS.$emit('user', data);
          })
        }).catch((val) => {
          console.log(val);
        });
    },
    signout() {
      MessageBox.confirm('确定登出吗？').then(action => {
        this.$http.get(IP + ':2017/signout').then(({data}) => {
          if (data === 0) {
            Toast({
              message: '登出成功',
              duration: 1000
            });
            this.$router.push({name: 'signin'});
          }
        }).catch((val)=> {
          console.log(val);
        });
      })
    }
  }
}
</script>