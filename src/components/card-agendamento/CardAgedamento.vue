<template>
  <div class="main-wrapper shadow rounded">
    <div class="top-wrapper px-3 pt-3">
      <div class="d-flex">
        <b-img
          :src="require('../../assets/syringe-icon.svg')"
          class="syringe-icon"
        />
        <div>
          <p class="m-0 dark-pink semi-bold">Tipo de exame</p>
          <p class="m-0 dark-pink">{{ tipoExame }}</p>
        </div>
      </div>
      <p
        :class="['m-0', 'semi-bold', agendado === 0 ? 'agendado' : 'cancelado']"
      >
        {{ listaStatus[agendado] }}
      </p>
    </div>
    <div class="px-2">
      <hr style="background-color: var(--light-gray)" />
    </div>
    <div class="d-flex align-items-center px-3">
      <b-img
        :src="require('../../assets/location-icon.svg')"
        class="p-1 mr-1"
      />
      <p class="m-0 p-1 violet">
        {{ localExame }}
      </p>
    </div>
    <div class="d-flex space-between mt-2 px-3 pb-3">
      <div class="d-flex align-items-center">
        <b-img :src="require('../../assets/day-icon.svg')" class="p-1 mr-1" />
        <p class="m-0 violet">
          {{ dataExame }}
        </p>
      </div>
      <div class="d-flex align-items-center">
        <b-img :src="require('../../assets/time-icon.svg')" class="p-1 mr-1" />
        <p class="m-0 violet">
          {{ horaExame }}
        </p>
      </div>
    </div>
    <div class="d-flex flex-auto">
      <c-button
        class="rounded-0 w-50 detalhes btn-agendamento"
        color="secondary"
        >Detalhes</c-button
      >
      <c-button
        class="rounded-0 w-50 cancelar btn-agendamento"
        color="secondary"
        >Cancelar</c-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import IAgendamento from "@/interfaces/IAgendamento";
import { Component, Prop, Vue } from "vue-property-decorator";
import CButton from "@/components/custom-button/CustomButton.vue";

@Component({
  name: "CardAgendamento",
  components: { CButton },
})
export default class CardAgendamento extends Vue {
  @Prop({}) agendamento!: IAgendamento;
  listaStatus = ["Agendado", "Cancelado"];
  get tipoExame(): string {
    console.log("Agendamento", this.agendamento);
    return this.agendamento.tipo_exame;
  }

  get agendado(): number {
    if (this.agendamento.status === "AGENDADO") {
      return 0;
    }
    return 1;
  }
  get localExame(): string {
    return this.agendamento.localizacao;
  }
  get dataExame(): string {
    const arrayData = this.agendamento.data.split("-");
    let mes = arrayData[0],
      dia = arrayData[1],
      ano = arrayData[2];
    return `${dia}/${mes}/${ano}`;
  }
  get horaExame(): string {
    const arrayHora = this.agendamento.hora.split(":");
    let hora = arrayHora[0],
      minutos = arrayHora[1];
    return `${hora}h${minutos}`;
  }
}
</script>

<style>
.btn-agendamento {
  height: 55px;
}
.datalhes {
  background-color: var(--dark-pink) !important;
}
.cancelar {
  background-color: var(--red-cancelado) !important;
}
.space-between {
  justify-content: space-between;
}
.agendado {
  color: var(--green);
}
.cancelado {
  color: var(--red-cancelado);
}
.syringe-icon {
  margin-right: -0.5rem;
}
.dark-pink {
  color: var(--dark-pink);
}
.violet {
  color: var(--violet);
}
.semi-bold {
  font-weight: 600;
}
.top-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-wrapper {
  background-color: white;
  flex: auto;
  max-width: 320px;
}
</style>
