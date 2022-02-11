<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "DosesAplicadas",
  props: ["data"],
  watch: {
    data() {
      this.renderChart(this.data, {
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
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
          position: "left",
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
        title: {
          display: true,
          fontStyle: "light",
          text: "Doses aplicadas",
          fontColor: "#4a4a4a",
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        },
      });
    },
  },
};
</script>
