import {Card, Typography} from "@mui/material";

type IconCardProps = {
  icon: string;
  text: string
}

export const IconCard = ({icon, text}: IconCardProps) => {
  return (
    <Card sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "2em",
      background: "transparent",
      boxShadow: "none"
    }}>
      <Typography variant="h1">{icon}</Typography>
      <Typography variant="h6">{text}</Typography>
    </Card>
  )
}