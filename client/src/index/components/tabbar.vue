<style>
.my-icon-button{
  width:100% !important;
  height:100% !important;
  border-radius:50%;
  background-color:#26a2ff;
  text-align:center;
  top:0 !important;
  left:0 !important;
}
.my-icon-button >a{
  color: #fff;
}
.is-selected {
  background-color: #fff !important;
}
</style>
<template>
<tabbar fixed>
  <tab-item :class="{'is-selected': selected==='bookShare'}" id="課程分享" @click.native="goTo('index')">
    <img slot="icon" src="assets/images/class.png">
    教材互借
  </tab-item>
  <tab-item :class="{'is-selected': selected === 'classShare'}" id="教材互借" @click.native="goTo('classShare')">
    <img slot="icon" src="assets/images/book.png">
    課程分享
  </tab-item>
  <palette-button content="+" direction="t" class="pb" :radius="100" ref="target" mainButtonStyle="color:yellow;background-color:#26a2ff;" :offset="Math.PI / 3.6"
      >
      <div class="my-icon-button indexicon icon-popup"><router-link to="/outbook">分享书</router-link></div>
      <div class="my-icon-button indexicon icon-popup"><router-link to="/outclass">分享课</router-link></div>
    </palette-button>
  <tab-item :class="{'is-selected': selected === 'notification'}" id="公告" @click.native="goTo('notification')">
    <img slot="icon" src="assets/images/explore.png">
    公告
  </tab-item>
  <tab-item :class="{'is-selected': selected === 'home'}" id="我的" @click.native="goTo('home')">
    <img slot="icon" src="assets/images/user.png">
    我的
  </tab-item>
</tabbar>
</template>
<script type="text/javascript">
import { Tabbar, TabItem, PaletteButton} from 'mint-ui';
export default {
  data() {
    return {
      selected: 0,
    }
  },
  watch: {
    '$route'() {
      this.setSelected();
      //document.querySelector('mint-palette-button').;
      this.$refs.target.collapse();
    }
  },
  created() {
    this.setSelected();
  },
  components: {
    Tabbar,TabItem, PaletteButton 
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    setSelected() {
      this.selected = this.$route.name;
    }
  }
}
</script>