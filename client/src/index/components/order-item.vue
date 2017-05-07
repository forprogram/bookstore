<style type="text/css">
.order-item {
  margin: 10px;
  padding: 8px;
  border:1px solid #ddd;
  border-radius: 4px;
  position: relative;
}
.order-item-detail {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 10px;
}
.order-item-id {
  font-size: 13px;
  position: relative;
  margin-bottom: 6px;
}
.order-status {
  position: absolute;
  right: 8px;
}
.order-item-book-img {
  margin-right: 20px;
}
.order-price-all {
  text-align: right;
  padding-bottom: 8px;
}
.order-button-1 {
  position: absolute;
  bottom: 8px;
  right: 120px;
}
.order-button-2 {
  margin-left: 74%;
}
.order-price {
  color: red;
}
.comfirmDelivery {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.cancelDelivery {
  position: absolute;
  bottom: 10px;
  right: 80px;
}
.deliveryData {
  padding-bottom: 8px;
}
</style>
<template>
  <div>
    <div class="order-item" v-if="order.book">
      <div class="order-item-id">
        <span>订单编号:{{order._id}}</span>
        <span class="order-status">{{orderStatus[order.status]}}</span>
      </div>
      <div class="order-item-detail">
        <img class="order-item-book-img" :src="order.book.images.small">
        <div>
          <p>{{order.book.title}}   {{order.book.subtitle}}</p>
          <p v-if="$route.name==='myOrder'">卖家:{{order.book.user.name}}</p>
          <p v-if="$route.name==='mySellBook'">买家:{{order.user.name}}</p>
          <p>书价:<span class="order-price">￥{{order.book.sharePrice}}元</span></p>
          <p>运费:<span class="order-price"> {{order.book.deliveryPrice === 0? '免邮' : '￥' + order.book.deliveryPrice + '元' }}</span></p>
        </div>
      </div>
      <p class="order-price-all">合计:<span class="order-price">￥{{order.book.sharePrice + order.book.deliveryPrice}}元</span></p>
      <!--买家按键：立即付款，取消订单，申请退款，确认收货，-->
      <!--卖家按键：催他付款，取消订单，立即发货，查看物流-->
      <div v-if="$route.name === 'myOrder'">
        <p class="deliveryData" v-if="order.status===2" style="font-size:12px;text-align:right;">已发货，{{order.logistics.company}}，{{order.logistics.number}}，详细内容查询快递官网</p>
        <router-link :to="{name: 'pay', params: {orderID: order._id}}"><my-button class="order-button-1" v-if="order.status===0" @click="" type="danger" size="small">前往付款</my-button></router-link>
        <my-button @click.native="cancelOrder" class="order-button-2" v-if="order.status===0" type="danger" size="small">取消订单</my-button>
        <my-button class="order-button-2" v-if="order.status===1 || order.status===2" @click="requestRefund" type="danger" size="small">申请退款</my-button>
        <my-button class="order-button-2" v-if="order.status===5" @click="cancelRefund" type="danger" size="small">取消退款</my-button>
        <my-button class="order-button-1" v-if="order.status===2" @click="comfirmReceived" type="danger" size="small">确认收货</my-button>
      </div>
      <div v-if="$route.name === 'mySellBook'">
        <my-button @click.native="" class="order-button-2" v-if="order.status===0" @click="" type="danger" size="small">催他付款</my-button>
        <my-button @click.native="cancelOrder" class="order-button-1" v-if="order.status===0 || order.status===1" @click="" type="danger" size="small">取消订单</my-button>
        <my-button @click.native="" class="order-button-2" v-if="order.status===1" @click.native="readyDelivery = !readyDelivery" type="danger" size="small">立即发货</my-button>
        <my-button @click.native="cancelRefund" class="order-button-1" v-if="order.status===5" type="danger" size="small">拒绝退款</my-button>
        <my-button @click.native="comfirmRefund" class="order-button-2" v-if="order.status===5" type="danger" size="small">同意退款</my-button>
        <p class="deliveryData" v-if="order.status===2" style="font-size:12px;text-align:right;">
          快递：{{logistics.company || order.logistics.company}}，单号：{{logistics.number || order.logistics.number}}
          </p>
      </div>
      <popup 
        pop-transition='popup-fade'
        v-model="readyDelivery"
      >
        <div style="width:300px;height:160px;background:#fff;">
          <field label="快递公司：" placeholder="请输入快递公司" v-model="logistics.company"></field>
          <field label="单号：" placeholder="请输入单号" v-model="logistics.number"></field>

          <my-button @click.native="" class="cancelDelivery" @click.native="readyDelivery = !readyDelivery" type="danger" size="small">取消</my-button>
          <my-button @click.native="" class="comfirmDelivery" @click.native="comfirmDelivery" type="danger" size="small">发货</my-button>
        </div>
      </popup>
      
      
      
      
      
      
    </div>
  </div>
</template>
<script type="text/javascript">
import { Button, Popup, Field, MessageBox } from 'mint-ui';

export default {
  props: ['order'],
  components: { 'my-button': Button, Popup,Field },
  data() {
    return {
      orderStatus: ['未付款', '等待发货', '等待确认收货', '交易完成', '订单已被取消', '正在申请退款', '退款成功'],
      readyDelivery: false,
      logistics: {
        
      }
    }

  },
  methods: {
    cancelOrder() {
      MessageBox.confirm('确定取消该订单?').then(() => {
        this.order.status = 4;
        this.$http.post(IP+':2017/cancelOrder', {orderID: this.order._id, bookID: this.order.book._id});
      }).catch((val) => {
        console.log(val);
      });
      
    },
    comfirmDelivery() {
      this.readyDelivery = false;
      this.order.status = 2;
      this.$http.post(IP+':2017/comfirmDelivery', {orderID: this.order._id,logistics: this.logistics});
    },
    comfirmReceived() {
      MessageBox.confirm('确认后不可退款，确定确定收货?').then(() => {
        this.order.status = 3;
        this.$http.post(IP+':2017/comfirmReceived', {orderID: this.order._id});
      }).catch((val) => {
        console.log(val);
      });
    },
    requestRefund() {
      MessageBox.confirm('确认申请退款?').then(() => {
        this.order.status = 5;
        this.$http.post(IP+':2017/requestRefund', {orderID: this.order._id});
      }).catch((val) => {
        console.log(val);
      });
    },
    cancelRefund() {
      MessageBox.confirm('确认取消或拒绝退款?').then(() => {
        this.$http.post(IP+':2017/cancelRefund', {orderID: this.order._id})
        .then(({data}) => {
          this.order.status = data.status;
        });
      }).catch((val) => {
        console.log(val);
      });
    },
    comfirmRefund() {
      MessageBox.confirm('确认同意退款?').then(() => {
        this.order.status = 6;
        this.$http.post(IP+':2017/comfirmRefund', {orderID: this.order._id});
      }).catch((val) => {
        console.log(val);
      });
    }
  }
}
</script>