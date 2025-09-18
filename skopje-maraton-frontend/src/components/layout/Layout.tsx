import {Outlet, ScrollRestoration} from "react-router";
import {Navbar} from "./Navbar.tsx";
import {Container} from "@mui/material";

export const Layout = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <ScrollRestoration/>
        <Container maxWidth="md">
          <Outlet/>
        </Container>
      </main>
    </div>
  )
}