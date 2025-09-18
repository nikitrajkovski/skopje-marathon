import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link, useLocation} from "react-router";
import {useContext} from "react";
import {AuthenticationContext} from "../../context/AuthenticationContext.tsx";

export const Navbar = () => {
  const location = useLocation();
  const navItems = [
    {label: "Почетна", href: "/"},
    {label: "Сите Учесници", href: "/allparticipants"},
    {label: "Трчај со нас", href: "/runwithus"},
  ];
  const { token } = useContext(AuthenticationContext);


  return (
    <AppBar position="static" sx={{background: "#5e239d", color: "#f61067", height: "10vh", justifyContent: "center"}}>
      <Toolbar sx={{display: "flex"}}>
        <Box sx={{flex: 1, justifyContent: "flex-start"}}>
          <Link to={"/"} style={{textDecoration: "none", color: "#f4f4ed"}}>
            <Typography variant="h4" sx={{fontWeight: "bold"}}>Скопје Маратон ️️</Typography>
          </Link>
        </Box>
        <Box sx={{flex: 1, display: "flex", alignItems: "center", gap: 2, justifyContent: "center"}}>
          {navItems.map((item, index) => (
            <Link key={index} to={item.href}
                  style={{
                    textDecoration: "none",
                    color: "#6decaf",
                    borderBottom: location.pathname === item.href ? "2px solid #6decaf" : "none"
                  }}>
              <Typography variant="subtitle1">{item.label}</Typography>
            </Link>
          ))}
        </Box>
        <Box sx={{flex: 1, display: "flex", flexDirection: "row", gap: 2, justifyContent: "flex-end"}}>
          <Link to={"/checkstatus"}>
            <Button variant="outlined" sx={{border: "2px solid #6decaf", color: "#f4f4ed", textTransform: "none"}}>
              Провери статус
            </Button>
          </Link>
          <Link to={"/addparticipant"}>
            <Button variant="contained" sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}>
              Пријава на учесник
            </Button>
          </Link>
          {!token && <Link to={"/login"}>
            <Button variant="outlined" sx={{backgroundColor: "#f61067", color: "#f4f4ed", textTransform: "none"}}>
              Најава
            </Button>
          </Link>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}