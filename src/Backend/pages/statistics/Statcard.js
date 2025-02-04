import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 200, textAlign: "center", p: 2 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
