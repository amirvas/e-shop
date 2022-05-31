<template>
  <main>
    <div class="mini-nav">
      <router-link :to="{ name: 'main' }" href="#" class="nav-item"
        >Каталог</router-link
      >
      <svg
        class="nav-item"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.5 1.16669L6.30264 6.96933L0.5 12.772" stroke="#B7B7B7" />
      </svg>
      <a href="#" class="nav-item">Корзина</a>
    </div>
    <hr class="nav-line" />

    <p class="cart-title">Корзина</p>

    <div class="cart-inner">
      <CartProductList />
      <div class="cart-total">
        <div class="total-window">
          <p class="total">Итого:</p>
          <p class="total-summ">{{ cartTotalPrice | numberFormat }} p</p>
          <button class="order" @click.prevent="makeOrder">Заказать</button>
        </div>
        <div class="error-window" v-show="errors !== null">
          <p class="error-title">Внимание!</p>
          <p class="error-message" v-for="err in errors" :key="err">
            {{ err }}
          </p>
        </div>
      </div>
    </div>

    <div class="order-form">
      <p class="cart-title">Ваши данные</p>
      <form action="" method="POST">
        <div class="form-name-surname">
          <OrderFormItem
            placeholder="Ваше имя"
            title="Имя:"
            type="text"
            v-model="formData.name"
          />
          <OrderFormItem
            placeholder="Ваш адрес"
            title="Адрес доставки:"
            type="text"
            v-model="formData.address"
          />
        </div>
        <div class="form-phone-email">
          <OrderFormItem
            placeholder="Ваш телефон"
            title="Телефон:"
            type="tel"
            v-model="formData.phone"
          />
          <OrderFormItem
            placeholder="Ваша почта"
            title="Email:"
            type="email"
            v-model="formData.email"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import CartProductList from "@/components/CartProductList.vue";
import { mapGetters, mapMutations } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import OrderFormItem from "@/components/OrderFormItem.vue";
import axios from "axios";

export default {
  data() {
    return {
      formData: {},
      errors: null,
    };
  },
  components: { CartProductList, OrderFormItem },
  computed: {
    ...mapGetters({
      // получаем общую сумму товаров в корзине
      cartTotalPrice: "cartTotal",
    }),
  },
  methods: {
    ...mapMutations({
      resetCart: "resetCart",
    }),
    // сделать заказ
    makeOrder() {
      return (
        axios
          .post(
            "https://vue-study.skillbox.cc/api/orders",
            {
              ...this.formData,
            },
            {
              params: {
                userAccessKey: this.$store.state.actualAccessKey,
              },
            }
          )
          .then((res) => {
            // после отправки заказа обнуляем корзину
            this.resetCart();
            // и перекидываем на итоговую страницу заказа
            this.$router.push({
              name: "order",
              params: { orderId: res.data.id },
            });
          })
          // перехватываем ошибки для вывода в шаблон
          .catch((error) => {
            this.errors = error.response.data.error.request;
          })
      );
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
