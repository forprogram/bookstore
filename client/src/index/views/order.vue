<style type="text/css">
.order {
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
}
.order-address,
.order-delivery,
.order-total {
	border:1px solid #ddd;
	padding: 8px;
	margin-bottom: 10px;
}
.order-hasAddress,
.order-delivery,
.order-total{
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}
.order h3 {
	width: 100px;
	text-align: right;
	
}
.order-price {
	color: red;
}
</style>
<template>
	<div class="order">
		<book-item :book="book"></book-item>
		<div class="order-address">
			
			<div v-if="userData.hasOwnProperty('defaultAddress')" class="order-hasAddress">
				<router-link to="/address" style="width:100%;">
					<h3>收货地址:</h3>
					<div>
						<p>姓名：{{address.name}} 手机：{{address.phone}}</p>
	      		<p>地址：{{address.address}}</p> 	
					</div>
				</router-link>
			</div>
			<router-link  v-else to="/address">
				<div>
					请选择地址
				</div>
			</router-link>
			
		</div>
		<div class="order-delivery">
			<h3>运费:</h3>
			<p class="order-price" v-if="book.deliveryPrice===0">免邮</p>
			<p class="order-price" v-else>￥{{book.deliveryPrice}}元</p>
		</div>
		<div class="order-total">
			<h3>总价</h3>
			<p class="order-price">￥{{book.sharePrice + book.deliveryPrice}}元</p>
		</div>
		<my-button type="primary" size="large" @click="upOrder">确认下单</my-button>
	</div>
</template>
<script type="text/javascript">
import {Button, Toast, MessageBox} from 'mint-ui';
import bookItem from '../components/book-item.vue';
export default {
	data() {
		return {
			book:{
        images:{}
      },
		}
	},
	components: {'my-button': Button, bookItem},
	props: ['userData'],
	computed: {
		address() {
			const defaultAddress = this.userData.defaultAddress;
			return this.userData.address.find((value) => {
				return value._id === defaultAddress;
			});

		},
	},
	created() {
		this.$http.post(IP + ':2017/bookdetail', this.$route.params)
		.then( ({data}) => {

			this.book = data;
		})
	},
	methods: {
		upOrder() {
			if(!this.userData._id) {
	      Toast({
	        message: '还未登录，正在跳转到登录页面',
	        duration: 1500
	      });
	      setTimeout( () => {
	        location.href= IP + ":8090/#/signin";
	      }, 1500);
	      return;
	    };
	    if (this.address === undefined) {
	    	Toast({
	        message: '未选择地址',
	        duration: 1500
	      });
	      return;
	    }
	    let orderData = {
	    	user: this.userData._id,
	    	seller: this.book.user._id,
	    	book: this.book._id,
	    	address: this.address
	    }

			this.$http.post(IP + ':2017/upOrder', orderData).then(({data})=> {
				MessageBox.confirm('是否现在付款?', '确认订单成功').then( () => {
					location.href = IP + ':8090/#/pay/'+ data;
				}).catch((val) => {
					console.log(val);
				});
			})
		}
	}
}
</script>