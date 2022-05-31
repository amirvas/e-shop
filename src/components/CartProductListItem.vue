<template>
  <div class="cart-list-item">
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
          <button class="bt-minus" @click.prevent="decreaseAmount">-</button>
          <input type="number" class="quantity" v-model="actualAmount" />
          <button class="bt-plus" @click.prevent="increaseAmount">+</button>
        </div>
        <p class="item-total-summ">
          {{ (item.price * item.amount) | numberFormat }} p
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // количество из корзины записываем сюда
      actualAmount: this.item.amount,
    };
  },
  props: ["item"],
  methods: {
    ...mapActions({
      updateAmount: "updateAmount",
      deleteFromCart: "deleteFromCart",
      loadCart: "loadCart",
    }),
    increaseAmount() {
      this.actualAmount++;
    },
    decreaseAmount() {
      this.actualAmount--;
    },
    deleteProduct(id) {
      this.deleteFromCart({
        id: id,
      }).then(() => {
        // после удаления из списка, снова получаем корзину
        this.loadCart();
      });
    },
  },
  watch: {
    // следим за изменением количества, отправляем запрос put
    actualAmount(value) {
      if (this.actualAmount > 0) {
        this.updateAmount({
          id: this.item.id,
          amount: value,
        });
      }
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
