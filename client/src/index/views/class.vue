<style type="text/css">
.class {
  margin-bottom: 60px;
}
</style>
<template>
<div>
  <div class="class">
    <search v-show="$route.name=== 'classShare'"></search>
    <classItem v-for="(classItem,index) in classes" :user-data="userData" :class-item="classItem" :key="index"></classItem>
  </div>
</div>
</template>
<script type="text/javascript">
import classItem from '../components/class-item.vue';
import search from '../components/search.vue';

export default {
  data() {
    return {
      classes: []
    }
  },
  components: {classItem, search},
  props: ['userData'],
  created() {
    this.getClass();

    BUS.$on('searchClass', (value) => {
      this.search(value);
    });
    
    BUS.$on('updateClass', () => {
      this.getClass();
    });  
  },

  methods: {
    getClass() {
      switch(this.$route.name) {
        case ('classShare'):
          this.$http.get(IP+':2017/showClass').then(({data}) => {
            this.classes = data;
          });
          break;
        case ('myCollectClass'):
          this.$http.get(IP+':2017/myCollectClass', {credentials: true}).then(({data}) => {
            this.classes = data;
          });
          break;
        case ('myShareClass'):
          this.$http.get(IP+':2017/showMyClass', {credentials: true}).then(({data}) => {
            this.classes = data;
          });
          break;
      }
    },
    search(value) {
      this.$http.post(IP + ":2017/selectedClassList", {value: value}).then(({data}) => {
        this.classes = data;
      });
    }
  }
}
</script>