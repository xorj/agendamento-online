import agendamentosServices from "@/services/agendamentos/agendamentosServices";
import autenticacaoServices from "@/services/autenticacao/autenticacaoServices";
import transparenciaServices from "@/services/transparencia/transparenciaServices";
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
    options: {
      usuario_id?: string;
      page?: number;
      localizacao?: string;
      municipio?: string;
    }
  ): Promise<void> {
    const response = await agendamentosServices.getAgendamentosUsuario(options);
    return response;
  },
  async getDisponibilidadeAgendamentos(
    {
      commit,
    }: {
      commit: Commit;
    },
    options?: {
      campanha: null;
      municipio: null;
      grupoDeAtendimento: null;
      data: string;
      tipoDeExame: string;
      page?: number;
    }
  ): Promise<void> {
    const response = await agendamentosServices.getAgendamentosDisponibilidade(
      options
    );
    return response;
  },
  async getCampanhas({
    commit,
  }: {
    commit: Commit;
  }): Promise<Array<{ id: string; nome: string }>> {
    const response = await agendamentosServices.getCampanhas();
    return response;
  },
  async getGruposDeAtendimento({
    commit,
  }: {
    commit: Commit;
  }): Promise<Array<{ id: string; nome: string; idade_minima: number }>> {
    const response = await agendamentosServices.getGruposDeAtendimento();
    return response;
  },
  async cancelarAgendamento(
    { commit }: { commit: Commit },
    options: { token: string; id: number }
  ): Promise<void> {
    const response = await agendamentosServices.cancelarAgendamento(options);
    return response;
  },
  async agendarExame(
    { commit }: { commit: Commit },
    options: {
      usuario_id: number;
      campanha_id: number;
      grupo_atendimento_id: number;
      municipio: string;
      localizacao: string;
      data: string;
      hora: string;
      tipo_exame: string;
    }
  ): Promise<void> {
    const response = await agendamentosServices.postAgendamento(options);
    return response;
  },
  async getTransparencia({ commit }: { commit: Commit }): Promise<void> {
    const response = await transparenciaServices.getTransparencia();
    return response;
  },
};

export default actions;
