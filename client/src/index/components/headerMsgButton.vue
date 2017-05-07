<style type="text/css">
.messageUnread-wrap {
  background-color: #fff;
  width: 90%;
  position: fixed;
  top: 60px;
  box-sizing: border-box;
  left: 5%;
  padding: 20px;
  z-index: 100;
  border-radius: 2px;
  box-shadow: 0 0 6px #999;
  min-height: 160px;
}
.messageUnread-wrap:before {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #fff;
  z-index: -1;
  top: 0;
  right: 6px;
}
.messageUnread-wrap:after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 0 6px #999;
  border-radius: 2px;
  transform: rotate(45deg);
  top: -10px;
  right: 16px;
  z-index: -2;
}
.messageUnread-wrap > h2 {
  padding-bottom: 10px;
}
.messageUnread-wrap > button {
  position: absolute;
  bottom: 14px;
  right: 1rem;
  color: #ccc;
}
.messageUnread-wrap > p > span {
  color: #f50829;
  padding-right: 4px;
}
</style>
<template>
	 <div class="messageUnread-wrap">
    <h2>未读通知</h2>
    <p><span>{{messageType[0]}}:</span>{{messages[0].content}}</p>
    <button v-if="messages.length === 1" @click="hasread">知道了</button>
    <button v-else @click="hasread">下一条</button>
  </div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
      messageType: ['系统公告', '评论回复', '订单通知'],
      messagesLength: 1
		}
	},
	props: ['messages'],
	methods: {
		hasread() {
			console.log(this.messages[0]._id);
			this.$http.post(IP+':2017/hasread', {messageID: this.messages[0]._id, type: this.messages[0].type}, {credentials: true});
			this.$emit('hasread');
			
		},
	},
	computed: {
		nowRead() {
			if (messages.length != 1) {

			}
		},
	}
}
</script>