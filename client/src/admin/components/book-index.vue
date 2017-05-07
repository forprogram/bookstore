<style type="text/css">
.book-index {
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
	<div class="book-index">
		<img :src="book.images.middle">
		<p>书名:{{book.title}}  {{book.subtitle}}</p>
		<p>书籍状态:{{book.type}}</p>
		<p>作者:{{book.author}}</p>
		<p>出版社:{{book.publisher}}</p>
		<p>ISBN号:{{book.isbn}}</p>
		<p>新旧程度:{{book.quality}}</p>
		<p>页数:{{book.pages}}</p>
		<p>图书原价:{{book.price}}</p>
		<p>分享价格:{{book.sharePrice}}</p>
		<p>运费:{{book.deliveryPrice}}</p>
		<p>图书简介:{{book.summary}}</p>
		<p>目录:{{book.catalog}}</p>
		<p>书籍赠言:{{book.shareWord}}</p>

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
	props:['book'],
	// created() {
	// 	this.$http.post(IP + ':2017/adminBookIndex', {userID: this.book._id}).then(({data}) => {
	// 		this.otherData = data;
	// 	});
	// },
	methods: {
		hideit() {
			this.$emit('hide');
		}
		
	}
}
</script>