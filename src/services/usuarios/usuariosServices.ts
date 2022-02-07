import axios from "@/axios";

async function postUsuario(options: any): Promise<any> {
  const { email, senha, nome } = options;
  const response = await axios.post("/users", {
    email,
    password: senha,
    nome,
  });

  return response.data;
}
const usuariosServices = {
  postUsuario,
};
export default usuariosServices;
