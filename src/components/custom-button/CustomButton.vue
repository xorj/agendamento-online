<template>
  <component
    :is="button"
    :type="tag === 'button' ? nativeType : ''"
    @click="handleClick"
    class="btn"
    :class="classes"
  >
    <span
      class="btn-inner--icon"
      v-if="$slots.icon || (icon && $slots.default)"
    >
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </span>
    <i v-if="!$slots.default" :class="icon"></i>
    <span
      class="btn-inner--text"
      v-if="$slots.icon || (icon && $slots.default)"
    >
      <slot>
        {{ text }}
      </slot>
    </span>
    <slot v-if="!$slots.icon && !icon"></slot>
  </component>
</template>
<script>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "CButton",
})
export default class CButton extends Vue {
  @Prop({}) tag = {
    type: String,
    default: "button",
  };
  @Prop({}) type = {
    type: String,
    default: "default",
  };
  @Prop({}) size = {
    type: String,
    default: "",
  };
  @Prop({}) textColor = {
    type: String,
    default: "",
  };
  @Prop({}) nativeType = {
    type: String,
    default: "button",
  };
  @Prop({}) icon = {
    type: String,
    default: "",
  };
  @Prop({}) text = {
    type: String,
    default: "",
  };
  @Prop({}) outline = {
    type: Boolean,
    default: false,
  };
  @Prop({}) rounded = {
    type: Boolean,
    default: false,
  };
  @Prop({}) iconOnly = {
    type: Boolean,
    default: false,
  };
  @Prop({}) block = {
    type: Boolean,
    default: false,
  };
  get classes() {
    let btnClasses = [
      { "btn-block": this.block },
      { "rounded-circle": this.rounded },
      { "btn-icon-only": this.iconOnly },
      { [`text-${this.textColor}`]: this.textColor },
      { "btn-icon": this.icon || this.$slots.icon },
      this.type && !this.outline ? `btn-${this.type}` : "",
      this.outline ? `btn-outline-${this.type}` : "",
    ];
    if (this.size) {
      btnClasses.push(`btn-${this.size}`);
    }
    return btnClasses;
  }
  handleClick(evt) {
    this.$emit("click", evt);
  }
}
</script>
<style></style>
