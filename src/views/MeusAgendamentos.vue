<template>
  <div class="content-wrapper px-5 py-3">
    <p class="title mb-5">Meus Agendamentos</p>
    <div>
      <p style="color: var(--violet)">Filtrar agendamento</p>
      <div class="filtro-wrapper">
        <b-img :src="require('../assets/filter-icon.svg')" class="filter" />
        <b-form-select
          v-model="lugarFiltro"
          :options="filtrosLugares"
          class="ml-3 filtro-lugar"
        >
        </b-form-select>
      </div>
      <div class="agendamentos-wrapper">
        <card-agendamento
          :key="agendamento.id"
          v-for="agendamento in agendamentos"
          :agendamento="agendamento"
        />
      </div>
      <div class="d-flex justify-content-end">
        <b-pagination></b-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardAgendamento from "@/components/card-agendamento/CardAgedamento.vue";
import IAgendamento from "@/interfaces/IAgendamento";

@Component({
  name: "MeusAgendamentos",
  components: {
    CardAgendamento,
  },
})
export default class MeusAgendamentos extends Vue {
  lugarFiltro: string | null = null;
  paginaAtual = 0;
  agendamentos: Array<IAgendamento> = [];
  filtrosLugares = [{ value: null, text: "Local de exame" }];

  get agendamentosFiltrados(): Array<IAgendamento> {
    if (this.lugarFiltro) {
      return this.agendamentos.filter((agendamento: IAgendamento) => {
        return agendamento.localizacao === this.lugarFiltro;
      });
    }
    return this.agendamentos;
  }

  async created(): Promise<void> {
    const token = this.$store.state.token;
    this.agendamentos = await this.$store.dispatch("getAgendamentos", {
      token: token,
    });
  }
}
</script>

<style>
.agendamentos-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
}
.filtro-wrapper {
  display: flex;
  align-items: center;
}
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
