<template>
  <div class="content-wrapper px-5 py-3">
    <p class="title mb-5">Meus Agendamentos</p>
    <div>
      <p style="color: var(--violet)">Filtrar agendamento</p>
      <div class="d-flex">
        <b-img
          :src="require('../assets/filter-icon.svg')"
          class="filter pb-1"
        />
        <b-form-select
          v-model="lugarFiltro"
          :options="filtrosLugares"
          class="ml-3 filtro-lugar"
        >
        </b-form-select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "MeusAgendamentos",
})
export default class MeusAgendamentos extends Vue {
  lugarFiltro = "";
  filtrosLugares = [
    {
      value: "teste",
      text: "teste",
    },
    {
      value: "teste",
      text: "teste",
    },
    {
      value: "teste",
      text: "teste",
    },
  ];
}
</script>

<style>
.filtro-lugar {
  width: 20rem;
  border-color: var(--violet);
  color: var(--violet);
}
.title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--violet);
}
.content-wrapper {
  height: 200%;
  width: auto;
  background-image: radial-gradient(
      120% 50% at top left,
      transparent 92%,
      #f1f5f9 92.2%
    ),
    linear-gradient(135deg, white, white 100%);
}
</style>
