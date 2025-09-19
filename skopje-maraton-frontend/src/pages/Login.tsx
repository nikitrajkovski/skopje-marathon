import {Alert, Box, Button, FormGroup, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../context/AuthenticationContext.tsx";
import {Link, useNavigate} from "react-router";
import {Spinner} from "../components/ui/Spinner.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { setAuthenticated, setUser, setToken, token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
      });
      if (!response.ok) {
        throw new Error("Грешка при најава");
      }
      const data = await response.json();
      setToken(data.token);
      setAuthenticated(true);
      setUser(data.user);
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
      height: "70vh",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginY: "2em",
      gap: 4,
      justifyContent: "center"
    }}>
      <Typography variant="h4">Најава во системот</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{width: "60%", alignItems: "center"}}>
        <FormGroup>
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
          <Button variant="contained" sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}
                  type="submit" disabled={loading} onSubmit={handleSubmit}>Најава</Button>
        </FormGroup>
      </Box>
      <Typography>Доколку сеуште немате направено сметка <Link to="/register">регистрирајте се</Link></Typography>
      {token && <Alert severity="success">Успешно се најавивте на системот.</Alert>}
      {error && <Typography>{error}</Typography>}
    </Box>
  )
}