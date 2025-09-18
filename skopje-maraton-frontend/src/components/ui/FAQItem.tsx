import {Box, Collapse, IconButton, Typography} from "@mui/material";
import {useState} from "react";

type FAQItemProps = {
  question: string;
  answer: string;
}

export const FAQItem = ({question, answer}: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Box sx={{ mb: 2, borderBottom: "1px solid #ccc", pb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer"}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="h6">{question}</Typography>
        <IconButton size="small">
          {isOpen ? "v" : "^"}
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Typography variant="body1" sx={{ mt: 1, textAlign: "start", paddingLeft: "1em"}}>
          {answer}
        </Typography>
      </Collapse>
    </Box>
  )
}