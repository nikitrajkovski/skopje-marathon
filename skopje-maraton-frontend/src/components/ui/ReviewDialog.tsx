import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography
} from "@mui/material";
import type {Dispatch, FormEvent, SetStateAction} from "react";

type ReviewDialogProps = {
  openReviewDialog: boolean;
  handleSubmitReview: (e: FormEvent) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  handleOpenDialog: () => void;
};

export const ReviewDialog = ({
                               openReviewDialog,
                               handleSubmitReview,
                               comment,
                               setComment,
                               rating,
                               setRating,
                               handleOpenDialog
                             }: ReviewDialogProps) => {
  return (
    <Dialog open={openReviewDialog} fullWidth>
      <DialogTitle sx={{textAlign: "center"}}>Додај свој коментар</DialogTitle>
      <DialogContent sx={{margin: '2em'}}>
        <Box component="form" onSubmit={handleSubmitReview}>
          <TextField required onChange={(e) => setComment(e.target.value)} name="comment" value={comment}
                     label="Коментар за маратонот" type="text" multiline rows={2} fullWidth/>
          <Box sx={{display: "flex", alignItems: "center", mt: 2, gap: 1}}>
            <Typography>Оцена:</Typography>
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              onChange={(_, value) => setRating(value || 0)}
            />
          </Box>
          <DialogActions>
            <Button onClick={handleOpenDialog} variant="outlined"
                    sx={{backgroundColor: "#f61067", color: "#f4f4ed", textTransform: "none"}}>
              Откажи
            </Button>
            <Button type="submit" onSubmit={handleSubmitReview} variant="contained"
                    sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}>
              Испрати го коментарот
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}