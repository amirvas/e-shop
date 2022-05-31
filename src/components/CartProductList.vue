<template>
  <div class="cart-list">
    <h1 v-if="cartProducts.length === 0">Ваша корзина пуста...</h1>
    <CartProductListItem
      v-for="item in cartProducts"
      :key="item.id"
      :item="item"
      v-else
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartProductListItem from "@/components/CartProductListItem.vue";

export default {
  components: { CartProductListItem },
  computed: {
    ...mapGetters({
      //получаем товары корзины из глобального хранилища
      cartProducts: "getProducts",
    }),
  },
};
</script>
