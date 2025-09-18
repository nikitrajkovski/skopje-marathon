import {
  Box,
} from "@mui/material";
import {useEffect, useState} from "react";
import {Spinner} from "../components/ui/Spinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import type {Contestants} from "../types/Contestants.ts";
import {ContestantsTable} from "../components/ui/ContestantsTable.tsx";

export const AllParticipants = () => {
  const [contestants, setContestants] = useState<Contestants[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchContestants = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/contestants");
        if (!response.ok) {
          throw new Error(`Грешка при повик за добивање на учесници`);
        }
        const data = await response.json();
        setContestants(data);
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

    fetchContestants();
  }, []);

  if (loading) {
    return (
      <Spinner/>
    )
  }

  return (
    <Box sx={{marginY: "2em", height: "80vh", alignContent: contestants ? "start" : "center"}}>
      {contestants ? <ContestantsTable contestants={contestants}/> : <ErrorMessage message={error}/>}
    </Box>
  )
}