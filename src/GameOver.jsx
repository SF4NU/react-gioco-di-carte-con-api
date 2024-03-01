import React, { useState } from "react";
import "./styles/gameOver.css";
import { time } from "./utils/timeout.js";

function GameOver({ finalScore, setStarted, setCheckHowManyCards }) {
  const [checkAnimation, setCheckAnimation] = useState(true);

  function backToMenu() {
    setStarted(false);
    setCheckHowManyCards(1);
  }

  function playAgain() {
    setCheckHowManyCards(1);
  }

  function exitAnimations() {
    const getAnimations1 = document.getElementById("exit-animation1");
    const getAnimations2 = document.getElementById("exit-animation2");
    const getAnimations3 = document.getElementById("exit-animation3");
    const getAnimations4 = document.getElementById("go-back-to-menu");
    const getAnimations5 = document.getElementById("play-again");
    if (checkAnimation) {
      getAnimations1.classList.remove("enter-animation1");
      getAnimations2.classList.remove("enter-animation2");
      getAnimations3.classList.remove("enter-animation3");
      getAnimations4.classList.remove("enter-animation4");
      getAnimations5.classList.remove("enter-animation5");
      getAnimations1.classList.add("exit-animation-1");
      getAnimations2.classList.add("exit-animation-2");
      getAnimations3.classList.add("exit-animation-3");
      getAnimations4.classList.add("exit-animation-4");
      getAnimations5.classList.add("exit-animation-5");
      console.log("exit animations added");
      setCheckAnimation(false);
    } else {
      getAnimations1.classList.remove("exit-animation-1");
      getAnimations2.classList.remove("exit-animation-2");
      getAnimations3.classList.remove("exit-animation-3");
      getAnimations4.classList.remove("exit-animation-4");
      getAnimations5.classList.remove("exit-animation-5");
      getAnimations1.classList.add("enter-animation1");
      getAnimations2.classList.add("enter-animation2");
      getAnimations3.classList.add("enter-animation3");
      getAnimations4.classList.add("enter-animation4");
      getAnimations5.classList.add("enter-animation5");
      console.log("exit animations removed");

      setCheckAnimation(true);
    }
  }

  async function playAnimationsFirst(action) {
    await exitAnimations();
    await time(800);
    if (action === "back") {
      backToMenu();
    } else {
      playAgain();
    }
  }

  return (
    <>
      <div className="game-over-section">
        <div className="game-over">
          <div id="exit-animation1" className="enter-animation1">
            <p>Game Over!</p>
          </div>
          <div id="exit-animation2" className="enter-animation2">
            <p>
              Punteggio finale: <br />
            </p>
          </div>
          <div id="exit-animation3" className="enter-animation3">
            <h2>
              <b>{finalScore}</b>
            </h2>
          </div>
        </div>
        <div className="game-over-choices">
          <div>
            <button
              id="go-back-to-menu"
              className="go-back-to-menu-button enter-animation4"
              onClick={() => {
                playAnimationsFirst("back");
              }}>
              Torna al menu
            </button>
          </div>
          <div>
            <button
              id="play-again"
              className="play-again-button enter-animation5"
              onClick={() => {
                playAnimationsFirst("again");
              }}>
              Gioca ancora!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameOver;
