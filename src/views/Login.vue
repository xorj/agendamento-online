<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col cols="9" class="login-container">
        <div class="link-cadastro-container p-3">
          <div><p class="m-0">Não tem uma conta?</p></div>
          <b-button class="btn-cadastro px-4 ml-3">
            <b-img :src="require('../assets/user-icon.svg')" />
            Crie uma
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannerTransparencia from "@/components/banner-transparencia/BannerTransparencia.vue";
@Component({
  components: {
    BannerTransparencia,
  },
})
export default class Login extends Vue {
  data() {
    return {
      bannerTransparencia: {
        backgroundImage: `url(${require("../assets/banner-transparencia.png")})`,
      },
    };
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  width: 100%;
}
.login-container {
}
.btn-cadastro {
  font-size: 16px;
  background-color: #3a0ca3;
}
.link-cadastro-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
