<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "GruposAtendimento",
  props: ["data"],
  watch: {
    data() {
      this.renderChart(this.data, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontStyle: "bold",
          text: "Grupos de Atendimento",
          fontColor: "#4a4a4a",
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
      });
    },
  },
};
</script>
