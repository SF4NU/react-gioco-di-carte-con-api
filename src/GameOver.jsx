import React, { Component } from "react";
import "./styles/gameOver.css";

function GameOver({ finalScore, setStarted, setCheckHowManyCards }) {
  function backToMenu() {
    setStarted(false);
    setCheckHowManyCards(1);
  }

  function playAgain() {
    setCheckHowManyCards(1);
  }

  return (
    <>
      <div className="game-over-section">
        <div className="game-over">
          <div>
            <p>Game Over!</p>
          </div>
          <div className="score-div">
            <p>
              Punteggio finale: <br />
            </p>
          </div>
          <div>
            <h2>
              <b>{finalScore}</b>
            </h2>
          </div>
        </div>
        <div className="game-over-choices">
          <div>
            <button className="go-back-to-menu-button" onClick={backToMenu}>
              Torna al menu
            </button>
          </div>
          <div>
            <button className="play-again-button" onClick={playAgain}>
              Gioca ancora!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameOver;
