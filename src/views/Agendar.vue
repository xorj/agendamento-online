<template>
  <div class="content-wrapper px-3 py-3">
    <p class="title mb-5">Agendar</p>
    <card-filtro-agendar
      @procurarDisponibilidade="loadDisponibilidadeAgendamento"
      :carregouDisponibilidade="carregouDisponibilidade"
    />
    <card-disponibilidade
      v-if="carregouDisponibilidade"
      :data="data"
      :disponibilidadeAgendamento="disponibilidadeAgendamento"
      :infoAgendamento="filtros"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardFiltroAgendar from "@/components/card-filtro-agendar/CardFiltroAgendar.vue";
import CardDisponibilidade from "@/components/card-disponibilidade/CardDisponibilidade.vue";

@Component({
  name: "Agendar",
  components: {
    CardFiltroAgendar,
    CardDisponibilidade,
  },
})
export default class Agendar extends Vue {
  disponibilidadeAgendamento = [];
  carregouDisponibilidade = false;
  data = "";
  filtros = {};

  async loadDisponibilidadeAgendamento(payload: {
    campanha: number | null;
    municipio: string | null;
    grupoDeAtendimento: number | null;
    data: string;
    tipoDeExame: string;
  }): Promise<void> {
    this.disponibilidadeAgendamento = await this.$store.dispatch(
      "getDisponibilidadeAgendamentos",
      payload
    );
    this.filtros = payload;
    this.data = payload.data;
    this.carregouDisponibilidade = true;
  }
}
</script>

<style scoped>
.content-wrapper {
  min-height: 100%;
  background-image: radial-gradient(
      120% 50% at top left,
      transparent 92%,
      #f1f5f9 92.2%
    ),
    linear-gradient(135deg, white, white 100%);
}
@media only screen and (max-width: 1024px) {
  .content-wrapper {
    position: static;
    width: 100%;
    background-color: white;
    background-image: none;
  }
  .bottom-navigation {
    display: none;
  }
}
</style>
