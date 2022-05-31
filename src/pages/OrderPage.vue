<template>
  <main v-if="orderInfo !== null">
    <div class="success">
      <p class="success-title">Ваш заказ оформлен!</p>
      <p class="success-number">
        Номер заказа: {{ this.$route.params.orderId }}
      </p>
    </div>
    <p class="order-text">
      Благодарим за выбор нашего магазина. На вашу почту придёт письмо с
      деталями заказа. Наши менеджеры свяжутся с вами в течение часа для
      уточнения деталей доставки.
    </p>
    <div class="reciever">
      <p class="rec-title">Получатель:</p>
      <p class="rec-name">{{ orderInfo.name }}</p>
    </div>

    <div class="reciever">
      <p class="rec-title">Адрес:</p>
      <p class="rec-name">{{ orderInfo.address }}</p>
    </div>

    <div class="reciever">
      <p class="rec-title">Телефон:</p>
      <p class="rec-name">{{ orderInfo.phone }}</p>
    </div>

    <div class="reciever">
      <p class="rec-title">Email:</p>
      <p class="rec-name">{{ orderInfo.email }}</p>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderInfo: null,
    };
  },
  methods: {
    // тут получаем нужную информацию о заказе
    getOrderInfo() {
      axios
        .get(
          "https://vue-study.skillbox.cc/api/orders/" +
            this.$route.params.orderId,
          {
            params: {
              userAccessKey: this.$store.state.actualAccessKey,
            },
          }
        )
        .then((res) => {
          this.orderInfo = {
            orderId: res.data.id,
            name: res.data.name,
            address: res.data.address,
            phone: res.data.phone,
            email: res.data.email,
          };
        });
    },
  },
  created() {
    this.getOrderInfo();
  },
};
</script>
