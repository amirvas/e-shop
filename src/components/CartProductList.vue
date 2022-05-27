<template>
  <div class="cart-list">
    <div class="cart-list-item" v-for="item in cartProducts" :key="item.id">
      <img :src="item.image" alt="" class="list-item-image" />
      <div class="item-inner">
        <div class="item-title">
          <p class="item-title-text">{{ item.title }}</p>
          <button class="delete-button">x</button>
        </div>
        <p class="item-category">Артукул: {{ item.id }}</p>
        <div class="item-count">
          <div class="quantity-inner">
            <button class="bt-minus">-</button>
            <input type="text" class="quantity" :value="item.amount" />
            <button class="bt-plus">+</button>
          </div>
          <p class="item-total-summ">
            {{ (item.price * item.amount) | numberFormat }} p
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      //получаем товары корзины из глобального хранилища
      cartProducts: "getProducts",
    }),
    // получаем артикул
  },
  filters: {
    numberFormat,
  },
};
</script>
