<style type="text/css">
</style>
<template>
<div>
  <div>
    <order-item v-for="order in orders" :order="order" :key="order._id"></order-item>
  </div>
</div>
</template>
<script type="text/javascript">
import orderItem from '../components/order-item.vue';
export default {
  data() {
    return {
      orders: []
    }
  },
  props: ['userData'],
  created() {
  	this.getOrder();
  },
  components: {orderItem},
  methods: {
    getOrder() {
    	if (this.$route.name === 'myOrder') {
    		this.$http.get(IP + ':2017/showMyOrder', {credentials:true}).then(({data}) => {
	        this.orders = data;
	      });
    	} else {
    		this.$http.get(IP + ':2017/mySellBook', {credentials: true}).then(({data}) => {
    			this.orders = data;
    		});
    	}
      
    }
  }
}
</script>