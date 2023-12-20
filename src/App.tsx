import { useState } from "react";
import Counter from "./components/Counter";
import LapTable from "./components/LapTable";
import { Box } from "@mui/material";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

function App() {
  const [timer, setTimer] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ fontSize: "30px", width: "330px", margin: "20px" }}>
        STOPWATCH APP
      </Box>
      <Clock
        value={
          new Date(new Date(timer).setHours(Math.floor(timer / 1000 / 60 / 60)))
        }
        size={330}
        className="clock"
        renderNumbers={true}
        useMillisecondPrecision={true}
      />
      <Counter timer={timer} setTimer={setTimer}></Counter>
      <LapTable timer={timer} />
    </Box>
  );
}

export default App;
