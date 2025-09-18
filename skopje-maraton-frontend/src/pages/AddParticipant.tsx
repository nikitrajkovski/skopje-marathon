import {Box, Typography} from "@mui/material";
import {AddForm} from "../components/ui/AddForm.tsx";

export const AddParticipant = () => {
  return (
    <Box
      sx={{display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2em", alignItems: "center", gap: 4}}>
      <Box sx={{textAlign: "center"}}>
        <Typography sx={{fontSize: "1.2em"}}>Мило ни е што се одлучи да се пријавиш на маратонот.</Typography>
        <Typography sx={{fontSize: "1.2em"}}>Штотуку го направи најтешкиот чекор и се од тука натаму е
          лесно.</Typography>
        <Typography sx={{fontSize: "1.2em"}}>Се што ќе треба да направиш е да ги внесеш своите лични
          податоци</Typography>
      </Box>

      <AddForm/>
    </Box>
  )
}