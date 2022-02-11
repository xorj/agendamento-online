<template>
  <b-col cols="3" class="banner-transparencia" :style="bannerTransparencia">
    <span />
    <div class="text-center">
      <b-img
        :src="require('../../assets/calendar-icon.svg')"
        class="calendar mb-4"
      />
      <h3 class="header-transparencia text-white">Agendamento Online</h3>
      <p class="text text-white">Rápido e seguro</p>
      <p class="text text-gray">
        Evite filas e aglomeração. <br />
        O seu bem é o bem de todos
      </p>
      <custom-button
        :disabled="disableTransparenciaLink"
        @click="goToTransparencia"
        color="secondary"
        class="btn-transparencia mt-3"
        >TRANSPARÊNCIA</custom-button
      >
    </div>
    <div class="instituicoes mb-5 px-4">
      <b-img :src="require('../../assets/lais.svg')" />
      <b-img :src="require('../../assets/ufrn.svg')" />
    </div>
  </b-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomButton from "@/components/custom-button/CustomButton.vue";
@Component({
  name: "BannerTransparencia",
  components: { CustomButton },
})
export default class BannerTransparencia extends Vue {
  bannerTransparencia = {
    backgroundImage: `url(${require("../../assets/banner-transparencia.png")})`,
  };

  get disableTransparenciaLink(): boolean {
    return this.$route.path === "/transparencia";
  }

  goToTransparencia(): void {
    if (!this.disableTransparenciaLink) {
      this.$router.push("/transparencia");
    }
  }
}
</script>

<style>
.calendar {
  width: 75px;
}
.text-gray {
  color: var(--light-gray);
}
.header-transparencia {
  font-size: 1.3rem;
  font-weight: 700;
}
.text {
  font-weight: 300;
}
.banner-transparencia {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--violet);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-transparencia {
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 10px 0;
  background-color: var(--dark-pink);
  width: 80%;
}

.instituicoes {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.instituicoes > img {
  width: 8vw;
}
</style>
