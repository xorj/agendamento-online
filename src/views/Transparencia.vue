<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col cols="9" class="px-5 py-3">
        <p class="title bold violet">Transparência</p>
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
      </b-col>
    </b-row>
    <div class="link-voltar-filtrar-container p-3">
      <custom-button
        @click="
          () => {
            hasHistory() ? $router.go(-1) : $router.push('/');
          }
        "
        class="btn-voltar px-4 py-2 ml-3"
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

  async created() {
    let data = await this.$store.dispatch("getTransparencia");
    const { recebidas, aplicadas } = data.doses;
    this.setDataDosesRecebidas(recebidas);
    this.setDataDosesAplicadas(aplicadas);
    const geral = data.vacinacao;
    this.setDataVacinacaoGeral(geral);
  }
}
</script>

<style scoped>
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
