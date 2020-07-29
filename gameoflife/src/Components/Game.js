import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { Button } from "@material-ui/core";
import "../index.css";

import { Link } from "react-router-dom";
import Inputs from "./Inputs.js";

// const numRows = 30;
// const numCols = 30;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = (numCols, numRows) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

export default function Game() {
  const [size, setSize] = useState([15, 15]);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(size[0], size[1]);
  });

  const [running, setRunning] = useState(false);
  let [generations, setGenerations] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < size[0]; i++) {
          for (let k = 0; k < size[1]; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < size[0] && newK >= 0 && newK < size[1]) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setGenerations(++generations);
    // simulate
    setTimeout(runSimulation, 100);
  }, [size, generations]);

  const steps = () => {
    setGenerations(++generations);
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < size[0]; i++) {
          for (let k = 0; k < size[1]; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < size[0] && newK >= 0 && newK < size[1]) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
  };

  return (
    <>
      <div class="game-div">
        <h1>Welcome to Conway's Game of Life!</h1>
        <h4>Coded by Svyat Okshin</h4>
        <Inputs
          size={size}
          setSize={setSize}
          running={running}
          generateEmptyGrid={generateEmptyGrid}
          setGrid={setGrid}
          generations={generations}
        />
        <div
          className="grid-div"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size[1]}, 20px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                class="actual-grid"
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "black" : undefined,
                  border: "solid 1px black",
                  margin: "0 auto",
                }}
              />
            ))
          )}
        </div>
        <div class="button-group">
          <Button
            variant="contained"
            color={running ? "secondary" : "primary"}
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "stop" : "start"}
          </Button>
          <Button variant="contained" color="primary" onClick={steps}>
            One Gen Step
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < size[0]; i++) {
                rows.push(
                  Array.from(Array(size[1]), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }
              setGrid(rows);
            }}
          >
            Randomize
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setGrid(generateEmptyGrid(size[0], size[1]));
              setGenerations(0);
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}
