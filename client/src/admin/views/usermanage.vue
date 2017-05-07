<style type="text/css">
.user-item {
  border-collapse: collapse; 
  padding: 0;

}
.user-item > {

}
</style>
<template>
  <div>
    <table cellpadding="20" class="user-item">
      <tr>
        <th>姓名</th>
        <th>权限</th>
        <th>性别</th>
        <th>学校学院</th>
        <th>手机号码</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <user-item :user="user" v-for="user in users" :key="user._id"></user-item>
    </table>
  </div>
</template>
<script type="text/javascript">
import userItem from '../components/user-item.vue';
export default {
  data () {
    return {
      users:[]
    }
  },
  components: { userItem },
  props: ['userData'],
  created() {
    BUS.$on('removeUser', () => {
      this.getUserList();
    });
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$http.get(IP + ':2017/userList', {credentials: true}).then(({data}) => {
        this.users = data;
      });
    }
  }
}
</script>