import axios from "@/axios";
async function getAgendamentosUsuario(options: {
  token: string;
  page?: number;
}): Promise<any> {
  const { token, page } = options;
  const response = await axios.get("/agendamentos", {
    headers: {
      Authorization: "Bearer" + token,
    },
    params: {
      _page: page,
    },
  });
  return response.data;
}

async function getAgendamentosDisponibilidade(): Promise<any> {
  const response = await axios.get("/agendamento-disponibilidade");
  return response.data;
}

const agendamentosServices = {
  getAgendamentosUsuario,
  getAgendamentosDisponibilidade,
};
export default agendamentosServices;
