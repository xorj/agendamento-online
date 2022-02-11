<template>
  <b-card class="card-login shadow-sm px-4 py-4">
    <p class="text-dark-pink text-center mb-4">Preencha os campos abaixo</p>
    <ValidationObserver ref="observer">
      <b-form @submit.prevent="onSubmit">
        <ValidationProvider
          rules="required|email"
          v-slot="{ errors }"
          class="input-validation"
        >
          <label for="email" class="text-dark-gray mb-0 w-100"
            >Email
            <b-input
              class="mb-2 px-3 py-4 input-border"
              id="email"
              type="email"
              v-model="email"
            />
            <span class="error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>
        <ValidationProvider rules="required" vid="senha" v-slot="{ errors }">
          <label for="senha" class="text-dark-gray mb-0 w-100"
            >Senha
            <b-input
              class="mb-2 px-3 py-4 input-border"
              id="senha"
              type="password"
              v-model="senha"
            />
            <span class="error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>
        <span v-if="erroAoLogar" class="error">{{
          erroAoLogar ? "Email e/ou senha incorretos" : ""
        }}</span>
        <custom-button
          color="secondary"
          class="btn-entrar text-center w-100 py-3 mt-4 mb-3"
          @click="logar"
          >Entrar</custom-button
        >
      </b-form>
    </ValidationObserver>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import CustomButton from "@/components/custom-button/CustomButton.vue";
import {} from "vee-validate";

extend("email", {
  ...email,
  message: "Email inválido",
});

extend("required", {
  ...required,
  message: "Campo obrigatório",
});

@Component({
  name: "CardLogin",
  components: {
    ValidationProvider,
    ValidationObserver,
    CustomButton,
  },
})
export default class CardLogin extends Vue {
  email = "";
  senha = "";
  erroAoLogar = false;
  async logar(): Promise<void> {
    const observerRef = this.$refs.observer;

    const validForm = await (
      observerRef as InstanceType<typeof ValidationProvider>
    ).validate();

    if (validForm) {
      this.erroAoLogar = false;
      await this.$store
        .dispatch("login", {
          email: this.email,
          senha: this.senha,
        })
        .then(
          () => this.$router.push("/agendamento"),
          () => {
            this.erroAoLogar = true;
          }
        );
    }
  }
}
</script>

<style>
.error {
  font-size: 0.9rem;
  color: var(--red);
}

.text-dark-gray {
  color: var(--dark-gray);
}

.text-dark-pink {
  color: var(--dark-pink);
}
.input-border {
  border: 1px solid var(--light-gray);
}
.btn-entrar {
  font-weight: 700;
  color: white;
}
.card-login {
  width: 450px;
  max-width: 80vw;
}
</style>
