import {Box, CircularProgress} from "@mui/material";

export const Spinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "wait"
      }}
    >
      <CircularProgress sx={{ color: "#6decaf" }} />
    </Box>
  )
}