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
          <button class="order">Заказать</button>
        </div>
        <div class="error-window">
          <p class="error-title">Ошибка!</p>
          <p class="error-message">произошла какая-то ошибка</p>
        </div>
      </div>
    </div>

    <div class="order-form">
      <p class="cart-title">Ваши данные</p>
      <form action="" method="get">
        <div class="form-name-surname">
          <div class="form-item">
            <p class="form-item-title">Имя:</p>
            <input class="form-item-input" type="text" name="" id="" />
          </div>
          <div class="form-item">
            <p class="form-item-title">Фамилия:</p>
            <input class="form-item-input" type="text" name="" id="" />
          </div>
        </div>
        <div class="form-address">
          <p class="form-address-title">Адрес доставки:</p>
          <input class="form-address-input" type="text" name="" id="" />
        </div>

        <div class="form-phone-email">
          <div class="form-item">
            <p class="form-item-title">Телефон:</p>
            <input class="form-item-input" type="text" name="" id="" />
          </div>
          <div class="form-item">
            <p class="form-item-title">Email:</p>
            <input class="form-item-input" type="text" name="" id="" />
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import CartProductList from "@/components/CartProductList.vue";
import { mapGetters } from "vuex";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: { CartProductList },
  computed: {
    ...mapGetters({
      // получаем общую сумму товаров в корзине
      cartTotalPrice: "cartTotal",
    }),
  },
  filters: {
    numberFormat,
  },
};
</script>
