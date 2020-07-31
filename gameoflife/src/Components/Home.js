import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="main-container">
      <header className="main-head">
        <h1>Conway's Game of Life</h1>
        <p>
          By:{" "}
          <a
            href="https://github.com/svyatokshin"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            className="info-link"
          >
            Svyatoslav Okshin
          </a>
        </p>
      </header>

      <section className="about-section">
        <h2>About</h2>
        <p>
          The Game of Life is a{" "}
          <a
            className="about-links"
            href="https://en.wikipedia.org/wiki/Cellular_automaton"
            target="_blank"
          >
            cellular automation
          </a>{" "}
          created by{" "}
          <a
            className="about-links"
            href="https://en.wikipedia.org/wiki/John_Horton_Conway"
            target="_blank"
          >
            John Horton Conway
          </a>{" "}
          in 1970. Although it is called a game, it actually has zero players.
          The player only participates in setting the initial state, and the
          evolution of the patterns begins moving forward. The general setup is
          a grid with cells showing as 'alive' or 'dead'.
        </p>
        <Button
          variant="contained"
          color="primary"
          target="_blank"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          Wiki Link
        </Button>
      </section>
      <section className="rules-section">
        <h2>Rules of the Game</h2>
        <ol>
          <li>
            Any live cell with fewer than 2 live neighbors dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with 2 or 3 live neighbors lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than 3 live neighbors dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly 3 live neighbors becomes a live cell, as
            if by reproduction.
          </li>
        </ol>
        <Button variant="contained" color="secondary">
          <Link className="gamebtn" to="/game">
            Play Game
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
