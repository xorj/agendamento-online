import axios from "@/axios";

async function getToken(options: any): Promise<{
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}> {
  const { email, senha } = options;
  const response = await axios.post("/login", {
    email,
    password: senha,
  });
  return response.data;
}

const autenticacaoServices = {
  getToken,
};
export default autenticacaoServices;
