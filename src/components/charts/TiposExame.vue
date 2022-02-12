<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "TiposExame",
  props: ["data"],
  watch: {
    data() {
      this.renderChart(this.data, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
        title: {
          display: true,
          fontStyle: "bold",
          text: "Tipos de Exame",
          fontColor: "#4a4a4a",
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
      });
    },
  },
};
</script>
