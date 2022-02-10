<template>
  <div class="wrapper-fixed">
    <div class="card-filtros card shadow rounded p-4">
      <div class="agendar-filtros-wrapper">
        <div class="mb-3">
          <p class="mb-1 violet">Campanha</p>
          <b-form-select
            class="filtro-agendar"
            v-model="filtros.campanha"
            :options="optionsCampanha"
          >
          </b-form-select>
        </div>

        <div class="mb-3">
          <p class="mb-1 violet">Município</p>
          <b-form-select
            class="filtro-agendar"
            v-model="filtros.municipio"
            :options="optionsMunicipio"
          >
          </b-form-select>
        </div>

        <div class="mb-3">
          <p class="mb-1 violet">Grupo de atendimento</p>
          <b-form-select
            class="filtro-agendar"
            v-model="filtros.grupoDeAtendimento"
            :options="optionsGrupoDeAtendimento"
          >
          </b-form-select>
        </div>
        <div class="mb-3">
          <p class="mb-1 violet">Data</p>
          <input
            type="date"
            class="filtro-agendar-data rounded p-2"
            v-model="filtros.data"
          />
        </div>
        <div class="mb-4 violet">
          <p class="mb-1 violet">Tipo de Exame</p>
          <b-form-radio-group
            id="radio-tipo-exame"
            v-model="filtros.tipoDeExame"
          >
            <div class="radio-wrapper">
              <b-form-radio value="RT-PC">RT-PC</b-form-radio>
              <b-form-radio value="Antigeno">Antigeno</b-form-radio>
            </div>
          </b-form-radio-group>
        </div>
        <c-button color="secondary" class="p-3" @click="procurarDisponibilidade"
          >Procurar</c-button
        >
      </div>
    </div>
    <b-img
      v-if="carregouDisponibilidade"
      class="indicador ml-3"
      :src="require('../../assets/chevron-right.svg')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CButton from "@/components/custom-button/CustomButton.vue";
@Component({
  name: "CardFiltroAgendar",
  components: {
    CButton,
  },
})
export default class CardFiltroAgendar extends Vue {
  @Prop() carregouDisponibilidade!: boolean;
  filtros = {
    campanha: null,
    municipio: null,
    grupoDeAtendimento: null,
    data: "",
    tipoDeExame: "RT-PC",
  };

  optionsCampanha: Array<{ value: number | null; text: string }> = [
    { value: null, text: "Escolha uma campanha" },
  ];
  optionsMunicipio: Array<{ value: string | null; text: string }> = [
    { value: null, text: "Escolha um município" },
  ];
  optionsGrupoDeAtendimento: Array<{ value: number | null; text: string }> = [
    { value: null, text: "Escolha um grupo" },
  ];

  procurarDisponibilidade(): void {
    this.$emit("procurarDisponibilidade", this.filtros);
  }

  async created(): Promise<void> {
    let campanhas = await this.$store.dispatch("getCampanhas");
    this.optionsCampanha = [
      ...this.optionsCampanha,
      ...campanhas.map((campanha: any) => {
        return { value: campanha.id, text: campanha.nome };
      }),
    ];
    let gruposDeAtendimento = await this.$store.dispatch(
      "getGruposDeAtendimento"
    );
    this.optionsGrupoDeAtendimento = [
      ...this.optionsGrupoDeAtendimento,
      ...gruposDeAtendimento.map((grupo: any) => {
        return { value: grupo.id, text: grupo.nome };
      }),
    ];
    let disponibilidadeAgendamento = await this.$store.dispatch(
      "getDisponibilidadeAgendamentos"
    );
    let optionsMunicipio: Array<string> = disponibilidadeAgendamento.map(
      (opcao: any) => {
        return opcao.municipio;
      }
    );
    this.optionsMunicipio = [
      ...this.optionsMunicipio,
      ...[...new Set(optionsMunicipio)].map((opcao: string) => {
        return { value: opcao, text: opcao };
      }),
    ];
  }
}
</script>

<style>
.wrapper-fixed {
  position: fixed;
  display: flex;
}
.indicador {
  width: 0.8rem;
}
.card-filtros {
  width: 380px;
}
.radio-wrapper {
  display: flex;
  flex-direction: column;
}
.violet {
  color: var(--violet);
}
.agendar-filtros-wrapper {
  width: 328px;
  display: flex;
  flex-direction: column;
}
.filtro-agendar {
  border: 1px solid var(--violet) !important;
  color: var(--violet);
  background: #fff url("../../assets/chevron-down.svg") no-repeat right 0.75rem
    center/8px 10px !important;
}
.filtro-agendar-data {
  border: 1px solid var(--violet) !important;
  color: var(--violet) !important;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: var(--violet);
  background-color: var(--violet);
}
</style>
