<template>
  <div>
    <BaseHeader />

    <router-view />

    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
  components: { BaseHeader, BaseFooter },
  methods: {
    ...mapActions(["loadCart", "loadCategories"]),
    ...mapMutations(["updateActualAccessKey"]),
  },
  created() {
    // при обновлении страницы проверяем есть ли в локальном хранилище ключ, если есть то оставляе его и загружаем корзину по этому ключу
    const userAccessKey = localStorage.getItem("accessKey");
    if (userAccessKey) {
      this.updateActualAccessKey(userAccessKey);
    }
    this.loadCart();
    this.loadCategories();
  },
};
</script>