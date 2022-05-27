<template>
  <div class="filter">
    <div class="filter-inner">
      <p class="filter-title">Фильтр</p>
      <form action="" method="get" @submit.prevent="submitFilter">
        <div class="filter-options">
          <div class="price-from">
            <p class="from-title">От</p>
            <input
              class="input"
              type="number"
              name=""
              id=""
              v-model="handlePriceFrom"
            />
          </div>
          <div class="price-to">
            <p class="to-title">До</p>
            <input
              class="input input-to"
              type="number"
              name=""
              id=""
              v-model="handlePriceTo"
            />
          </div>

          <div class="category">
            <p class="category-title">Категория</p>
            <select
              class="input-category"
              name="categories"
              id=""
              v-model="handleCategory"
            >
              <option value="">все модели</option>
              <option
                v-for="category in getCategories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.title }}
              </option>
            </select>
          </div>

          <button type="submit" class="btn-apply-filter">Применить</button>
          <button
            type="button"
            class="btn-clear-filter"
            @click.prevent="clearFilter"
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
    <p class="total-products">Всего товаров: {{ numOfProducts }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      handlePriceFrom: 0,
      handlePriceTo: 0,
      handleCategory: 0,
    };
  },
  props: [
    "numOfProducts",
    "filterPriceFromProp",
    "filterPriceToProp",
    "filterCategoryProp",
  ],
  computed: {
    // получаем категории товаров
    ...mapGetters({
      getCategories: "getCategories",
    }),
  },
  methods: {
    //при нажати на "фильтровать"
    submitFilter() {
      this.$emit("update:filterPriceFromProp", this.handlePriceFrom);
      this.$emit("update:filterPriceToProp", this.handlePriceTo);
      this.$emit("update:filterCategoryProp", this.handleCategory);
    },
    clearFilter() {
      this.$emit("update:filterPriceFromProp", 0);
      this.$emit("update:filterPriceToProp", 0);
      this.$emit("update:filterCategoryProp", 0);
    },
  },
  watch: {
    filterPriceFromProp(value) {
      this.handlePriceFrom = value;
    },
    filterPriceToProp(value) {
      this.handlePriceTo = value;
    },
    filterCategoryProp(value) {
      this.handleCategory = value;
    },
  },
};
</script>
