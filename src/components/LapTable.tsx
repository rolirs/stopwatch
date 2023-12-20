import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material/";
import timeFormatter from "../utils/utilities";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#030311",
    color: theme.palette.common.white,
    borderBottom: "1px solid #030311",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "white",
    borderBottom: "1px solid #030311",
  },
}));

const StyledButton = styled(Button)`
  font-family: "Orbitron";
  width: 90px;
`;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#090935",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#070723",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export type lapType = {
  lapNumber: number;
  time: string;
};

interface LapTableProps {
  timer: number;
}

const LapTable = ({ timer }: LapTableProps) => {
  const [laps, setLaps] = useState<lapType[]>([]);
  const [lapCounter, setLapCounter] = useState(0);
  const lapHandler = () => {
    const newLap: lapType = {
      lapNumber: lapCounter + 1,
      time: timeFormatter(timer),
    };

    setLaps((prevState) => [...prevState, newLap]);
    setLapCounter((prevState) => prevState + 1);
  };

  const clearHandler = () => {
    setLapCounter(0);
    setLaps([]);
  };
  return (
    <>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={1}
        sx={{ maxWidth: "330px", justifyContent: "space-between" }}
      >
        <Grid item>
          <StyledButton variant="contained" onClick={lapHandler}>
            Lap
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant="contained"
            color="error"
            onClick={clearHandler}
          >
            Clear
          </StyledButton>
        </Grid>
      </Grid>
      {lapCounter > 0 ? (
        <TableContainer
          data-testid="lap-table-id"
          component={Paper}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
            maxWidth: "330px",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Lap number</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laps.map((row) => (
                <StyledTableRow key={row.lapNumber}>
                  <StyledTableCell component="th" scope="row">
                    {row.lapNumber}. lap
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};

export default LapTable;
