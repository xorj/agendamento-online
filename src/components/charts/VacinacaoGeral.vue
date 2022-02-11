<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  name: "VacinacaoGeral",
  props: ["data"],
  watch: {
    data() {
      this.renderChart(this.data, {
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
        title: {
          display: true,
          fontStyle: "light",
          text: "Vacinação geral",
          fontColor: "#4a4a4a",
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
      });
    },
  },
};
</script>
