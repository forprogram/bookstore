<template>
	<div>
		<nav>
			<ul>
				<li :class="{'selected': $route.name === 'usermanage'}">
					<router-link to="/">用户管理</router-link>
				</li>
				<li :class="{'selected': $route.name === 'bookmanage'}">
					<router-link to="/bookmanage">书籍管理</router-link>
				</li>
				<li :class="{'selected': $route.name === 'classmanage'}">
					<router-link to="/classmanage">课程管理</router-link>
				</li>
				<li :class="{'selected': $route.name === 'ordermanage'}">
					<router-link to="/ordermanage">订单管理</router-link>
				</li>
				<li :class="{'selected': $route.name === 'announce'}">
					<router-link to="/announce">发布公告</router-link>
				</li>
				<li :class="{'selected': $route.name === 'advice'}">
					<router-link to="/advice">反馈及建议</router-link>
				</li>
			</ul>
		</nav>

	</div>
</template>
<script type="text/javascript">
export default{
	name:'m_nav',
	data(){
		return{
			
		}	
	},
}
</script>
<style scoped>
a{
	text-decoration: none;
	color: #000;
}
ul,li{
	list-style: none;
}
ul{
	width: 100px;
	height: 250px;
	margin:0;
	padding:0;
	display: flex;
	flex-flow: column;
	justify-content: space-around;
}
li{
	width: 100px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background: rgb(148, 215, 255);
	box-sizing: border-box;
	border-bottom: 1px solid rgb(37, 180, 255);
}
li:hover, .selected{
	background: rgb(132, 243, 255); 
}

</style>