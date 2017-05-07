<style type="text/css">
.address-title {
  text-align: center;
  margin-top: 10px;
}
.address-wrap {
  margin-top: 1rem;
  width: 100%;
  height: 4rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.address-wrap > .mint-cell > .mint-cell-wrapper {
  height: 4rem;
}

.address-wrap .mint-cell-value {
  width: 100%;
  display: block;
}
.address-wrap .mint-cell-swipe-button {
  line-height: 4rem;
}
.address-wrap > .add {
  width: 2rem;
  height: 2rem;
  background-color: #fff;
  color: #26a2ff;
  font-weight: bolder;
  font-size: 20px;
  border: 3px solid #26a2ff;
  border-radius: 50%;
  box-sizing: border-box;
  vertical-align: middle;
  position: absolute;
  top: 1rem;
  right: 1rem;
  text-align: center;
}
.address-wrap > .addAddress {
  line-height: 4rem;
  height: 4rem;
  margin-left: 3rem;
  color: #ccc;
}
.setDefault {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  box-sizing: border-box;
  border: 3px solid #26a2ff;
  border-radius: 50%;
  color: #26a2ff;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
<template>
<div>
  <p class="address-title">左滑选择删除</p>
  <div class="address-wrap" v-show="userData.address.length" v-for="address in userData.address">
    <cell-swipe
    :right="[
      {
        content: 'Delete',
        style: { background: 'red', color: '#fff' },
        handler: () => deleteAddress(address._id)
      } 
    ]"
    @click.native="changeDefaultAddress(address._id)"
    >
      <p>地址：{{address.address}}</p>
      <p>手机：{{address.phone}}</p>
      <p>姓名：{{address.name}}</p>
      <div v-show="userData.defaultAddress === address._id" class="setDefault">✔️</div>
    </cell-swipe>
  </div>
  <router-link to="/editaddress">
    <div class="address-wrap">
      <span class="addAddress">点击添加地址</span>
      <div class="add">+</div>
    </div>
  </router-link>
</div>
</template>
<script type="text/javascript">
import { Button, CellSwipe } from 'mint-ui';
export default {
  components: {'my-button': Button, CellSwipe},
  props: ['userData'],
  data() {
    return {
      
    }
  },
  methods: {
    deleteAddress(ID) {
      this.$http.post(IP + ':2017/deltAddress', 
        {userID: this.userData._id, addressID: ID, defaultAddress: this.userData.defaultAddress}).then( ({data}) => {
          BUS.$emit('user', data);
        })
    },
    changeDefaultAddress(ID) {
      if (this.userData.defaultAddress === ID) return;

      this.$http.post(IP+':2017/changeDefaultAddress', {userID: this.userData._id, addressID: ID}).then( ({data}) => {
        BUS.$emit('user', data);
      })
    }
  }
}
</script>