<template>
  <b-modal
    centered
    class="comprovante-modal rounded-sm"
    size="xl"
    v-bind="$attrs"
    no-title
    hide-header
    hide-header-close
  >
    <div class="px-5 pt-5">
      <p class="mb-3 comprovante-title dark-pink">Comprovante de agendamento</p>
      <div class="d-flex">
        <p class="m-0 violet bold comprovante-subtitle">
          {{ dataExame }} - {{ horaExame }}
        </p>
        <p class="ml-4 green bold comprovante-subtitle">
          {{ statusAgendamento }}
        </p>
      </div>
      <div class="avisos-container">
        <p class="m-0 violet bold orientacoes">Orientações</p>
        <ul style="color: var(--red)" class="mb-5">
          <li>
            <div class="aviso p-2">
              Caso sejam informados dados falsos relacionados ao seu
              agendamento, ele poderá ser cancelado a critério do vacinador ou
              supervisor da sala de vacina (Art. 299 - Código Penal)
            </div>
          </li>
          <li>
            <div class="aviso p-2">
              Você poderá cancelar seu agendamento com até 24h de antecedência.
              Em caso de não comparecimento, um novo agendamento será permitido
              após 48h do agendamento anterior.
            </div>
          </li>
          <li>
            <div class="aviso p-2">
              O horário de agendamento poderá sofrer alterações, caso surjam
              problemas logísticos identificados pelo supervisor da sala de
              vacina
            </div>
          </li>
        </ul>
      </div>
      <hr style="background-color: var(--light-gray); padding: 1px" />
      <div>
        <p class="violet mb-1">
          <span class="bold">Cidadão:</span> {{ nomeUsuario }}
        </p>
        <p class="violet mb-1">
          <span class="bold">Localização:</span> {{ localAgendamento }}
        </p>
      </div>
    </div>
    <template v-slot:modal-footer="{ hide, ok }" class="px-4 py-3">
      <c-button
        class="cancelar-comprovante py-2 px-4 mr-3"
        @click="
          () => {
            cancelarAgendamento();
            ok();
          }
        "
        >Cancelar agendamento</c-button
      >
      <c-button
        class="fechar-comprovante py-2 px-5"
        @click="hide()"
        data-dismiss="modal-comprovante"
        >Fechar</c-button
      >
    </template>
  </b-modal>
</template>

<script lang="ts">
import IAgendamento from "@/interfaces/IAgendamento";
import { Component, Vue, Prop } from "vue-property-decorator";
import CButton from "@/components/custom-button/CustomButton.vue";
@Component({
  name: "ComprovanteAgendamento",
  components: {
    CButton,
  },
})
export default class ComprovanteAgendamento extends Vue {
  @Prop() agendamento!: IAgendamento;
  get dataExame(): string {
    const arrayData = this.agendamento?.data?.split("-");
    if (arrayData?.length) {
      let mes = arrayData[0],
        dia = arrayData[1],
        ano = arrayData[2];
      return `${dia}/${mes}/${ano}`;
    } else {
      return "";
    }
  }
  get horaExame(): string {
    const arrayHora = this.agendamento?.hora?.split(":");
    if (arrayHora?.length) {
      let hora = arrayHora[0],
        minutos = arrayHora[1];
      return `${hora}h${minutos}`;
    } else {
      return "";
    }
  }
  get statusAgendamento(): string {
    if (this.agendamento?.status === "AGENDADO") {
      return "Agendado";
    }
    return "Cancelado";
  }

  get localAgendamento(): string {
    return this.agendamento?.localizacao;
  }
  get nomeUsuario(): string {
    return this.$store.state.user.nome;
  }
  async cancelarAgendamento(): Promise<void> {
    const token = this.$store.state.token;
    await this.$store.dispatch("cancelarAgendamento", {
      token,
      id: this.agendamento?.id,
      agendamento: this.agendamento,
    });
    this.$parent.$emit("agendamentoCancelado");
  }
  closeComprovante(): void {
    this.$emit("closeComprovante");
  }
}
</script>

<style>
.fechar-comprovante {
  background-color: white !important;
  border-color: #ababab !important;
  color: var(--dark-gray) !important;
}
.cancelar-comprovante {
  background-color: var(--red-cancelado) !important;
  border-color: var(--red-cancelado) !important;
}
.bold {
  font-weight: bold;
}
.green {
  color: var(--green);
}
.violet {
  color: var(--violet);
}
.dark-pink {
  color: var(--dark-pink);
}
.comprovante-modal {
  max-width: 100%;
}
.modal-body {
  font-family: "Poppins", Arial, Helvetica, sans-serif !important;
  padding: 0;
}
.avisos-container {
  max-width: 850px;
}
.comprovante-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--dark-pink);
}
.comprovante-subtitle {
  font-size: 1.3rem;
}
.orientacoes {
  font-size: 1.1rem;
}
.aviso {
  color: var(--red);
  display: inline-block;
  vertical-align: middle;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 120px;
  background-color: #f9fafb;
  border: none;
  font-family: "Poppins", Arial, Helvetica, sans-serif !important;
}
</style>
