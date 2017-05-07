<style type="text/css">
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #000;
}
ul, li {
  list-style: none;
}
input,button{
  -webkit-appearance:none;
  outline: none;  
  background-color: transparent;
  border:none;
  border-radius: 0;
}
.search {
  border:1px solid red;
}
.portrait-enter-active, 
.portrait-leave-active {
  transition: all .6s ease;
}
.portrait-enter, 
.portrait-leave-active {
  opacity: 0;
  transform: translate(60%, 0);
}
.view {
  position: absolute;
  width: 100%;
  left: 0;
}
</style>
<template>
<div>
  <div v-show="!showSearch">
    <header-part></header-part>
    <transition name="portrait">
      <router-view class="view" :user-data="userData"></router-view>
    </transition>
    <tabbar v-show="!!~['classShare', 'home', 'bookShare', 'notification'].indexOf($route.name)"></tabbar>
  </div>
</div>
</template>
<script>
import headerPart from './components/header.vue';
import tabbar from './components/tabbar.vue';
export default {
  components:{ headerPart, tabbar},
  data () {
    return {
      showSearch: false,
      userData: {
        collectClass: [],
        collectBook: []
      },
    }
  },
  created() {
    BUS.$on('user', (data) => {
      this.userData = data;
    });
    this.$http.get( IP+ ':2017/', {credentials:true}).then((res) => {
      if (res.data !== 'nolog') {
        this.userData = res.data[0];
      }
    }).catch(err => console.log(err));
    
  },
  methods: {
    
  }
}
</script>
