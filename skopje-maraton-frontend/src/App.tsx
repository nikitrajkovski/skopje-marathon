import './App.css'
import {RouterProvider} from "react-router/dom";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import {Layout} from "./components/layout/Layout.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {AllParticipants} from "./pages/AllParticipants.tsx";
import {AddParticipant} from "./pages/AddParticipant.tsx";
import {StatusCheck} from "./pages/StatusCheck.tsx";
import {Payment} from "./pages/Payment.tsx";
import {RunWithUs} from "./pages/RunWithUs.tsx";
import {Login} from "./pages/Login.tsx";
import {AuthenticationProvider} from "./context/AuthenticationContext.tsx";
import {Register} from "./pages/Register.tsx";

export const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="allparticipants" element={<AllParticipants/>}/>
      <Route path="addparticipant" element={<AddParticipant/>}/>
      <Route path="checkstatus" element={<StatusCheck/>}/>
      <Route path="payment/:registrationNum" element={<Payment/>}/>
      <Route path="runwithus" element={<RunWithUs/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
    </Route>
  ))

  return (
    <>
      <AuthenticationProvider>
        <RouterProvider router={router}/>
      </AuthenticationProvider>
    </>
  )
}

export default App
