<template>
  <div class="main-container">
    <b-row class="h-100 g-0">
      <b-col cols="3" class="banner-transparencia" :style="bannerTransparencia">
        <div class="banner-content text-center">
          <b-img
            :src="require('../assets/calendar.svg')"
            class="calendar mb-4"
          />
          <h3 class="header text-white">Agendamento Online</h3>
          <p class="text text-white">Rápido e seguro</p>
          <p class="text text-gray">
            Evite filas e aglomeração. <br />
            O ser bem é o bem de todos
          </p>
          <b-button class="btn-transparencia mt-4">TRANSPARÊNCIA</b-button>
        </div>
        <div class="instituicoes">
          <b-img :src="require('../assets/lais.svg')" />
          <b-img :src="require('../assets/ufrn.svg')" />
        </div>
      </b-col>
      <b-col cols="9" class="login-container"> Login Container </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
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
.calendar {
  width: 4vw;
  height: 4vw;
}
.text-gray {
  color: #d2d2d2;
}
.header {
  font-size: 1.5vw;
  font-weight: 700;
}
.text {
  font-size: 1vw;
  font-weight: 300;
}
.main-container {
  height: 100%;
  width: 100%;
}
.banner-transparencia {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #3a0ca3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.banner-content {
}
.btn-transparencia {
  color: white;
  font-weight: 700;
  font-size: 1vw;
  padding: 10px 0;
  background-color: #f72585;
  width: 80%;
}

.instituicoes {
}
</style>
