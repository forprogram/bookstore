<template>
	<div>
		<span>{{advice.giver.name}}</span>
		<span>{{advice.content}}</span>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {

		}
	},
	props: ['advice'],
}
</script>