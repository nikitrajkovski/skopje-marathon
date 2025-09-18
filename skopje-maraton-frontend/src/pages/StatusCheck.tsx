import {Box, Button, TextField, Typography} from "@mui/material";
import {type ChangeEvent, type FormEvent, useState} from "react";
import * as EmailValidator from 'email-validator';
import type {Contestants} from "../types/Contestants.ts";
import {Link} from "react-router";

export const StatusCheck = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [contestant, setContestant] = useState<Contestants | null>(null);
  const [error, setError] = useState<string | null>(null);

  const registeredWithStartingNum = <Typography variant="h5" fontWeight="bold" sx={{textAlign: "center"}}>Успешна
    пријава. Вашиот стартен број е {contestant?.startingNum}</Typography>

  const registeredWithoutStartingNum = <Typography variant="h5" fontWeight="bold" sx={{textAlign: "center"}}>Вие сте
    регистрирани но сеуште немате стартен број. За да го добиете потребно е да направите уплата за учество. Тоа може да го сторите на следниот <Link to={`/payment/${contestant?.registrationNum}`}>линк</Link></Typography>

  const notRegisteredElement = <Typography variant="h5" fontWeight="bold" sx={{textAlign: "center"}}>{error}</Typography>

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContestant(null);
    try {
      const isEmail = EmailValidator.validate(inputValue);
      let url;
      if (isEmail) {
        url = `http://localhost:8080/api/contestants/getByEmail?email=${inputValue}`
      } else {
        url = `http://localhost:8080/api/contestants/getByNumber?registrationNumber=${inputValue}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Невалидна електронска пошта или невалиден регистарски број.")
      }

      const data = await response.json();
      setContestant(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Непозната грешка");
      }
      console.error(error);
    }
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
      <Box sx={{textAlign: "center"}}>
        <Typography sx={{fontSize: "1.2em"}}>Тука можете да го проверите статусот на вашата пријава</Typography>
        <Typography sx={{fontSize: "1.2em"}}>Внесете го вашиот регистрациски број или вашата електронска
          пошта</Typography>
      </Box>
      <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
        <TextField sx={{width: "70%"}} name="input"
                   placeholder="Внесете ја вашата електронска пошта или регистрациски број"
                   value={inputValue} onChange={handleChange} required/>
        <Button variant="contained"
                sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none", width: "15%"}}
                type="submit" onSubmit={handleSubmit}>Пријави се</Button>
      </Box>
      {contestant ? contestant!.startingNum ? registeredWithStartingNum : registeredWithoutStartingNum
        : notRegisteredElement
      }
    </Box>

  )
}