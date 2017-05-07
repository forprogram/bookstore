<template>
	<div>
		<h1>发布公告</h1>
		<textarea rows="6" cols="50" v-model="content" placeholder="公告内容"></textarea>
		<button @click="announce">确定发布</button>
	</div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			content: '',
		}
	},
	props:['userData'],
	methods: {
		announce() {
			this.$http.post(IP + ':2017/announce', {userID: this.userData._id, content: this.content}).then(({data}) => {
				if (data === 0) {
					Toast({
	          message: '发布公告成功',
	          duration: 1000
		      });
					this.content = '';
				}
			});
		}
	}
}
</script>