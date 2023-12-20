import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import timerFormatter from "../utils/utilities";

const StyledButton = styled(Button)`
  font-family: "Orbitron";
  width: 90px;
`;

interface ControlButtonsProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

const Counter = ({ timer, setTimer }: ControlButtonsProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [referenceTime, setReferenceTime] = useState(0);
  let interval: ReturnType<typeof setInterval>;

  //The timer is always compared to the actual date and it counts the elapsed time from the actual date minus reference date
  //The reason is to ensure that the timer works well even if the user clicks on another tab within the browser and spend some time on it
  useEffect(() => {
    if (isRunning) {
      interval = setTimeout(() => {
        const now = Date.now();
        const interval = now - referenceTime;
        setReferenceTime(now);
        setTimer((prevValue) => prevValue + interval);
      }, 1);
    } else {
      clearTimeout(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startHandler = () => {
    setReferenceTime(Date.now());
    setTimer(0);
    setIsRunning(true);
  };

  const pauseHandler = () => {
    if (timer > 0) {
      setIsRunning(!isRunning);
      setReferenceTime(Date.now());
    }
  };

  const resetHandler = () => {
    setTimer(0);
    setIsRunning(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "40px",
          fontFamily: "monospace",
          marginBottom: "20px",
        }}
        data-testid="timer"
      >
        {timerFormatter(timer)}
      </Box>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={1}
        sx={{
          maxWidth: "330px",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Grid item>
          <StyledButton
            variant="contained"
            color="success"
            onClick={startHandler}
          >
            Start
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton variant="contained" onClick={pauseHandler}>
            Pause
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant="contained"
            color="error"
            onClick={resetHandler}
          >
            Reset
          </StyledButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Counter;
