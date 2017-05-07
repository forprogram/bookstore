<template>
	<tr v-if="myClass">
		<td>{{myClass.name}}</td>
		<td>{{type[myClass.status]}}</td>
		<td>{{myClass.type}}</td>
		<td>{{myClass.school}}</td>
		<td>{{myClass.classroom}}</td>
		<td>{{myClass.upTime}}</td>
		<td>{{myClass.downTime}}</td>
		<td>{{myClass.summary}}</td>
		<td><button v-if="myClass.status === 0" @click="deleteClass">下架该课程</button></td>
	</tr>
</template>
<script type="text/javascript">
import { Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			showIndex: false,
			type: ['正常', '已下架']
		}
	},
	props: ['myClass'],
	methods: {
		deleteClass() {
      MessageBox.confirm('确定下架这门课程?').then( () => {
        this.$http.post( IP+ ':2017/deleteClass', {classID: this.myClass._id}).then( ({data}) => {
         	if (data === 0) {
         		this.myClass.type = 1;
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