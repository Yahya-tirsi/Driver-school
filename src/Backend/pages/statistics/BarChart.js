import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Taux de réussite",
        data: data.map((d) => d.successRate),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartData2 = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Taux de réussite",
        data: data.map((d) => d.successRate),
        backgroundColor: "rgba(75, 50, 192, 0.5)",
      },
    ],
  };

  return (
    <Card sx={{ p: 2, display: "flex" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Évolution du Taux de Réussite
        </Typography>
        <Bar data={chartData} />
      </CardContent>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Inscription de l'anne 2024
        </Typography>
        <Bar data={chartData2} />
      </CardContent>
    </Card>
  );
};

export default BarChart;
