import React, { useState } from "react";
import "./styles/startGame.css";

function StartGame({ setStarted, setRules }) {
  function startGame() {
    setStarted(true);
  }

  function seeRules() {
    setRules(true);
  }
  return (
    <>
      <div className="button-div">
        <button
          className="start-button button"
          onClick={() => {
            startGame();
          }}>
          Start
        </button>
        <button
          className="rules-button button"
          onClick={() => {
            seeRules();
          }}>
          Regole
        </button>
        <a href="https://github.com/SF4NU/react-gioco-di-carte-con-api">
          <button className="github-button button">GitHub</button>
        </a>
      </div>
    </>
  );
}

export default StartGame;
