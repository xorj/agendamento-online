import axios from "axios";

async function postUsuario(options: any): Promise<any> {
  const { token, email, senha, nome, dataDeNascimento } = options;
  const response = await axios.post("/users", {
    headers: {
      Authorization: token,
    },
    data: {
      email,
      senha,
      nome,
      dataDeNascimento,
    },
  });

  return response.data;
}

export { postUsuario };
