<template>
  <ul class="catalog-list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";

export default {
  components: { ProductItem },
  props: ["products"],
};
</script>
