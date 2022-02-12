import axios from "@/axios";

async function getAgendamentosUsuario(options: {
  usuario_id?: string;
  page?: number;
  localizacao?: string;
}): Promise<any> {
  const usuario_id = options?.usuario_id;
  const page = options?.page;
  const localizacao = options?.localizacao;
  const response = await axios.get("/agendamentos", {
    params: {
      usuario_id: usuario_id ? usuario_id : undefined,
      _page: page ? page : undefined,
      localizacao: localizacao ? localizacao : undefined,
    },
  });
  return response.data;
}

async function cancelarAgendamento(options: {
  token: string;
  id: number;
}): Promise<void> {
  const { token, id } = options;
  const response = await axios.patch(`/agendamentos/${id}`, {
    headers: {
      Authorization: "Bearer" + token,
    },
    params: {
      id,
    },
    status: "CANCELADA",
  });
  return response.data;
}

async function getCampanhas(): Promise<any> {
  const response = await axios.get("/campanha");
  return response.data;
}

async function getGruposDeAtendimento(): Promise<any> {
  const response = await axios.get("/grupos-atendimentos");

  return response.data;
}

async function getAgendamentosDisponibilidade(options?: {
  campanha: number | null;
  municipio: string | null;
  grupoDeAtendimento: number | null;
  data: string;
  tipoDeExame: string;
}): Promise<any> {
  const campanha = options?.campanha;
  const municipio = options?.municipio;
  const grupoDeAtendimento = options?.grupoDeAtendimento;
  const tipoDeExame = options?.tipoDeExame;

  const date = options?.data?.split("-");
  const response = await axios.get("/agendamento-disponibilidade", {
    params: {
      campanha_id: campanha,
      municipio,
      grupo_atendimento: grupoDeAtendimento,
      data: date?.length === 3 ? `${date[1]}-${date[2]}-${date[0]}` : null,
      tipo_exame: tipoDeExame,
    },
  });

  return response.data;
}

async function postAgendamento(options: {
  usuario_id: number;
  campanha_id: number;
  grupo_atendimento_id: number;
  municipio: string;
  localizacao: string;
  data: string;
  hora: string;
  tipo_exame: string;
}) {
  const response = await axios.post("/agendamentos", {
    ...options,
  });
  return response.data;
}

const agendamentosServices = {
  getAgendamentosUsuario,
  getAgendamentosDisponibilidade,
  cancelarAgendamento,
  getGruposDeAtendimento,
  getCampanhas,
  postAgendamento,
};
export default agendamentosServices;
