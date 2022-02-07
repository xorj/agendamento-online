<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <banner-transparencia />
      <b-col cols="9"> </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BannerTransparencia from "@/components/banner-transparencia/BannerTransparencia.vue";
import CustomButton from "@/components/custom-button/CustomButton.vue";

@Component({
  name: "Transparencia",
  components: {
    BannerTransparencia,
    CustomButton,
  },
})
export default class Transparencia extends Vue {
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
