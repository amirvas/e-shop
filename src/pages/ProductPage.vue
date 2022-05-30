<template>
  <main v-if="productData">
    <div class="mini-nav">
      <router-link :to="{ name: 'main' }" href="#" class="nav-item"
        >Каталог</router-link
      >
      <svg
        class="nav-item-svg"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.5 1.16669L6.30264 6.96933L0.5 12.772" stroke="#B7B7B7" />
      </svg>
      <router-link :to="{ name: 'main' }" href="#" class="nav-item">{{
        productData.category.title
      }}</router-link>
      <svg
        class="nav-item-svg"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.5 1.16669L6.30264 6.96933L0.5 12.772" stroke="#B7B7B7" />
      </svg>
      <a href="#" class="nav-item">{{ productData.title }}</a>
    </div>

    <hr class="nav-line" />

    <div class="product">
      <p class="product-title">{{ productData.title }}</p>
      <p class="product-id">Артикул {{ productData.id }}</p>
      <div class="product-container">
        <img :src="productData.image.file.url" alt="" class="product-image" />
        <div class="product-cont">
          <p class="product-price">{{ productData.price | numberFormat }} p</p>
          <button class="add-to-cart" @click.prevent="addProductToCart">
            <p class="button-title">в корзину</p>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      productData: null,
    };
  },
  methods: {
    //получаем товар, идентификатор из роутера
    loadProduct() {
      return axios
        .get(
          "https://vue-study.skillbox.cc/api/products/" + this.$route.params.id
        )
        .then((res) => {
          this.productData = res.data;
        });
    },
    ...mapActions({
      addToCart: "addToCart",
    }),
    // добавление товара в корзину
    addProductToCart() {
      this.addToCart({
        id: this.productData.id,
        amount: 1,
      });
    },
  },
  filters: {
    numberFormat,
  },
  watch: {
    "this.$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
