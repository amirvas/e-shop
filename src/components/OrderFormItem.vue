<template>
  <div class="form-item">
    <p class="form-item-title">{{ title }}</p>
    <input
      class="form-item-input"
      :type="type"
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </div>
</template>

<script>
export default {
  props: ["placeholder", "title", "type"],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
