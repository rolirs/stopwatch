const timeFormatter = (timer: number) => {
  const milliseconds = timer % 1000;
  const seconds = Math.floor(timer / 1000) % 60;
  const minutes = Math.floor(timer / 1000 / 60) % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

export default timeFormatter;
