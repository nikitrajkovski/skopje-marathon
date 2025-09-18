import {
  Alert,
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {type FormEvent, useEffect, useState} from "react";
import type {Contestants} from "../../types/Contestants.ts";
import * as EmailValidator from 'email-validator';


export const AddForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Contestants>({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    age: null,
    category: "",
    registrationNum: null,
    startingNum: null,
  });
  const [registrationNumber, setRegistrationNumber] = useState<string | null>(null);

  useEffect(() => {
    if (values.age! < 16) {
      setError("Вашата возраст не е поголема од 16")
    } else {
      setError(null);
    }
    if (values.age === null) {
      setError(null);
    }
  }, [values.age]);

  const handleChange = (event: any) => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // const isEmailInUse = await fetch(`http://localhost:8080/api/contestants/getByEmail?email=${values.email}`)
      // if (isEmailInUse.ok) {
      //   setError("Веќе постои корисник со внесената електронска пошта");
      //   return;
      // }
      const isEmailValid = EmailValidator.validate(values.email);
      if (!isEmailValid) {
        setError("Внесовте невалидна електронска пошта");
        return;
      }

      const response = await fetch("http://localhost:8080/api/contestants", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error("Грешка при пријава");
      }

      const registrationNumber = await response.text();
      setRegistrationNumber(registrationNumber);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Непозната грешка")
      }
      console.error(error);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{marginTop: 3, width: "50%"}} noValidate>
      <FormGroup sx={{gap: 2}}>
        <TextField label="Име" name="firstName"  value={values.firstName} onChange={handleChange} required/>
        <TextField label="Презиме" name="lastName" value={values.lastName} onChange={handleChange} required/>
        <TextField label="Електронска пошта" name="email" type="email" value={values.email} onChange={handleChange}
                   required/>
        <TextField label="Возраст" name="age" type="number" value={values.age} onChange={handleChange} required/>
        <FormControl required>
          <InputLabel>Категорија</InputLabel>
          <Select label="Категорија" name="category" value={values.category} onChange={handleChange}>
            <MenuItem value="FIVE_KM">Пет километри</MenuItem>
            <MenuItem value="TEN_KM">Десет километри</MenuItem>
            <MenuItem value="HALF_MARATHON">Полумаратон</MenuItem>
            <MenuItem value="MARATHON">Маратон</MenuItem>
          </Select>
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}
        {registrationNumber && <Alert severity="success">Успешно го регистриравте корисникот. Ова е вашиот регистрациски
          број: {registrationNumber}</Alert>}

        <Button variant="contained" sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}
                type="submit" disabled={registrationNumber !== null} onSubmit={handleSubmit}>Пријави се</Button>
      </FormGroup>
    </Box>
  )
}