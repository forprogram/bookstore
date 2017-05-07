<template>
  <div class="editAddress">
    <field label="地址" placeholder="请输入详细" v-model="addressData.address"></field>
    <field label="联系电话" placeholder="中国大陆号码" v-model="addressData.phone"></field>
    <field label="收件人" placeholder="姓名" v-model="addressData.name"></field>
    <my-button type="primary" size="large" @click="addAddress">确定</my-button>
  </div>
</template>
<script type="text/javascript">
import { Button, Field, Toast } from 'mint-ui';
export default {
  components: {'my-button': Button, Field},
  props: ['userData'],
  data() {
  	return {
  		addressData: {
  			address: '',
  			phone: '',
  			name: ''
  		}
  	}
  },
  methods: {
  	addAddress() {
  		let canfetch = true;
  		for(let key in this.addressData) {
        if (this.addressData[key].trim() === '') {
          canfetch = false;
          Toast({
            message: '请将信息填写完整，不明填写无',
            duration: 1500
          }); 
        }
      };
      if (canfetch) {
      	this.$http.post(IP + ':2017/addAddress', {userID: this.userData._id, addressData: this.addressData}).then( ({data}) => {
      		BUS.$emit('user', data);
      		window.history.go(-1);
      	})
      }
  	}
  }
}
</script>