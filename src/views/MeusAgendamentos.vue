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
      <div
        class="agendamentos-wrapper my-4"
        v-if="agendamentosFiltrados.length"
      >
        <card-agendamento
          @agendamentoCancelado="loadAgendamentos"
          :key="agendamento.id + index"
          v-for="(agendamento, index) in agendamentosFiltrados"
          :agendamento="agendamento"
        />
      </div>
      <div class="my-4" v-else>
        <h3 class="nenhum-agendamento">Nenhum agendamento disponívels</h3>
      </div>
      <div class="d-flex justify-content-end">
        <pagination
          @changePagina="setPagina"
          :paginaAtual="paginaAtual"
          :totalDePaginas="totalDePaginas"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CardAgendamento from "@/components/card-agendamento/CardAgedamento.vue";
import IAgendamento from "@/interfaces/IAgendamento";
import Pagination from "@/components/pagination/Pagination.vue";
@Component({
  name: "MeusAgendamentos",
  components: {
    CardAgendamento,
    Pagination,
  },
})
export default class MeusAgendamentos extends Vue {
  lugarFiltro: string | null = null;
  paginaAtual = 1;
  totalDePaginas = 2;
  agendamentos: Array<IAgendamento> = [];
  agendamentosFiltrados: Array<IAgendamento> = [];
  filtrosLugares = [{ value: null, text: "Local de exame" }];

  @Watch("paginaAtual")
  async handleNewPagina(newValue: number): Promise<void> {
    const token = this.$store.state.token;
    this.agendamentos = await this.$store.dispatch("getAgendamentos", {
      token: token,
      page: newValue,
    });
    this.setOpcoesFiltradas();
  }

  setOpcoesFiltradas(): void {
    if (this.lugarFiltro) {
      this.agendamentosFiltrados = this.agendamentos.filter(
        (agendamento: IAgendamento) => {
          return agendamento.localizacao === this.lugarFiltro;
        }
      );
    } else {
      this.agendamentosFiltrados = this.agendamentos;
    }
  }

  setPagina(pagina: number): void {
    this.paginaAtual = pagina;
  }

  async setTotalDePaginasEFiltros(): Promise<void> {
    const token = this.$store.state.token;
    let agendamentos = await this.$store.dispatch("getAgendamentos", {
      token: token,
    });
    this.totalDePaginas = Math.floor(agendamentos.length / 10) + 2;
    agendamentos.forEach((agendamento: any) => {
      let option = {
        value: agendamento.localizacao,
        text: agendamento.localizacao,
      };
      const equalText = (el: any) => el.text === option.text;
      if (!this.filtrosLugares.some(equalText)) {
        this.filtrosLugares.push(option);
      }
    });
  }
  async loadAgendamentos(): Promise<void> {
    const token = this.$store.state.token;
    let agendamentos = await this.$store.dispatch("getAgendamentos", {
      token: token,
      page: this.paginaAtual,
    });
    this.agendamentos = agendamentos;
    this.agendamentosFiltrados = this.agendamentos;
  }
  async created(): Promise<void> {
    await this.loadAgendamentos();
    await this.setTotalDePaginasEFiltros();
  }
}
</script>

<style>
.nenhum-agendamento {
  font-weight: 600;
  text-align: center;
  color: var(--violet);
}

.agendamentos-wrapper {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
.filtro-wrapper {
  display: flex;
  align-items: center;
}
.filtro-lugar {
  width: 15rem;
  border-color: var(--violet);
  color: var(--violet);
  background: #fff url("../assets/chevron-down.svg") no-repeat right 0.75rem
    center/8px 10px !important;
}
.title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--violet);
}
.content-wrapper {
  height: 100%;
  width: auto;
  background-image: radial-gradient(
      120% 50% at top left,
      transparent 92%,
      #f1f5f9 92.2%
    ),
    linear-gradient(135deg, white, white 100%);
}
</style>
