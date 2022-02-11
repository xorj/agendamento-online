<template>
  <b-button
    v-ripple.400="'rgba(255, 255, 255, 0.2)'"
    v-bind="$attrs"
    :variant="color || 'primary'"
    :disabled="disabled"
    :size="size"
    :type="type"
    @click="emiteClick"
  >
    <slot />
  </b-button>
</template>

<script>
import { BButton } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  props: {
    color: { type: String, default: "primary" },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: "" },
    type: { type: String, default: "" },
    loading: { type: Boolean, default: false },
  },
  components: {
    BButton,
  },
  directives: {
    Ripple,
  },
  methods: {
    emiteClick(args) {
      args.preventDefault();
      this.$emit("click", args);
    },
  },
};
</script>

<style></style>
