import axios from "axios";

async function getToken(options: any): Promise<any> {
  const { email, senha } = options;
  const response = await axios.post("/login", {
    data: {
      email,
      senha,
    },
  });

  return response.data;
}

const autenticacaoServices = {
  getToken,
};
export default autenticacaoServices;
