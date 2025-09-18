import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router";
import type {Contestants} from "../../types/Contestants.ts";

type ContestantsTableProps = {
  contestants: Contestants[] | undefined;
}
export const ContestantsTable = ({contestants}: ContestantsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Име</strong></TableCell>
            <TableCell><strong>Презиме</strong></TableCell>
            <TableCell><strong>Електронска пошта</strong></TableCell>
            <TableCell><strong>Возраст</strong></TableCell>
            <TableCell><strong>Категорија</strong></TableCell>
            <TableCell><strong>Регистрациски број</strong></TableCell>
            <TableCell sx={{textAlign: "center"}}><strong>Стартен број</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestants!.map((c, index) => (
            <TableRow key={index}>
              <TableCell>{c.firstName}</TableCell>
              <TableCell>{c.lastName}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.age}</TableCell>
              <TableCell>{c.category}</TableCell>
              <TableCell>{c.registrationNum}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{c.startingNum ? c.startingNum :
                <Link to={`/payment/${c?.registrationNum}`}>
                  <Button variant="contained"
                          sx={{backgroundColor: "#5e239d", color: "#6decaf", textTransform: "none"}}>Плати</Button>
                </Link>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}