<template>
  <li class="catalog-item">
    <router-link
      :to="{ name: 'product', params: { id: product.id } }"
      class="catalog-item-link"
      href="#"
    >
      <img :src="product.image.file.url" alt="" class="item-img" />
      <p class="item-price">{{ product.price | numberFormat }} р</p>
    </router-link>
    <p class="item-title">{{ product.title }}</p>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  props: ["product"],
  filters: {
    numberFormat,
  },
};
</script>
