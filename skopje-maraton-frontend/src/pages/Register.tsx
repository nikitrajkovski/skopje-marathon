import {Alert, Box, Button, FormGroup, TextField, Typography} from "@mui/material";
import {type FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";
import {Spinner} from "../components/ui/Spinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export const Register = () => {
  const [fullName, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (registeredUser) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [registeredUser, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ fullName, email, password })
      });

      if (!response.ok) {
        throw new Error("Грешка при регистрација");
      }

      const registeredUser = await response.json();
      setRegisteredUser(registeredUser);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Непозната грешка");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
        <ErrorMessage message={error}/>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: "flex",
      height: "70vh",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginY: "2em",
      gap: 4,
      justifyContent: "center"
    }}>
      <Typography variant="h4">Регистрација на корисник</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{width: "60%", alignItems: "center"}}>
        <FormGroup>
          <TextField
            margin="normal"
            label="Вашето име и презиме"
            type="text"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            label="Електронска пошта"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            label="Лозинка"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}
            type="submit"
            disabled={error !== null}
          >
            Регистрирај се
          </Button>
        </FormGroup>
      </Box>
      <Typography>
        Доколку веќе имате сметка <Link to="/login">најавете се</Link>
      </Typography>
      {registeredUser && <Alert severity="success">Успешно се регистриравте на системот.</Alert>}
    </Box>
  );
};
