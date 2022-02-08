<template><div class="content-wrapper">Meus Agendamentos</div></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "MeusAgendamentos",
  components: {},
})
export default class MeusAgendamentos extends Vue {}
</script>

<style>
.content-wrapper {
  height: 200%;
  width: 100%;
  background-image: radial-gradient(
      120% 50% at top left,
      transparent 92%,
      #f1f5f9 92.2%
    ),
    linear-gradient(135deg, white, white 100%);
}
</style>
