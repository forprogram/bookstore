<style type="text/css">
.info-index {
	position: fixed;
	width: 70%;
	top: 30px;
	height: 600px;
	left: 15%;
	background-color: #eee;
	border-radius: 20px;
	padding: 20px;
	overflow: scroll;
}
</style>
<template>
	<div class="info-index">
		<p>昵称:{{userData.name}}</p>
		<p>性别:{{userData.gender}}</p>
		<p>学校:{{userData.school}}</p>
		<p>学院:{{userData.institute}}</p>
		<p>专业:{{userData.subject}}</p>
		<p>年级:{{userData.grade}}</p>
		<p>收藏的书的书号:{{userData.collectBook}}</p>
		<p>收藏的课程的课程号:{{userData.collectClass}}</p>
		<p>地址:{{userData.address}}</p>
		<p>发布的书的书号:{{otherData.books}}</p>
		<p>订单:{{otherData.orders}}</p>
		<p>发布的课程的课程号:{{otherData.classes}}</p>
		<button @click="hideit">确定</button>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			otherData: {}
		}
	},
	props:['userData'],
	mounted() {
		this.$http.post(IP + ':2017/adminUserIndex', {userID: this.userData._id}).then(({data}) => {
			this.otherData = data;
		});
	},
	methods: {
		hideit() {
			this.$emit('hide');
		}
		
	}
}
</script>