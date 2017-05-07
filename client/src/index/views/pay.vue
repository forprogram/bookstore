<style type="text/css">
.comfirmPay {
	position: fixed;
	bottom: 40px;

}
</style>
<template>
	<div>
		<book-item v-if="order.book" :book="order.book"></book-item>
		<mt-cell title="运费">
			<span style="color:red;" v-if="order.book">{{order.book.deliveryPrice === 0 ? '免邮' : '￥' + order.book.deliveryPrice + '元'}}</span>
		</mt-cell>
		<radio
		  align="right"
		  title="付款方式"
		  v-model="value"
		  :options="['支付宝付款', '微信付款']">
		</radio>
		<my-button class="comfirmPay" @click="tryPay" type="primary" size="large" v-if="order.book">确认支付{{order.book.sharePrice + order.book.deliveryPrice}}元</my-button>
	</div>
</template>
<script type="text/javascript">
import bookItem from '../components/book-item.vue';
import { Cell, Radio, Button, Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			order : {},
			value: '',
			payType: 0

		}
	},
	components: {
		bookItem, Cell, Radio, 'my-button': Button
	},
	created() {
		this.$http.post(IP + ':2017/readyPay', this.$route.params).then(({data}) => {
			this.order = data;
		});
	},
	methods: {
		tryPay() {
			if (this.value === '') {
				Toast({
					message: '请选择付款方式',
					duration: 1000
				})
				return;
			} else {
				this.payType = this.value === '支付宝付款'? 0 : 1;
			}
			if (this.order.type === 1) {
				Toast({
					message: '已经付过款了',
					duration: 1000
				})
				return;
			}
			MessageBox.confirm('付款成功？', '模拟付款情况，取消则付款失败',).then( () => {

				this.comfirmPay();

			}).catch((val) => {
				Toast({
					message: '付款失败',
					duration: 1000
				})
				return;
			});
		},
		comfirmPay() {
			this.$http.post(IP + ':2017/comfirmPay', {payType: this.payType, orderID: this.$route.params.orderID, bookID: this.order.book._id}).then( ({data}) => {
				if (data === 'success') {
					Toast({
            message: '付款成功',
            duration: 2000
          }); 
          setTimeout( () => {
            location.href= IP + ":8090/#/myOrder";
          }, 2000);
				}
			});
		}
	}
}
</script>