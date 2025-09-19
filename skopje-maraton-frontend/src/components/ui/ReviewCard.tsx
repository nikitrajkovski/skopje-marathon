import {Box, Rating, Typography} from "@mui/material";

type ReviewProps = {
  comment: string;
  rating: number;
  fullName: string;
}

export const ReviewCard = ({comment, rating, fullName}: ReviewProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        boxShadow: 1,
        backgroundColor: "#5e239d",
        alignContent: "start"
      }}
    >
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 3}}>
        <Typography variant="h6" fontWeight="bold" sx={{color: "#f4f4ed"}}>
          {fullName}
        </Typography>
        <Rating value={rating} readOnly size="medium" />
      </Box>
      <Typography variant="body1" sx={{ marginBottom: 1, color: "#f4f4ed", textAlign: "start" }}>
        {comment}
      </Typography>
    </Box>
  );
};