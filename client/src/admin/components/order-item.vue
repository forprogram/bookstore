<template>
	<tr v-if="order.book">
		<td>{{order._id}}</td>
		<td>{{order.book.title}}</td>
		<td>{{order.user.name}}</td>
		<td>{{order.seller.name}}</td>
		<td>{{order.book.sharePrice}}</td>
		<td>{{order.book.deliveryPrice}}</td>
		<td>{{order.book.deliveryPrice + order.book.sharePrice}}</td>
		<td>{{payType[order.payType] || '无'}}</td>
		<td>{{order.logistics || '无'}}</td>
		<td>{{orderStatus[order.status]}}</td>

	</tr>
</template>
<script type="text/javascript">
import { Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			showIndex: false,
			payType: ['支付宝', '微信'],
			orderStatus: ['未付款', '等待发货', '等待确认收货', '交易完成', '订单已被取消', '正在申请退款', '退款成功'],
		}
	},
	components: {  },
	props: ['order'],
	methods: {
		deleteorder() {
      MessageBox.confirm('确定下架这本书?').then( () => {
        this.$http.post( IP+ ':2017/deleteorder', {orderID: this.order._id}).then( ({data}) => {
         	if (data === 0) {
         		this.order.type = -1;
         		Toast({
		          message: '下架成功',
		          duration: 1000
		        });         	
          }
        })        
      }).catch((val) => {
      	console.log(val);
      });
		}
	}
}
</script>