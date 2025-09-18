import {Alert, Box, Button, Divider, FormGroup, TextField, Typography} from "@mui/material";
import {useParams} from "react-router";
import {type FormEvent, useEffect, useState} from "react";
import type {Contestants} from "../types/Contestants.ts";
import {Spinner} from "../components/ui/Spinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export const Payment = () => {
  const {registrationNum} = useParams();
  const [contestant, setContestant] = useState<Contestants | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startingNum, setStartingNum] = useState<string | null>(null);

  useEffect(() => {
    const fetchContestant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/contestants/getByNumber?registrationNumber=${registrationNum}`)
        if (!response.ok) {
          throw new Error("Не може да се најде корисникот")
        }
        const data = await response.json();
        setContestant(data);
        console.log(contestant);
        console.log(data);
        setError(null);
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

    fetchContestant();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/contestants/payment/${contestant!.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
      });
      if (!response.ok) {
        throw new Error("Наплатата не е успешна");
      }
      const startingNum = await response.text();
      setStartingNum(startingNum);
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
  }

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        justifyContent: "center",
        marginTop: "2em",
        gap: 4
      }}>
      <Typography sx={{fontSize: "1.2em", textAlign: "center"}}>Тука можете да ја извршите наплатата за
        маратонот</Typography>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <Box sx={{marginTop: 3, width: "45%"}}>
          <FormGroup sx={{gap: 2}}>
            <TextField label="Име" value={contestant!.firstName} disabled/>
            <TextField label="Презиме" value={contestant!.lastName} disabled/>
            <TextField label="Електронска пошта" value={contestant!.email} disabled/>
            <TextField label="Возраст" value={contestant!.age} disabled/>
            <TextField label="Категорија" value={contestant!.category} disabled/>
          </FormGroup>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          width: "45%",
          border: "2px solid #5e239d",
          borderRadius: "1em",
          boxShadow: "5px 5px 5px #6decaf",
          padding: "2em",
          gap: 4
        }}>
          <Typography variant="h5" fontWeight="bold">За плаќање:</Typography>
          <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
            <Typography variant="h6" fontWeight="normal">Учество: 1799ден.</Typography>
            <Typography variant="h6" fontWeight="normal">ДДВ (18%): 324ден.</Typography>
            <Divider sx={{borderColor: "#5e239d", width: "100%", marginTop: 4}}/>
          </Box>
          <Typography variant="h6">Вкупно: 2123ден.</Typography>
          <Button variant="contained" sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}
                  type="submit" disabled={error !== null} onSubmit={handleSubmit}>Плати</Button>
        </Box>
      </Box>
      {startingNum &&
        <Box sx={{display: "flex", justifyContent: "center"}}><Alert severity="success">Успешно ја извршивте наплатата и
          го добивте стартниот број: {startingNum}</Alert></Box>}
    </Box>
  )
}