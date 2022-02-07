import autenticacaoServices from "@/services/autenticacao/autenticacaoServices";
import { Commit } from "vuex";

const actions = {
  async login({ commit }: { commit: Commit }, options: any) {
    return autenticacaoServices.getToken(options);
  },
};

export default actions;
