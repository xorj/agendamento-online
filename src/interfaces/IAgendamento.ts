export default interface IAgendamento {
  id: number;
  usuario_id: number;
  campanha_id: number;
  grupo_atendimento_id: number;
  municipio: string;
  localizacao: string;
  data: string;
  hora: string;
  status: string;
  tipo_exame: string;
}
