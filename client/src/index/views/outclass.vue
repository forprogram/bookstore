<style type="text/css">
.class-info-item {
  border-bottom: 10px solid rgba(217, 217, 217, 0.35);
}
.class-type {
  width: 100%;
  height: 48px;
  padding: 0 10px;
  box-sizing: border-box;

}
.class-type>select {
  margin-left: 8px;
  width: 70%;
  background-color: #fff;
  border: none;
  height: 48px;
  outline: none;
}
</style>
<template>
<div>
  <div class="class-info-item">
    <mt-field label="课程名称" placeholder="课程名称" v-model="updata.name"></mt-field>
    <div class="class-type">
      <span class="mint-cell-text">课程类型</span>
      <select name="type" class="class-type-select">
        <option value="工科">工科</option>
        <option value="音乐">音乐</option>
        <option value="美术">美术</option>
        <option value="体育">体育</option>
        <option value="教育">教育</option>
        <option value="管理">管理</option>
      </select>
    </div>
  </div>
  <div class="class-info-item">
    <mt-field label="学校" placeholder="输入您的学校" v-model="updata.school"></mt-field>
    <mt-field label="教室" placeholder="上课教室" v-model="updata.classroom"></mt-field>
    <mt-field label="上课日期" placeholder="点击选择日期" @click.native="open('picker1')" size="large" readonly v-model="updata.date"></mt-field>
    <mt-field label="上课时间" placeholder="点击选择时间" @click.native="open('picker2')" size="large" readonly v-model="updata.upTime"></mt-field>
    <mt-field label="下课时间" placeholder="点击选择时间" @click.native="open('picker3')" size="large" readonly v-model="updata.downTime"></mt-field>
  </div>
  <div class="class-info-item">
    <mt-field label="课程简介"  type="textarea" rows="4" v-model="updata.summary"></mt-field>
  </div>
  <my-button class="publish-book" @click="publishClass" type="primary" size="large">发布</my-button>
  <mt-datetime-picker
      ref="picker1"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleDateChange"
      v-model="date">
  </mt-datetime-picker>
  <mt-datetime-picker
      ref="picker2"
      type="time"
      @confirm="handleUpTimeChange"
      v-model="upTime">
  </mt-datetime-picker>
  <mt-datetime-picker
      ref="picker3"
      type="time"
      @confirm="handleDownTimeChange"
      v-model="downTime">
  </mt-datetime-picker>
</div>
</template>
<script type="text/javascript">
import { Field, DatetimePicker, Toast, Button} from 'mint-ui';
export default {
  components: {Field, DatetimePicker, 'my-button': Button},
  data() {
    return {
      updata: {
        name: '',
        type: '',
        school: '',
        classroom: '',
        date: '',
        upTime: '',
        downTime: '',
        summary: '',
      },
      date: '',
      upTime: '',
      downTime: '',
      type:['工科', '音乐', '美术', '体育', '教育', '管理']
    }
  },
  props:['userData'],
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    handleDateChange(value) {
      this.$set(this.updata, 'date', value.toDateString());
    },
    handleUpTimeChange(value) {
      console.log(value);
      this.$set(this.updata, 'upTime', value);
    },
    handleDownTimeChange(value) {
      this.$set(this.updata, 'downTime', value);
    },
    publishClass() {
      if (!this.userData._id) {
        Toast({
          message: '还未登录，正在跳转到登录页面',
          duration: 1500
        });
        setTimeout( () => {
          location.href= IP + ":8090/#/signin";
        }, 1500);
        return;
      }

      this.updata.user = this.userData._id;
      let typeVal = this.type[document.querySelector('.class-type-select').options.selectedIndex];
      this.updata.type = typeVal;
      let canfetch = true;
      for(let key in this.updata) {
        if (this.updata[key] === undefined ||this.updata[key] === '') {
          canfetch = false;
          Toast({
            message: '请将信息填写完整，不明填写无',
            duration: 1500
          }); 
        }
      };
      if (canfetch) {
        this.$http.post(IP+':2017/upClass', this.updata).then( ({body}) => {
          if (body==='success') {
            Toast({
              message: '分享成功，正在返回首页',
              duration: 1000
            }); 
            setTimeout( () => {
              location.href= IP + ":8090/#/index";
            }, 1000);
          }
        });
      }
    }

  },
  computed: {
    stringDate() {
      console.log("'"+this.date+"'");
      if (this.date) {
        return this.date.toDateString();
      }
    }
  }
}
</script>