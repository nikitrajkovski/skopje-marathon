import {Box, TextField, Typography} from "@mui/material";
import {type ChangeEvent} from "react";

type FilterProps = {
  nameOfProp: string;
  value: string;
  onChange: (value: string) => void;
}

export const Filter = ({nameOfProp, value, onChange}: FilterProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <Box sx={{display: "flex", flexDirection:"row", alignItems: "center", gap: 2}}>
      <Typography>Филтрирај по {nameOfProp}</Typography>
      <TextField
        size="small"
        value={value}
        onChange={handleChange}
        sx={{width: 100}}
      />
    </Box>
  )
}