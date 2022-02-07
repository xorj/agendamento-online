<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col cols="9" class="d-flex align-items-center justify-content-center">
        <div class="link-cadastro-container p-3">
          <div class="d-flex align-items-center">
            <p class="m-0">Não tem uma conta?</p>
          </div>
          <custom-button
            @click="goToCadastro"
            class="btn-cadastro px-4 py-2 ml-3"
          >
            <b-img :src="require('../assets/user-icon.svg')" />
            Crie uma
          </custom-button>
        </div>
        <div class="card-container">
          <card-login />
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
  goToCadastro(): void {
    this.$router.push("/cadastro");
  }
}
</script>

<style scoped>
.input-text {
  font-weight: 300;
}
.input-border {
  border: 1px solid var(--light-gray);
}
.btn-entrar {
  font-weight: 700;
  color: white;
}
.login-card {
  width: 471px;
  min-width: 60%;
}

.text-dark-gray {
  color: var(--dark-gray);
}

.text-dark-pink {
  color: var(--dark-pink);
}

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
.link-cadastro-container {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
