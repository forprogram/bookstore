<template>
	<tr v-if="book">
		<td><img :src="book.images.small"></td>
		<td>{{book.title}} {{book.subtitle}}</td>
		<td>{{book.author}}</td>
		<td>{{book.publisher}}</td>
		<td>{{book.type}}</td>
		<td>{{book.sharePrice}}</td>
		<td>
			<button @click="showIndex = !showIndex">查看详细信息</button>
			<book-index v-if="showIndex" v-on:hide="showIndex = !showIndex" :book="book"></book-index>
		</td>
		<td><button v-if="book.type === 0" @click="deleteBook">下架书</button></td>
	</tr>
</template>
<script type="text/javascript">
import bookIndex from './book-index.vue';
import { Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			showIndex: false
		}
	},
	components: { bookIndex },
	props: ['book'],
	methods: {
		deleteBook() {
      MessageBox.confirm('确定下架这本书?').then( () => {
        this.$http.post( IP+ ':2017/deletebook', {bookID: this.book._id}).then( ({data}) => {
         	if (data === 0) {
         		this.book.type = -1;
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