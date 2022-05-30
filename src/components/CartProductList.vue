<template>
  <div class="cart-list">
    <h1 v-if="cartProducts.length === 0">Ваша корзина пуста...</h1>
    <div
      class="cart-list-item"
      v-for="item in cartProducts"
      :key="item.id"
      v-else
    >
      <img :src="item.image" alt="" class="list-item-image" />
      <div class="item-inner">
        <div class="item-title">
          <p class="item-title-text">{{ item.title }}</p>
          <button class="delete-button" @click.prevent="deleteProduct(item.id)">
            x
          </button>
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
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      //получаем товары корзины из глобального хранилища
      cartProducts: "getProducts",
    }),
  },
  methods: {
    ...mapActions({
      deleteFromCart: "deleteFromCart",
      loadCart: "loadCart",
      // updateAmount: "updateAmount",
    }),
    deleteProduct(id) {
      this.deleteFromCart({
        id: id,
      }).then(() => {
        // после удаления из списка, снова получаем корзину
        this.loadCart();
      });
    },
    // updateAmount() {
    //   this.$store.commit("updateAmount", {
    //     id: id.id,
    //     amount: item.amount,
    //   });
    // },
  },
  filters: {
    numberFormat,
  },
};
</script>
