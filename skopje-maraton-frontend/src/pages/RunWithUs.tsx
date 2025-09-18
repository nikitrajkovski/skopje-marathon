import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import type {Contestants} from "../types/Contestants.ts";
import {Spinner} from "../components/ui/Spinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {ContestantsTable} from "../components/ui/ContestantsTable.tsx";
import {Filter} from "../components/ui/Filter.tsx";

export const RunWithUs = () => {
  const [contestants, setContestants] = useState<Contestants[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  useEffect(() => {
    const fetchContestants = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/contestants/havepayed");
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

  if (error) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
        <ErrorMessage message={error}/>
      </Box>
    )
  }

  const filteredContestants = contestants?.filter(c => {
    const filteredNames = nameFilter === "" || c.firstName.toLowerCase() === (nameFilter.toLowerCase());
    const filteredCategory = categoryFilter === "" || c.category.toLowerCase() === (categoryFilter.toLowerCase());
    return filteredNames && filteredCategory;
  })

  return (
    <Box sx={{display: "flex", flexDirection: "column", marginY: "2em", height: "80vh", alignContent: contestants ? "start" : "center", gap: 4}}>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
        <Filter nameOfProp={"име"} value={nameFilter} onChange={setNameFilter}/>
        <Filter nameOfProp={"категорија"} value={categoryFilter} onChange={setCategoryFilter}/>
      </Box>
      {contestants ? <ContestantsTable contestants={filteredContestants}/> : <ErrorMessage message={error}/>}
    </Box>
  )
}