<style type="text/css">
.order-item {
  border-collapse: collapse; 
  padding: 0;

}
.order-item > {

}
</style>
<template>
  <div>
    <table cellpadding="20" class="order-item">
      <tr>
        <th>订单编号</th>
        <th>商品</th>
        <th>买家</th>
        <th>卖家</th>
        <th>价格</th>
        <th>运费</th>
        <th>总价</th>
        <th>支付方式</th>
        <th>物流信息</th>
        <th>订单状态</th>
      </tr>
      <order-item :order="order" v-for="order in orders" :key="order._id"></order-item>
    </table>
  </div>
</template>
<script type="text/javascript">
import orderItem from '../components/order-item.vue';
export default {
  data () {
    return {
      orders:[]
    }
  },
  components: { orderItem },
  props: ['userData'],
  created() {
    BUS.$on('removeUser', (data) => {
      this.users[data];
    });
    this.$http.get(IP + ':2017/orderList', {credentials: true}).then(({data}) => {
      this.orders = data;
    });
  }
}
</script>