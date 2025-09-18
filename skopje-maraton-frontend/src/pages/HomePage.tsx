import {Box, Button, Divider, Typography} from "@mui/material";
import {IconCard} from "../components/ui/IconCard.tsx";
import {Link} from "react-router";
import {TimelineCard} from "../components/ui/TimelineCard.tsx";
import {FAQ} from "../components/sections/FAQ.tsx";

export const HomePage = () => {
  const eventDetails = [
    {icon: "📅", text: "18 септември"},
    {icon: "🕒", text: "Почеток 9:00"},
    {icon: "📍", text: "Кај Рекорд"},
  ];

  const icons = [
    {icon: "🏃‍♂️‍➡️", text: "40000+ учесници"},
    {icon: "🎉", text: "Неверојатна атмосфера"},
    {icon: "🥇", text: "Меѓународно признат"},
  ];

  const sponsors = ["👟", "💪", "👕", "🍎", "✈️"]

  return (
    <Box sx={{
      display: "flex",
      marginBottom: "4em",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      gap: 4,
    }}>
      <Box sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignContent: "center",
        justifyContent: "center"
      }}>
        <Box>
          <Typography variant="h1" sx={{fontWeight: "bold"}}>Скопје Маратон 2025</Typography>
          <Box>
            <Typography variant="h5">Најголемиот спортски настан во Скопје.</Typography>
            <Typography variant="h5">Пријави се и придружи ни се во трчањето</Typography>
          </Box>
        </Box>
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3}}>
          {eventDetails.map((item, index) => (
            <TimelineCard key={index} icon={item.icon} text={item.text}/>
          ))}
        </Box>
        <Box>
          <Link to={"/addparticipant"}>
            <Button variant="contained" sx={{
              backgroundColor: "#5e239d",
              color: "#6decaf",
              textTransform: "none",
              paddingX: 4,
              paddingY: 2,
              fontSize: "1.2em",
              borderRadius: "1em"
            }}>
              Пријави се
            </Button>
          </Link>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Divider sx={{borderColor: "#5e239d", width: "100%", marginTop: 4}}/>
        </Box>
      </Box>
      <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3}}>
        {icons.map((item, index) => (
          <IconCard key={index} icon={item.icon} text={item.text}/>
        ))}
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant="h2">Наши спонзори</Typography>
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, marginBottom: "3em"}}>
          {sponsors.map((item, index) => (
            <Typography key={index} variant="h4" sx={{
              padding: "1em",
              border: "2px solid #5e239d",
              borderRadius: "1em",
              boxShadow: "5px 5px 5px #6decaf",
              cursor: "default"
            }}>{item}</Typography>
          ))}
        </Box>
      </Box>
      <FAQ/>
    </Box>
  )
}