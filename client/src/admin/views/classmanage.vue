<style type="text/css">
.class-item {
  border-collapse: collapse; 
  padding: 0;

}
.class-item th {
	min-width: 60px;
}
</style>
<template>
  <div>
    <table cellpadding="20" class="class-item">
      <tr>
        <th>课程</th>
        <th>状态</th>
        <th>类型</th>
        <th>学校</th>
        <th>教室</th>
        <th>上课时间</th>
        <th>下课时间</th>
        <th>课程简介</th>
        <th></th>
      </tr>
      <class-item :my-class="myClass" v-for="myClass in classes" :key="myClass._id"></class-item>
    </table>
  </div>
</template>
<script type="text/javascript">
import classItem from '../components/class-item.vue';
export default {
  data () {
    return {
      classes:[]
    }
  },
  components: { classItem },
  props: ['userData'],
  created() {
    BUS.$on('removeclasses', () => {
      this.getClassesList();
    });
    this.getClassesList();
  },
  methods: {
    getClassesList() {
      this.$http.get(IP + ':2017/classList', {credentials: true}).then(({data}) => {
        this.classes = data;
      });
    }
  }
}
</script>