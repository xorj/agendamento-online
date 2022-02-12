<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia class="banner-transparencia" />
      <b-col class="card-main-wrapper">
        <div class="link-cadastro-container p-3">
          <div class="d-flex align-items-center texto-login">
            <p class="m-0">Não tem uma conta?</p>
          </div>
          <custom-button
            @click="goToCadastro"
            class="btn-cadastro px-4 py-2 ml-3"
          >
            <p class="btn-text ml-1 mb-0">
              <b-img :src="require('../assets/user-icon.svg')" /> Crie uma
            </p>
            <p class="btn-text-mobile mb-0">Criar conta</p>
          </custom-button>
        </div>
        <div class="banner-mobile" :style="banner">
          <b-img
            class="calendar-logo"
            :src="require('../assets/calendar-icon.svg')"
          />
          <p class="pl-2 m-0 banner-text">Agendamento Online</p>
        </div>
        <div class="card-container">
          <card-login />
        </div>
        <div class="instituicoes p-4">
          <b-img :src="require('../assets/lais-azul.svg')" />
          <b-img :src="require('../assets/ufrn-azul.svg')" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannerTransparencia from "@/components/banner-transparencia/BannerTransparencia.vue";
import CustomButton from "@/components/custom-button/CustomButton.vue";
import CardLogin from "@/components/card-login/CardLogin.vue";
@Component({
  name: "Login",
  components: {
    BannerTransparencia,
    CustomButton,
    CardLogin,
  },
})
export default class Login extends Vue {
  banner = {
    backgroundImage: `url(${require("../assets/banner-transparencia.png")})`,
  };
  goToCadastro(): void {
    this.$router.push("/cadastro");
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  width: 100%;
  display: relative;
}
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
  .btn-text-mobile {
    display: none;
  }
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
  .btn-text {
    display: none;
  }
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
  div.card-body {
    padding-left: 0;
    padding-right: 0;
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
.link-cadastro-container {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
