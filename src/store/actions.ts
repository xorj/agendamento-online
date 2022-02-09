import IAgendamento from "@/interfaces/IAgendamento";
import agendamentosServices from "@/services/agendamentos/agendamentosServices";
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
  async logout({ commit }: { commit: Commit }): Promise<void> {
    commit("SET_TOKEN", "");
    commit("SET_USER", {});
  },
  async cadastro(
    { commit }: { commit: Commit },
    options: { email: string; senha: string; nome: string }
  ): Promise<void> {
    const response = await usuariosServices.postUsuario(options);
    commit("SET_TOKEN", response.accessToken);
    commit("SET_USER", response.user);
  },
  async getAgendamentos(
    { commit }: { commit: Commit },
    options: { token: string; page?: number }
  ): Promise<void> {
    const response = await agendamentosServices.getAgendamentosUsuario(options);
    return response;
  },
  async getDisponibilidadeAgendamentos({
    commit,
  }: {
    commit: Commit;
  }): Promise<void> {
    const response =
      await agendamentosServices.getAgendamentosDisponibilidade();
    return response;
  },
  async cancelarAgendamento(
    { commit }: { commit: Commit },
    options: { token: string; id: number }
  ): Promise<void> {
    const response = await agendamentosServices.cancelarAgendamento(options);
    return response;
  },
};

export default actions;
