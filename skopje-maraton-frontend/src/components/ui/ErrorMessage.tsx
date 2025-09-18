import {Box, Typography} from "@mui/material";

type ErrorMessageProps = {
  message: string;
}

export const ErrorMessage = ({message}: ErrorMessageProps) => {
  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
      <Box sx={{padding: "2em", border: "2px solid black", borderRadius: "1em", boxShadow: "5px 5px 5px grey"}}>
        <Typography variant="h5" fontWeight="bold">{message}</Typography>
      </Box>
    </Box>
  )
}