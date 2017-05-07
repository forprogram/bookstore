<template>
	<div>
		<div>
      <advice-item :advice="advice" v-for="advice in advices" :key="advice._id"></advice-item>
		</div>
	</div>
</template>
<script type="text/javascript">
import adviceItem from '../components/advice-item.vue';
export default {
	data() {
		return {
			advices: {}
		}
	},
	components: {adviceItem},
	methods: {
		showAdvice() {
			this.$http.get(IP + ':8090/showAdvice', {credentials: true}).then(({data}) => {
				this.advices = data;
			});
		},
	}
}
</script>