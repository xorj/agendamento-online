<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia class="banner-transparencia" />
      <b-col class="card-main-wrapper">
        <div class="link-login-container p-3">
          <div class="d-flex align-items-center texto-login">
            <p class="m-0">Já tem conta?</p>
          </div>
          <c-button @click="goToLogin" class="btn-cadastro px-4 py-2 ml-3">
            <b-img :src="require('../assets/user-icon.svg')" />
            Entrar
          </c-button>
        </div>
        <div class="banner-mobile" :style="banner">
          <b-img
            class="calendar-logo"
            :src="require('../assets/calendar-icon.svg')"
          />
          <p class="pl-2 m-0 banner-text">Agendamento Online</p>
        </div>
        <div class="card-container">
          <card-cadastro />
          <p class="p-2 text-center">
            Ao assinar você concorda com os
            <span v-b-modal.modal> <u>termos de serviço</u></span> e
            <span v-b-modal.modal><u>política de privacidade</u></span>
          </p>
        </div>
        <div class="instituicoes p-4">
          <b-img :src="require('../assets/lais-azul.svg')" />
          <b-img :src="require('../assets/ufrn-azul.svg')" />
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal"
      no-title
      hide-header
      hide-header-close
      size="lg"
      centered
    >
      <div class="p-4">
        <p class="dark-pink bold title-modal">
          Termos e Política de privacidade
        </p>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd
        </p>
      </div>
      <template
        v-slot:modal-footer="{ hide }"
        class="px-4 py-3"
        style="margin: 0"
      >
        <c-button
          variant="primary"
          class="btn-fechar-termos py-2 px-5 rounded"
          @click="hide()"
          >Fechar</c-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannerTransparencia from "@/components/banner-transparencia/BannerTransparencia.vue";
import CButton from "@/components/custom-button/CustomButton.vue";
import CardCadastro from "@/components/card-cadastro/CardCadastro.vue";

@Component({
  name: "Cadastro",
  components: {
    BannerTransparencia,
    CButton,
    CardCadastro,
  },
})
export default class Cadastro extends Vue {
  banner = {
    backgroundImage: `url(${require("../assets/banner-transparencia.png")})`,
  };
  goToLogin(): void {
    this.$router.push("/");
  }
}
</script>

<style scoped>
.instituicoes {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.instituicoes > img {
  width: 120px;
}
.calendar-logo {
  width: 50px;
  height: 50px;
}
.banner-text {
  display: flex;
  font-weight: bold;
  color: white;
  width: 110px;
  height: 50px;
}
.banner-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  background-color: var(--violet);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media only screen and (min-width: 1024px) {
  .instituicoes {
    display: none;
  }
  .banner-mobile {
    display: none;
  }
  .card-main-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
@media only screen and (max-width: 1024px) {
  .card-main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .btn-primary {
    border: 1px solid var(--dark-pink) !important;
  }
  .texto-login {
    display: none !important;
  }
  .banner-transparencia {
    display: none;
  }
  .card-container {
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
}
.modal-footer {
  background-color: #f9fafb;
}
.btn-fechar-termos {
  border: 1px solid var(--light-gray);
  background-color: white !important;
  border-color: #ababab !important;
  color: var(--dark-gray) !important;
}
.modal-body {
  font-family: "Poppins", Arial, Helvetica, sans-serif !important;
  padding: 0;
}
.title-modal {
  font-size: 1.3rem;
  color: var(--dark-pink) !important;
  font-weight: 700;
}
.main-container {
  height: 100%;
  width: 100%;
  display: relative;
}
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  max-width: 95vw;
}
.btn-cadastro {
  font-size: 1rem;
  background-color: var(--violet);
}
.link-login-container {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
