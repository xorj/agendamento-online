import autenticacaoServices from "@/services/autenticacao/autenticacaoServices";
import usuariosServices from "@/services/usuarios/usuariosServices";

import { Commit } from "vuex";

const actions = {
  async login(
    { commit }: { commit: Commit },
    options: { email: string; senha: string }
  ): Promise<void> {
    const response = await autenticacaoServices.getToken(options);
    commit("SET_TOKEN", response.accessToken);
    commit("SET_USER", response.user);
  },
  async cadastro(
    { commit }: { commit: Commit },
    options: { email: string; senha: string; nome: string }
  ): Promise<void> {
    const response = await usuariosServices.postUsuario(options);
    commit("SET_TOKEN", response.accessToken);
    commit("SET_USER", response.user);
  },
};

export default actions;
