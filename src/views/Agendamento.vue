<template>
  <div class="main-container">
    <div class="navbar-agendamento px-2">
      <div class="agendamento-icon px-3 py-3">
        <b-img
          :src="require('../assets/calendar-icon-violet.svg')"
          class="calendar-icon pb-1"
        />
        <p class="ml-3 mb-0 agendamento-icon-text">Agendamento Online</p>
      </div>
      <div class="user-wrapper px-2 py-3">
        <div class="mr-2">
          <b-img
            :src="require('../assets/user-pic.png')"
            class="user-pic pb-1"
          />
        </div>
        <div>
          <p class="mb-0">Seja bem-vindo</p>
          <p class="mb-0 username">{{ nomeDoUsuario }}</p>
        </div>
        <div>
          <b-dropdown
            right
            class="m-2"
            no-caret
            menu-class="mt-2"
            toggle-class="dropdown-button"
          >
            <template #button-content>
              <b-img
                :src="require('../assets/chevron-down.svg')"
                class="dropdown-icon"
              />
            </template>
            <b-dropdown-item href="#" disabled>Meu Perfil</b-dropdown-item>
            <b-dropdown-item @click="logout">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="px-2">
        <hr style="background-color: var(--light-gray)" />
      </div>
      <div
        :class="[
          'd-flex',
          'p-3',
          'rounded',
          'mb-1',
          opcaoSelecionada === 0 ? 'open' : 'closed',
        ]"
        @click="selecionar(0)"
      >
        <div
          :class="[
            'meus-agendamentos-icon',
            'mr-1',
            opcaoSelecionada === 0 ? 'open' : 'closed',
          ]"
        ></div>
        <p class="m-0">Meus agendamentos</p>
      </div>
      <div
        :class="[
          'd-flex',
          'p-3',
          'rounded',
          'mb-1',
          opcaoSelecionada === 1 ? 'open' : 'closed',
        ]"
        @click="selecionar(1)"
      >
        <div
          :class="[
            'agendar-icon',
            'mr-1',
            opcaoSelecionada === 1 ? 'open' : 'closed',
          ]"
        ></div>
        <p class="m-0">Agendar</p>
      </div>
    </div>
    <div class="content">
      <div class="navbar-agendamento-mobile">
        <div class="user-wrapper p-2">
          <b-img
            :src="require('../assets/calendar-icon-violet.svg')"
            class="calendar-icon pb-1"
          />
          <p class="mb-0 w-100 px-1 ml-3 bold violet">Agendamento online</p>

          <div class="menu-mobile">
            <div>
              <b-img
                :src="require('../assets/user-pic.png')"
                class="user-pic pb-1"
              />
            </div>
            <b-dropdown
              right
              no-caret
              menu-class="mt-2"
              toggle-class="dropdown-button"
            >
              <template #button-content>
                <b-img
                  :src="require('../assets/chevron-down.svg')"
                  class="dropdown-icon"
                />
              </template>
              <b-dropdown-item href="#" disabled>Meu Perfil</b-dropdown-item>
              <b-dropdown-item @click="logout">Sair</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
      <meus-agendamentos v-if="opcaoSelecionada === 0" />
      <agendar v-if="opcaoSelecionada === 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomButton from "@/components/custom-button/CustomButton.vue";
import Agendar from "./Agendar.vue";
import MeusAgendamentos from "./MeusAgendamentos.vue";

@Component({
  name: "Agendamento",
  components: {
    CustomButton,
    Agendar,
    MeusAgendamentos,
  },
})
export default class Agendamento extends Vue {
  opcaoSelecionada = 0;

  get nomeDoUsuario(): string {
    return this.$store.state.user.nome;
  }

  selecionar(index: number): void {
    this.opcaoSelecionada = index;
  }
  async logout(): Promise<void> {
    await this.$store.dispatch("logout");
    this.$router.push("/");
  }
  beforeCreate() {
    if (!this.$store.state.token) {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.content {
  margin-left: 250px;
  width: 100%;
  min-height: 100%;
}
.meus-agendamentos-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--dark-pink);
  -webkit-mask: url("../assets/folder-open-icon.svg") no-repeat center;
  mask: url("../assets/folder-open-icon.svg") no-repeat center;
  margin: 0;
  padding: 0;
}

.agendar-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--dark-pink);

  -webkit-mask: url("../assets/edit-icon.svg") no-repeat center;
  mask: url("../assets/edit-icon.svg") no-repeat center;
  margin: 0;
  padding: 0;
}
.agendar-icon.open {
  background-color: white;
}
.meus-agendamentos-icon.open {
  background-color: white;
}
.agendar-icon.closed {
  background-color: var(--dark-pink);
}
.meus-agendamentos-icon.closed {
  background-color: var(--dark-pink);
}

.open {
  background-color: var(--dark-pink);
  color: white;
}

.closed {
  background-color: white;
  color: var(--violet);
}

::v-deep .dropdown-toggle {
  background: transparent !important;
  border: none;
}
.dropdown-icon {
  width: 0.7rem;
}
.user-pic {
  width: 3rem;
}
.username {
  font-weight: 700;
  color: var(--dark-pink);
}

.user-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.agendamento-icon-text {
  width: 120px;
}
.calendar-icon {
  width: 2.2rem;
}
.agendamento-icon {
  font-size: 1rem;
  display: flex;
  color: var(--violet);
  font-weight: 700;
  align-items: center;
}
.main-container {
  width: 100%;
  min-height: 100%;
  display: flex;
}
.navbar-agendamento {
  position: fixed;
  z-index: 1000;
  height: 100%;
  border-right: 1px solid var(--dark-pink);
  display: flex;
  flex-direction: column;
  width: 250px;
  max-width: 100%;
}
.menu-mobile {
  display: flex;
}
@media only screen and (max-width: 1024px) {
  .user-wrapper {
    padding: 0;
  }
  .navbar-agendamento {
    display: none;
  }
  .content {
    margin-left: 0;
  }
}
@media only screen and (min-width: 1024px) {
  .navbar-agendamento-mobile {
    display: none;
  }
}
</style>
