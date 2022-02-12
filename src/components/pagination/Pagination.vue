<template>
  <div class="d-flex">
    <c-button
      class="px-3 py-1 button rounded-left"
      style="border-radius: 5px 0 0 5px !important"
      :disabled="firstDisabled"
      @click="voltar"
    >
      <b-img :src="require('../../assets/chevron-left.svg')" />
    </c-button>
    <div
      :class="[
        'card',
        'px-2',
        'py-2',
        'nav-option',
        'rounded-0',
        paginaSelecionada === pagina ? 'selected' : 'not-selected',
      ]"
      @click="clickPagina(pagina)"
      :key="pagina"
      v-for="pagina in paginas"
    >
      <p class="m-0 w-2">{{ pagina }}</p>
    </div>
    <c-button
      class="px-3 py-2 button rounded-right"
      style="border-radius: 0 5px 5px 0 !important"
      :disabled="lastDisabled"
      @click="avancar"
    >
      <b-img :src="require('../../assets/chevron-right.svg')" />
    </c-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CButton from "@/components/custom-button/CustomButton.vue";
@Component({
  name: "Pagination",
  components: {
    CButton,
  },
})
export default class Pagination extends Vue {
  @Prop({}) paginaAtual!: number;
  @Prop({}) totalDePaginas!: number;

  paginaSelecionada = this.paginaAtual;

  @Watch("paginaSelecionada")
  handleChangePaginaSelecionada(newValue: number): void {
    this.$emit("changePagina", newValue);
  }

  get paginas(): Array<number> {
    let paginas = [this.paginaAtual];
    let rangeEsq = this.paginaAtual - 1;
    let rangeDir = this.paginaAtual + 1;

    while (
      (rangeEsq > 0 || rangeDir < this.totalDePaginas) &&
      paginas.length <= 3
    ) {
      if (rangeDir <= this.totalDePaginas && paginas.length <= 3)
        paginas.push(rangeDir);
      if (rangeEsq > 0 && paginas.length <= 3) paginas.unshift(rangeEsq);
      rangeEsq--;
      rangeDir++;
    }

    return paginas;
  }

  get firstDisabled(): boolean {
    return this.paginaSelecionada === 1;
  }

  get lastDisabled(): boolean {
    return this.paginaSelecionada === this.totalDePaginas;
  }
  voltar(): void {
    if (this.paginaSelecionada > 1) this.paginaSelecionada--;
  }
  avancar(): void {
    if (this.paginaSelecionada < this.totalDePaginas) this.paginaSelecionada++;
  }

  clickPagina(index: number): void {
    this.paginaSelecionada = index;
  }
}
</script>

<style>
.nav-option {
  vertical-align: middle;
  text-align: center;
  width: 3rem;
  cursor: pointer;
}
.button {
  background-color: white !important;
  border-color: #d1d5db !important;
}
.selected {
  color: var(--dark-pink);
  border-color: var(--dark-pink) !important;
}
.not-selected {
  color: var(--violet);
}
</style>
