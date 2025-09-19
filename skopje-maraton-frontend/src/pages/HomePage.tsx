import {
  Box,
  Button,
  Divider,
  Typography
} from "@mui/material";
import {IconCard} from "../components/ui/IconCard.tsx";
import {Link} from "react-router";
import {TimelineCard} from "../components/ui/TimelineCard.tsx";
import {FAQ} from "../components/sections/FAQ.tsx";
import {type FormEvent, useContext, useEffect, useState} from "react";
import {Spinner} from "../components/ui/Spinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {ReviewCard} from "../components/ui/ReviewCard.tsx";
import {AuthenticationContext} from "../context/AuthenticationContext.tsx";
import {ReviewDialog} from "../components/ui/ReviewDialog.tsx";
import type {Review} from "../types/Review.ts";

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

  const sponsors = ["👟", "💪", "👕", "🍎", "✈️"];

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openReviewDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const {user, token} = useContext(AuthenticationContext);

  const handleOpenDialog = () => {
    setOpenDialog(!openReviewDialog);
    console.log(openReviewDialog);
  }

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify({
          user: {id: user.id, fullName: user.fullName},
          comment,
          rating,
        }),
      })
      if (!response.ok) throw new Error("Грешка при испраќање на коментарот");

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(0);
      setOpenDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Непозната грешка");
      }
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/reviews");
        if (!response.ok) {
          throw new Error(`Грешка при повик за добивање на коментари`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Непозната грешка");
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);


  if (loading) {
    return (
      <Spinner/>
    )
  }

  if (error) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
        <ErrorMessage message={error}/>
      </Box>
    )
  }

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
      <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant="h2">Коментари оставени за маратонот</Typography>
        {reviews.map((review) => (
          <ReviewCard key={review.id} comment={review.comment} rating={review.rating} fullName={review.user.fullName}/>
        ))}
      </Box>
      {token && <Button onClick={handleOpenDialog} variant="outlined"
                        sx={{backgroundColor: "#6decaf", color: "#5e239d", textTransform: "none"}}>
        Додај свој коментар
      </Button>}

      <ReviewDialog openReviewDialog={openReviewDialog} handleSubmitReview={handleSubmitReview} comment={comment}
                    setComment={setComment} rating={rating} setRating={setRating} handleOpenDialog={handleOpenDialog}/>
    </Box>
  )
}