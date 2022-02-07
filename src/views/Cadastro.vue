<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col cols="9" class="d-flex align-items-center justify-content-center">
        <div class="link-cadastro-container p-3">
          <div class="d-flex align-items-center">
            <p class="m-0">Não tem uma conta?</p>
          </div>
          <custom-button @click="goToLogin" class="btn-cadastro px-4 py-2 ml-3">
            <b-img :src="require('../assets/user-icon.svg')" />
            Entrar
          </custom-button>
        </div>
        <div class="card-login">
          <b-card class="shadow-sm px-4 py-4">
            <p class="text-dark-pink text-center">Preencha os campos abaixo</p>
            <form>
              <label for="email" class="text-dark-gray mb-1">Email</label>
              <b-input
                class="mb-2 px-3 py-4 input-border"
                id="email"
                type="email"
              />
              <label for="senha" class="text-dark-gray mb-1">Senha</label>
              <b-input class="p-4 input-border" id="senha" type="password" />
              <p class="text-end text-dark-gray my-4 mr-1">
                Esqueceu sua senha?
              </p>
              <custom-button
                color="secondary"
                class="btn-entrar text-center w-100 py-3 mb-3"
                >Entrar</custom-button
              >
            </form>
          </b-card>
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

@Component({
  name: "Cadastro",
  components: {
    BannerTransparencia,
    CustomButton,
  },
})
export default class Cadastro extends Vue {
  goToCadastro(): void {
    this.$router.push("/login");
  }
}
</script>

<style scoped>
.input-border {
  border: 1px solid var(--light-gray);
}
.btn-entrar {
  font-weight: 700;
  color: white;
}
.login-card {
  width: 450px;
  max-width: 80vw;
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
.card-login {
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
