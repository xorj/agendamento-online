import axios from "@/axios";
async function getTransparencia(): Promise<any> {
  const response = await axios.get("/transparencia");
  return response.data;
}
const transparenciaServices = { getTransparencia };
export default transparenciaServices;
