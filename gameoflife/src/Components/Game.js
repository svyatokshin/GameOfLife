import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { Button } from "@material-ui/core";
import "../index.css";

import { Link } from "react-router-dom";

const numRows = 30;
const numCols = 30;

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

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

export default function Game() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
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
    // simulate
    setTimeout(runSimulation, 250);
  }, []);

  return (
    <>
      <div class="game-div">
        <div
          className="grid-div"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
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
            color="primary"
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

          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
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
              setGrid(generateEmptyGrid());
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}

// const generateEmptyGrid = (numCols, numRows)
