<template>
  <div class="card disponibilidade-card shadow p-4">
    <p class="violet bold card-disponibilidade-title">
      Locais de exame {{ dataFormatada }}
    </p>
    <div>
      <div
        v-for="disponibilidade in disponibilidadePaginaAtual"
        :key="disponibilidade.id"
      >
        <p class="mb-2 violet">
          {{ disponibilidade.localizacao }} | Covid-19 | 8h às 16h
        </p>
        <div class="wrapper-cards-horarios">
          <div
            :key="disponibilidade.id + vaga[0]"
            :class="[
              'card-horario',
              'rounded',
              agendamentoSelecionado === disponibilidade.id &&
              horarioSelecionado === vaga[0]
                ? 'selecionado'
                : '',
            ]"
            v-for="vaga in Object.entries(disponibilidade.vagas)"
            @click="
              () => {
                (agendamentoSelecionado = disponibilidade.id),
                  (horarioSelecionado = vaga[0]);
              }
            "
          >
            <div class="horario-vaga">
              <p class="m-0">{{ gethoraFormatada(vaga[0]) }}</p>
            </div>
            <div
              class="numero-vagas"
              style="
                background-color: var(--violet);
                color: white;
                border-radius: 0 3px 3px 0;
              "
            >
              <p class="m-0">{{ vaga[1] }} vagas</p>
            </div>
          </div>
        </div>
        <hr style="background-color: var(--gray)" />
      </div>
      <div v-if="!disponibilidadePaginaAtual.length">
        <p class="violet m-0">
          Não existe nenhum agendamento disponível para esses filtros
        </p>
      </div>
    </div>

    <div class="confirmar-pagination-wrapper mb-5 mt-4">
      <c-button
        v-b-modal.modal-agendamento
        :disabled="!horarioSelecionado || !disponibilidadePaginaAtual.length"
        class="rounded px-4 py-2 btn-confirmar"
        color="secondary"
        @click="agendarExame"
        >Confirmar</c-button
      >
      <pagination
        @changePagina="setPagina"
        :paginaAtual="paginaAtual"
        :totalDePaginas="totalDePaginas"
      />
    </div>
    <comprovante-agendamento
      id="modal-agendamento"
      :agendamento="agendamento"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CButton from "@/components/custom-button/CustomButton.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import ComprovanteAgendamento from "@/components/comprovante-agendamento/ComprovanteAgendamento.vue";

interface IVagas {
  "8h": number;
  "9h": number;
  "10h": number;
  "11h": number;
  "12h": number;
  "13h": number;
  "14h": number;
  "15h": number;
  "16h": number;
}

interface IDisponibilidade {
  id: number;
  municipio: string;
  localizacao: string;
  data: string;
  vagas: IVagas;
}

interface IInfoAgendamento {
  campanha: number | null;
  municipio: string | null;
  grupoDeAtendimento: number | null;
  data: string;
  tipoDeExame: string;
}

@Component({
  name: "CardDisponibilidade",
  components: {
    CButton,
    Pagination,
    ComprovanteAgendamento,
  },
})
export default class CardDisponibilidade extends Vue {
  @Prop() data!: string;
  @Prop() infoAgendamento!: IInfoAgendamento;
  @Prop() disponibilidadeAgendamento?: Array<IDisponibilidade>;

  agendamento = {};

  paginaAtual = 1;
  agendamentoSelecionado = 0;
  horarioSelecionado = "";

  get disponibilidadePaginaAtual(): Array<IDisponibilidade> {
    if (this.disponibilidadeAgendamento) {
      return this.disponibilidadeAgendamento.slice(
        (this.paginaAtual - 1) * 3,
        (this.paginaAtual - 1) * 3 + 3
      );
    } else {
      return [];
    }
  }

  get totalDePaginas(): number {
    if (this.disponibilidadeAgendamento) {
      return Math.ceil(this.disponibilidadeAgendamento?.length / 3);
    } else {
      return 0;
    }
  }

  get dataFormatada(): string {
    if (!this.data) {
      return "";
    }
    let arrayData = this.data.split("-");
    if (arrayData.length === 3) {
      return `- ${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
    } else {
      return "";
    }
  }

  async agendarExame(): Promise<void> {
    let { grupoDeAtendimento, tipoDeExame } = this.infoAgendamento;

    const localEscolha = this.disponibilidadeAgendamento?.find(
      (disponivel: IDisponibilidade) => {
        return disponivel.id === this.agendamentoSelecionado;
      }
    );
    if (localEscolha) {
      let { data, municipio, localizacao } = localEscolha;
      let informacoesAgendamento = {
        usuario_id: this.$store.state.user.id,
        campanha_id: 1,
        grupo_atendimento_id: grupoDeAtendimento || 5,
        municipio: municipio,
        localizacao: localizacao,
        data: data,
        hora: this.gethoraFormatada(this.horarioSelecionado),
        status: "AGENDADO",
        tipo_exame: tipoDeExame,
      };
      const novoAgendamento = await this.$store.dispatch("agendarExame", {
        ...informacoesAgendamento,
      });
      this.agendamento = novoAgendamento;
    }
  }

  setPagina(pagina: number): void {
    this.paginaAtual = pagina;
  }

  gethoraFormatada(hora: string): string {
    let H = hora.split("h")[0];
    return `${H}:00`;
  }
}
</script>

<style scoped>
.btn-confirmar {
  width: 200px;
}
.confirmar-pagination-wrapper {
  display: flex;
  justify-content: space-between;
}
.card-horario > .horario-vaga {
  font-size: 1.1rem;
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-horario > .numero-vagas {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-horario {
  cursor: pointer;
  border: 1px solid var(--violet);
  display: flex;
  min-height: 30px;
}
.card-horario.selecionado {
  border: 1px solid var(--dark-pink);
}
.card-horario.selecionado > div.numero-vagas {
  background-color: var(--dark-pink) !important;
}

.wrapper-cards-horarios {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.card-disponibilidade-title {
  font-size: 1.3rem;
}
.violet {
  color: var(--violet);
}
.bold {
  font-weight: 700;
}
.disponibilidade-card {
  margin-left: 450px;
}
@media only screen and (max-width: 1024px) {
  .disponibilidade-card {
    margin: 0;
  }
  .confirmar-pagination-wrapper {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin: 0 !important;
  }
  .confirmar-pagination-wrapper > .btn {
    margin-top: 10px;
  }
  .btn-confirmar {
    flex: 1;
    width: 100%;
    max-width: 300px;
  }
}
</style>
