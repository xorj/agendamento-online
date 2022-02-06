<template>
  <b-col cols="3" class="banner-transparencia" :style="bannerTransparencia">
    <span />
    <div class="text-center">
      <b-img
        :src="require('../../assets/calendar-icon.svg')"
        class="calendar mb-4"
      />
      <h3 class="header text-white">Agendamento Online</h3>
      <p class="text text-white">Rápido e seguro</p>
      <p class="text text-gray">
        Evite filas e aglomeração. <br />
        O ser bem é o bem de todos
      </p>
      <b-button class="btn-transparencia mt-3">TRANSPARÊNCIA</b-button>
    </div>
    <div class="instituicoes mb-5 px-4">
      <b-img :src="require('../../assets/lais.svg')" />
      <b-img :src="require('../../assets/ufrn.svg')" />
    </div>
  </b-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class BannerTransparencia extends Vue {
  data() {
    return {
      bannerTransparencia: {
        backgroundImage: `url(${require("../../assets/banner-transparencia.png")})`,
      },
    };
  }
}
</script>

<style>
.calendar {
  width: 75px;
}
.text-gray {
  color: #d2d2d2;
}
.header {
  font-size: 24px;
  font-weight: 700;
}
.text {
  font-weight: 300;
}
.banner-transparencia {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #3a0ca3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-transparencia {
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 10px 0;
  background-color: #f72585;
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
