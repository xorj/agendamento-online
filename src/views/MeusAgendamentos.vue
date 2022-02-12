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
      <div class="agendamentos-wrapper my-4" v-if="agendamentos.length">
        <card-agendamento
          @agendamentoCancelado="loadAgendamentos"
          :key="agendamento.id + index"
          v-for="(agendamento, index) in agendamentos"
          :agendamento="agendamento"
        />
      </div>
      <div class="my-4" v-else>
        <h3 class="nenhum-agendamento">Nenhum agendamento disponível</h3>
      </div>
      <div class="d-flex justify-content-end mb-4 py-4">
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
  filtrosLugares = [{ value: null, text: "Local de exame" }];

  @Watch("paginaAtual")
  async handleNewPagina(newValue: number): Promise<void> {
    const usuario_id = this.$store.state.user.id;
    this.agendamentos = await this.$store.dispatch("getAgendamentos", {
      usuario_id,
      page: newValue,
      localizacao: this.lugarFiltro,
    });
  }
  @Watch("lugarFiltro")
  async handleNewFiltro(newValue: string) {
    this.setTotalPaginas();
    this.paginaAtual = 1;
    const usuario_id = this.$store.state.user.id;
    this.agendamentos = await this.$store.dispatch("getAgendamentos", {
      usuario_id,
      page: this.paginaAtual,
      localizacao: newValue,
    });
  }

  setPagina(pagina: number): void {
    this.paginaAtual = pagina;
  }

  async setFiltros(): Promise<void> {
    const usuario_id = this.$store.state.user.id;
    let agendamentos = await this.$store.dispatch("getAgendamentos", {
      usuario_id,
    });
    this.agendamentos.forEach((agendamento: any) => {
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
  async setTotalPaginas(): Promise<void> {
    const usuario_id = this.$store.state.user.id;
    let agendamentos = await this.$store.dispatch("getAgendamentos", {
      usuario_id,
      localizacao: this.lugarFiltro,
    });
    this.totalDePaginas = Math.ceil(agendamentos?.length / 10);
  }

  async loadAgendamentos(): Promise<void> {
    const usuario_id = this.$store.state.user.id;
    let agendamentos = await this.$store.dispatch("getAgendamentos", {
      usuario_id,
      page: this.paginaAtual,
    });
    this.agendamentos = agendamentos;
  }
  async created(): Promise<void> {
    await this.loadAgendamentos();
    await this.setFiltros();
    await this.setTotalPaginas();
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--violet);
}
.content-wrapper {
  min-height: 100%;
  width: auto;
  background-image: radial-gradient(
      120% 50% at top left,
      transparent 92%,
      #f1f5f9 92.2%
    ),
    linear-gradient(135deg, white, white 100%);
}
</style>
