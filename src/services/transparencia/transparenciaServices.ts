import axios from "axios";

async function getTransparencia(options: any): Promise<any> {
  const response = await axios.post("/transparencia", {});

  return response.data;
}

export { getTransparencia };
