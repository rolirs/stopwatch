import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../../App";
import user from "@testing-library/user-event";

describe("ControlButtons", () => {
  test("should start the timer when the start button is clicked and should not start the timer when start button is not clicked", async () => {
    user.setup();
    render(<App />);
    const counter = screen.getByText("00:00.000");
    const startButton = screen.getByText("Start");
    await waitFor(
      () => {
        expect(counter.textContent).toBe("00:00.000");
      },
      { timeout: 5000 }
    );
    await act(async () => {
      user.click(startButton);
    });
    await waitFor(
      () => {
        expect(
          parseInt(
            counter.textContent?.split(".")[1]
              ? counter.textContent?.split(".")[1]
              : "-1"
          )
        ).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });
  test("after the pause button pressed after the start button pressed the timer should be stopped", async () => {
    user.setup();
    render(<App />);
    const counter = screen.getByText("00:00.000");
    const startButton = screen.getByText("Start");
    const pauseButton = screen.getByText("Pause");
    await act(async () => {
      user.click(startButton);
    });
    await act(async () => {
      user.click(pauseButton);
    });
    const newCounter = counter.textContent;
    await waitFor(
      () => {
        expect(counter.textContent).toBe(newCounter);
      },
      { timeout: 5000 }
    );
  });
  test("after the pause button pressed after the start button pressed the timer should be stopped", async () => {
    user.setup();
    render(<App />);
    const counter = screen.getByText("00:00.000");
    const startButton = screen.getByText("Start");
    const resetButton = screen.getByText("Reset");
    await act(async () => {
      user.click(startButton);
    });
    await act(async () => {
      user.click(resetButton);
    });
    await waitFor(
      () => {
        const newCounter = screen.getByTestId("timer");
        expect(newCounter.textContent).toBe("00:00.000");
      },
      { timeout: 10000 }
    );
  });
  test("widget test to test the buttons that are not tested yet to verify the UI responds correctly", async () => {
    user.setup();
    render(<App />);
    const lapButton = screen.getByText("Lap");
    const clearButton = screen.getByText("Clear");
    const lapTable = screen.queryByTestId("lap-table-id");
    expect(lapTable).toBeNull();
    await act(async () => {
      user.click(lapButton);
    });
    await waitFor(
      () => {
        const renderedLapTable = screen.queryByTestId("lap-table-id");
        return renderedLapTable !== null;
      },
      { timeout: 5000 }
    );
    await act(async () => {
      user.click(clearButton);
    });
    await waitFor(
      () => {
        const unrenderedLapTable = screen.queryByTestId("lap-table-id");
        return unrenderedLapTable === null;
      },
      { timeout: 5000 }
    );
  });
  test("test case to handle edge cases", async () => {
    user.setup();
    render(<App />);
    const counter = screen.getByText("00:00.000");
    const startButton = screen.getByText("Start");
    await waitFor(
      () => {
        expect(counter.textContent).toBe("00:00.000");
      },
      { timeout: 5000 }
    );
    await act(async () => {
      user.click(startButton);
    });
    await act(async () => {
      user.click(startButton);
    });
    await act(async () => {
      user.click(startButton);
    });
    await waitFor(
      () => {
        expect(
          parseInt(
            counter.textContent?.split(".")[1]
              ? counter.textContent?.split(".")[1]
              : "-1"
          )
        ).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });
});
