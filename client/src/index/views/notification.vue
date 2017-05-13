<style type="text/css">
  .announce-wrap {
    margin-bottom: 60px;
  }
  .announce {
    width: 90%;
    min-height: 100px;
    background-color: #fafafa;
    border-radius: 4px;
    padding: 10px;
    margin: 8px auto 0;
    position: relative;
  }
  .announce-date {
    font-size: 14px;
    color: #aaa;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .announce-content {
    font-size: 14px;
  }
</style>
<template>
<div class="announce-wrap">
  <div class="announce" v-for="announce in announces" :key="announce._id">
    <h3>通告</h3>
    <p class="announce-content">{{announce.content}}</p>
    <p class="announce-date">{{new Date(announce.createAt).toDateString()}}</p>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      announces: []
    }
  },
  created() {
    this.getAnnounces();
  },
  methods: {
    getAnnounces() {
      this.$http.get(IP + ':2017/getOfficialMsg').then(({data}) => {
        this.announces = data;
      });
    }
  }
}
</script>