import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartTotal = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Taux de réussite",
        data: data.map((d) => d.successRate),
        backgroundColor: "rgba(10, 200, 192, 0.6)",
      },
    ],
  };


  return (
    <Card sx={{ p: 2, height: "230px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Total paiment
        </Typography>
        <Bar data={chartData} />
      </CardContent>
      
    </Card>
  );
};

export default ChartTotal;
