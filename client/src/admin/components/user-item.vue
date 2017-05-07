<template>
	<tr v-if="user">
		<td>{{user.name}}</td>
		<td>{{role[user.role]}}</td>
		<td>{{gender[user.gender]}}</td>
		<td>{{(user.school+user.institute)||'未填写'}}</td>
		<td>{{user.phone}}</td>
		<td>
			<button @click="showIndex = !showIndex">查看详细信息</button>
			<user-index v-if="showIndex" v-on:hide="showIndex = !showIndex" :user-data="user"></user-index>
		</td>
		<td><button @click="setManage" v-if="user.role === 0">设为管理员</button></td>
		<td><button @click="deleteUser" v-if="user.role !== 2">删除用户</button></td>
	</tr>
</template>
<script type="text/javascript">
import userIndex from './user-index.vue';
import { Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			role: ['普通用户', '管理员', '超级管理员'],
			gender: ['男', '女', '未选择'],
			showIndex: false
		}
	},
	components: { userIndex },
	props: ['user'],
	methods: {
		setManage() {
      MessageBox.confirm('确定设置为管理员?').then( () => {
        this.$http.post( IP+ ':2017/setManage', {userID: this.user._id}).then( ({data}) => {
         	if (data === 0) {
         		this.user.role = 1;
         		Toast({
		          message: '设置管理员成功',
		          duration: 1000
		        });
          }
        })        
      }).catch((val) => {
      	console.log(val);
      });
		},
		deleteUser() {
      MessageBox.confirm('确定删除用户?').then( () => {
        this.$http.post( IP+ ':2017/deleteUser', {userID: this.user._id}).then( ({data}) => {
         	if (data === 0) {
         		BUS.$emit('removeUser');
         		Toast({
		          message: '删除成功',
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