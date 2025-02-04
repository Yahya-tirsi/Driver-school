import { Grid, Container } from "@mui/material";
import StatCard from "./Statcard";
import BarChart from "./BarChart";
import StudentsTable from "./StudentsTable";
import axios from "axios";
import { useEffect, useState } from "react";
import ChartTotal from "./chartsTotal";

const StatisticsPage = () => {
  const [client, setclient] = useState([]);
  const [moniteure, setMoniteure] = useState([]);
  const [vehucule, setVehucule] = useState([]);
  const data1 = [
    { month: "2024", successRate: 95 },
  ];
  const data2 = [
    { month: "Jan", successRate: 75 },
    { month: "Fév", successRate: 80 },
    { month: "Mar", successRate: 85 },
    { month: "Avr", successRate: 10 },
    { month: "Mai", successRate: 45 },
    { month: "Mai", successRate: 50 },
    { month: "Jau", successRate: 28 },
    { month: "Jui", successRate: 70 },
    { month: "Oct", successRate: 45 },
  ];

  // Get vehucule
  function getVehucule() {
    axios
      .get("http://localhost:3004/vehicules")
      .then((response) => {
        setVehucule(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getClient() {
    axios
      .get("http://localhost:3004/client")
      .then((response) => {
        setclient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getMoniteure() {
    axios
      .get("http://localhost:3004/moniteure")
      .then((response) => {
        setMoniteure(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getClient();
    getMoniteure();
    getVehucule();
  }, []);

  // const students = [
  //   { nom: "Dupont", prenom: "Jean", note: 5, status: "Admis" },
  //   { nom: "Martin", prenom: "Sophie", note: 18, status: "Admis" },
  //   { nom: "Durand", prenom: "Pierre", note: 9, status: "Échec" },
  //   { nom: "Durand", prenom: "Pierre", note: 9, status: "Échec" },
  //   { nom: "Durand", prenom: "Pierre", note: 9, status: "Échec" },
  // ];

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Client Inscrits" value={client.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Taux de Réussite" value="95%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Vehucule" value={vehucule.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Moniteurs" value={moniteure.length} />
        </Grid>

        <Grid item xs={20} md={8}>
          <BarChart data={data2} />
        </Grid>

        <Grid item xs={15} md={4}>
          <ChartTotal data={data1} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatisticsPage;
