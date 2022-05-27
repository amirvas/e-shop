<template>
  <div class="my-pagination">
    <ul class="pagination-list">
      <li class="pagination-prev">
        <a
          href="#"
          @click.prevent="
            if (currentPage > 1) {
              switchPage(currentPage - 1);
            }
          "
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-enabled"
            :class="{ 'arrow-disabled': currentPage === 1 }"
          >
            <path
              d="M7.5 12.8334L1.69736 7.03073L7.5 1.22809"
              stroke="#D9D9D9"
            />
          </svg>
        </a>
      </li>

      <li class="pagination-item" v-for="page in pagesToPaginate" :key="page">
        <a
          href="#"
          class="pagination-item-link"
          :class="{ 'active-link': page === currentPage }"
          @click.prevent="switchPage(page)"
          >{{ page }}</a
        >
      </li>

      <li class="pagination-next">
        <a
          href="#"
          @click.prevent="
            if (currentPage < pagesToPaginate) {
              switchPage(currentPage + 1);
            }
          "
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-enabled"
            :class="{ 'arrow-disabled': currentPage === pagesToPaginate }"
          >
            <path
              d="M0.499878 1.16663L6.30252 6.96927L0.499878 12.7719"
              stroke="#D9D9D9"
            />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  model: {
    prop: "page",
    event: "switchPage",
  },
  props: ["perPage", "currentPage", "numOfProducts"],
  methods: {
    //переключаем страницу, выкидываем событие. Ловим его на главной
    switchPage(page) {
      this.$emit("switchPage", page);
    },
  },
  //считаем сколько отображать страниц в пагинации
  computed: {
    pagesToPaginate() {
      return Math.ceil(this.numOfProducts / this.perPage);
    },
  },
};
</script>

