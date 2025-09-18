import {Card, Typography} from "@mui/material";

type TimelineCardProps = {
  icon: string;
  text: string
}

export const TimelineCard = ({icon, text}: TimelineCardProps) => {
  return (
    <Card sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      background: "#6decaf",
      borderRadius: "2em",
      paddingX: "1.5em",
      paddingY: "0.3em",
      boxShadow: "none"
    }}>
      <Typography variant="subtitle1">{icon}</Typography>
      <Typography variant="subtitle1">{text}</Typography>
    </Card>
  )
}