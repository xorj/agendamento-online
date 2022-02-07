<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col cols="9" class="d-flex align-items-center justify-content-center">
        <div class="link-login-container p-3">
          <div class="d-flex align-items-center">
            <p class="m-0">Não tem uma conta?</p>
          </div>
          <custom-button @click="goToLogin" class="btn-cadastro px-4 py-2 ml-3">
            <b-img :src="require('../assets/user-icon.svg')" />
            Entrar
          </custom-button>
        </div>
        <div class="card-container">
          <card-cadastro />
        </div>
        <div />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannerTransparencia from "@/components/banner-transparencia/BannerTransparencia.vue";
import CustomButton from "@/components/custom-button/CustomButton.vue";
import CardCadastro from "@/components/card-cadastro/CardCadastro.vue";

@Component({
  name: "Cadastro",
  components: {
    BannerTransparencia,
    CustomButton,
    CardCadastro,
  },
})
export default class Cadastro extends Vue {
  goToLogin(): void {
    this.$router.push("/");
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  width: 100%;
  display: relative;
}
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
