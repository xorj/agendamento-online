import axios from "@/axios";
async function getAgendamentosUsuario(options: {
  token: string;
}): Promise<any> {
  const { token } = options;
  const response = await axios.get("/agendamentos", {
    headers: {
      Authorization: "Bearer" + token,
    },
  });
  return response.data;
}
const agendamentosServices = { getAgendamentosUsuario };
export default agendamentosServices;
