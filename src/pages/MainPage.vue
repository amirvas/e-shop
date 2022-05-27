<template>
  <div>
    <div
      class="d-flex align-items-center"
      v-if="!productsData"
      style="margin-bottom: 50px"
    >
      <strong>Товары загружаются, пожалуйста подождите...</strong>
      <div
        class="spinner-border ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>

    <main v-else>
      <ProductFilter
        :numOfProducts="numOfProducts"
        :filterPriceFromProp.sync="filterPriceFrom"
        :filterPriceToProp.sync="filterPriceTo"
        :filterCategoryProp.sync="filterCategory"
      />

      <hr class="filter-line" />

      <div class="catalog">
        <ProductList :products="productsToRender" />
      </div>
      <BasePagination
        v-model="page"
        :currentPage="page"
        :numOfProducts="numOfProducts"
        :perPage="productsPerPage"
      />
    </main>
  </div>
</template>

<script>
import axios from "axios";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";

export default {
  data() {
    return {
      productsData: null,
      numOfProducts: null,

      productsPerPage: 6,
      page: 1,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategory: 0,
    };
  },
  components: { ProductList, BasePagination, ProductFilter },
  computed: {
    productsToRender() {
      return this.productsData;
    },
  },
  methods: {
    //загружаем товары
    loadProducts() {
      return setTimeout(() => {
        return axios
          .get(`https://vue-study.skillbox.cc/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              //фильтрация согласно АПИ
              categoryId: this.filterCategory,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((res) => {
            //получаем товары
            this.productsData = res.data.items;
            //получаем общее количество товаров
            this.numOfProducts = res.data.pagination.total;
          });
      }, 500);
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategory() {
      this.loadProducts();
    },
  },
};
</script>
