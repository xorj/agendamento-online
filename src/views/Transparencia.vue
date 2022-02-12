<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col class="px-5 py-3">
        <p class="title bold violet">Transparência</p>
        <template v-if="!filtroOpen">
          <div class="charts-container mt-5">
            <div class="chart-container card shadow-sm p-3">
              <doses-recebidas :data="dataDosesRecebidas" />
            </div>
            <div class="chart-container card shadow-sm p-3">
              <doses-aplicadas :data="dataDosesAplicadas" />
            </div>
            <div class="chart-container card shadow-sm p-3">
              <vacinacao-geral :data="dataVacinacaoGeral" />
            </div>
          </div>
        </template>
        <template v-if="filtroOpen">
          <div class="charts-container mt-5">
            <div class="chart-container card shadow-sm p-3">GRAFICO</div>
          </div>
        </template>
      </b-col>
      <b-col v-if="filtroOpen" cols="3" class="wrapper-filtro p-3">
        <p style="color: white; font-weight: 600" class="mb-0">Filtros</p>
        <b-form-input class="my-4" placeholder="Pesquise aqui" type="text" />
        <div class="p-3 minicipio-wrapper rounded mb-3">
          <p class="mb-0" style="color: white">Município</p>
        </div>
        <b-form-radio-group id="radio-local" v-model="filtroMunicipio">
          <div class="radio-wrapper p-2">
            <b-form-radio
              :key="municipio"
              v-for="municipio in optionsMunicipios"
              :value="municipio"
              ><p style="color: white">
                {{ municipio }}
              </p></b-form-radio
            >
          </div>
        </b-form-radio-group>
        <div class="button-wrapper" v-if="filtroOpen">
          <custom-button
            class="px-3 py-2 btn-cancelar"
            @click="
              () => {
                filtroOpen = false;
              }
            "
            color="primary"
            >Cancelar</custom-button
          >
          <custom-button class="px-3 py-2 btn-filtrar" color="primary"
            >Filtrar</custom-button
          >
        </div>
      </b-col>
    </b-row>
    <div class="link-voltar-filtrar-container p-3" v-if="!filtroOpen">
      <custom-button
        class="px-5 py-2 mr-2"
        @click="
          () => {
            filtroOpen = true;
          }
        "
        >Filtrar
      </custom-button>

      <custom-button
        @click="
          () => {
            hasHistory() ? $router.go(-1) : $router.push('/');
          }
        "
        class="btn-voltar px-5 py-2"
      >
        Voltar
      </custom-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannerTransparencia from "@/components/banner-transparencia/BannerTransparencia.vue";
import CustomButton from "@/components/custom-button/CustomButton.vue";
import DosesRecebidas from "@/components/charts/DosesRecebidas.vue";
import DosesAplicadas from "@/components/charts/DosesAplicadas.vue";
import VacinacaoGeral from "@/components/charts/VacinacaoGeral.vue";

@Component({
  name: "Transparencia",
  components: {
    BannerTransparencia,
    CustomButton,
    DosesRecebidas,
    DosesAplicadas,
    VacinacaoGeral,
  },
})
export default class Transparencia extends Vue {
  dataDosesRecebidas = {};
  dataDosesAplicadas = {};
  dataVacinacaoGeral = {};
  dataAgendamentoTipoExame = {};
  dataGrupoDeAtendimento = {};

  optionsMunicipios = [];
  filtroMunicipio = "";

  filtroOpen = false;

  bannerTransparencia = {
    backgroundImage: `url(${require("../assets/banner-transparencia.png")})`,
  };

  capitalize(word: string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  setDataDosesAplicadas(aplicadas: any): void {
    let primeiraDose = {
      label: "d1",
      backgroundColor: "#7E1FB4",
      data: aplicadas.map((faixa: any) => {
        return faixa.doses.d1;
      }),
    };
    let segundaDose = {
      label: "d2",
      backgroundColor: "#1FB451",
      data: aplicadas.map((faixa: any) => {
        return faixa.doses.d2;
      }),
    };
    let terceiraDose = {
      label: "d3",
      backgroundColor: "#1F78B4",
      data: aplicadas.map((faixa: any) => {
        return faixa.doses.d3;
      }),
    };
    this.dataDosesAplicadas = {
      labels: aplicadas.map((info: any) => {
        return info.faixa;
      }),
      datasets: [primeiraDose, segundaDose, terceiraDose],
    };
  }

  hasHistory() {
    return window.history.length > 2;
  }

  setDataDosesRecebidas(recebidas: any): void {
    this.dataDosesRecebidas = {
      labels: Object.keys(recebidas).map(this.capitalize),
      datasets: [
        {
          label: "Doses Recebidas por fabricante",
          data: Object.values(recebidas).map((el: any) => {
            return Number(String(el.replace("%", ""))) / 100;
          }),
          backgroundColor: ["#3a0ca3", "#f72585"],
          hoverOffset: 4,
        },
      ],
    };
  }

  somaTiposExame(tipoDeExame: any, agendamentos: any): number {
    let cont = 0;
    agendamentos.forEach((agendamento: any) => {
      if (agendamento.tipo_exame === tipoDeExame) {
        cont++;
      }
    });
    return cont;
  }

  setDataAgendamentoTipoExame(agendamentos: any): void {
    let tiposDeExame: Array<string> = [];
    agendamentos.forEach((agendamentos: any) => {
      tiposDeExame = tiposDeExame.concat(agendamentos.tipo_exame);
    });
    tiposDeExame = [...new Set(tiposDeExame)];
    let contExames = tiposDeExame.map((tipoDeExame: string) => {
      return {
        [tipoDeExame]: this.somaTiposExame(tipoDeExame, agendamentos),
      };
    });
    this.dataAgendamentoTipoExame = {
      labels: Object.keys(contExames).map(this.capitalize),
      datasets: [
        {
          label: "Doses Recebidas por fabricante",
          data: Object.values(contExames),
          backgroundColor: ["#3a0ca3", "#f72585"],
          hoverOffset: 4,
        },
      ],
    };
  }

  setDataVacinacaoGeral(geral: any): void {
    let data = [0, 0, 0];
    geral.forEach((faixa: any) => {
      data[0] += faixa.doses.d1;
      data[1] += faixa.doses.d2;
      data[2] += faixa.doses.d3;
    });
    this.dataVacinacaoGeral = {
      labels: ["D1", "D2", "D3"],
      datasets: [
        {
          backgroundColor: ["#7E1FB4", "#1FB451", "#1F78B4"],
          data: data,
        },
      ],
    };
  }

  async getMunicipios(): Promise<void> {
    const agendamentos = await this.$store.dispatch("getAgendamentos", {
      municipio: this.filtroMunicipio,
    });
    let municipios = agendamentos.map((agendamentos: any) => {
      return agendamentos.municipio;
    });
    municipios = [...new Set(municipios)];
    this.optionsMunicipios = municipios;
  }

  async created() {
    let data = await this.$store.dispatch("getTransparencia");
    const { recebidas, aplicadas } = data.doses;
    this.setDataDosesRecebidas(recebidas);
    this.setDataDosesAplicadas(aplicadas);
    const geral = data.vacinacao;
    this.setDataVacinacaoGeral(geral);
    this.getMunicipios();
    let agendamentos = await this.$store.dispatch("getAgendamentos");
    this.setDataAgendamentoTipoExame(agendamentos);
  }
}
</script>

<style>
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: var(--dark-pink) !important;
  background-color: var(--dark-pink) !important;
}
.btn-cancelar {
  color: var(--violet);
  background-color: white !important;
}
.btn-filtrar {
  color: var(--violet);
  background-color: var(--dark-pink) !important;
}
.button-wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
}
.minicipio-wrapper {
  background-color: var(--dark-pink);
}
.wrapper-filtro {
  display: flex;
  flex-direction: column;
  background-color: var(--violet);
}
.title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--violet);
}
.link-voltar-filtrar-container {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
}
.bold {
  font-weight: 700;
}
.violet {
  color: var(--violet);
}
.charts-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.chart-container {
  min-width: 300px;
  width: 30%;
  height: 220px;
  border: none;
  margin-left: 10px;
  margin-bottom: 10px;
}
.chart-container > div {
  position: relative;
  height: 100%;
}

.btn-voltar {
  font-size: 1rem;
  background-color: var(--violet);
}

.main-container {
  height: 100%;
  width: 100%;
  display: relative;
}
</style>
