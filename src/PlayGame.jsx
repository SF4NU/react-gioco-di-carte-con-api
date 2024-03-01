import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { DeckId } from "./FetchCards";
import "./styles/playGame.css";
import "./styles/cards.css";
import { handleCardsIcons } from "./utils/handleCardsIcons";
import { handleCardsImages } from "./utils/handleCardsImages";
import spades from "./assets/spades.svg";
import hearts from "./assets/hearts.svg";
import clovers from "./assets/clovers.svg";
import diamonds from "./assets/diamonds.svg";
import spadesIcon from "./assets/spadesIcon.svg";
import heartsIcon from "./assets/heartsIcon.svg";
import cloversIcon from "./assets/cloversIcon.svg";
import diamondsIcon from "./assets/diamondsIcon.svg";
import { time } from "./utils/timeout.js";

function PlayGame({ handCards, setCheckHowManyCards, setFinalScore }) {
  const renderOnce = useRef(true);
  let renderOnceValue = renderOnce.current;
  const renderOnce1 = useRef(true);
  let renderOnceValue1 = renderOnce1.current;
  const addOnce = useRef(true);
  let addOnceValue = addOnce.current;
  const deck_id = useContext(DeckId);
  const seedsIcon = [spadesIcon, heartsIcon, cloversIcon, diamondsIcon];
  const seedsImage = [spades, hearts, clovers, diamonds];
  const [cardsData, setCardsData] = useState([]);
  const [score, setScore] = useState("Preparati!");
  // const isFlipped = useRef(false);
  const [isFlipped, setIsFlipped] = useState(
    Array(cardsData.length).fill(false)
  );
  const [waitBeforeStarting, setWaitBeforeStarting] = useState(true);
  const [checkTime, setCheckTime] = useState(true);
  const [remainingCards, setRemainingCards] = useState(196);

  const fetchCards = async () => {
    try {
      await waitBeforeStartingGame();
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/draw/?count=${4}`
      );
      const getCardsData = response.data.cards;
      if (addOnceValue) {
        setCardsData(getCardsData);
      } else {
        const newData = [...getCardsData];
        setCardsData(newData);
        setIsFlipped(Array(cardsData.length).fill(false));
        setRemainingCards((c) => c - 4);
        setFinalScore(score);
        setCheckHowManyCards(remainingCards);
      }
      addOnce.current = false;
      return getCardsData;
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    if (deck_id) {
      if (renderOnceValue) {
        fetchCards();
      }
      renderOnce.current = false;
    }
  }, [deck_id]);

  useEffect(() => {
    const timer = async () => {
      if (renderOnceValue1) {
        if (checkTime) {
          setCheckTime(false);
          await time(4500);
        }
        setInterval(() => {
          renderOnce.current = true;
        }, 3000);
      }
    };
    timer();

    renderOnce1.current = false;
  }, [renderOnceValue1]);

  const waitBeforeStartingGame = async () => {
    try {
      if (waitBeforeStarting) {
        setWaitBeforeStarting(false);
        console.log("started");
        await time(1000);
        setScore("3");
        await time(1000);
        setScore("2");
        await time(1000);
        setScore("1");
        await time(1000);
        setScore(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function chooseCard(card, i) {
    const blackColors = ["CLUBS", "SPADES"];
    const redColors = ["HEARTS", "DIAMONDS"];
    let count = 0;
    for (let index = 0; index < handCards.length; index++) {
      const handCard = handCards[index];
      if (card.value === handCard.value && card.suit === handCard.suit) {
        {
          count++;
        }
      }
    }
    if (count > 0 && !isFlipped[i]) {
      setScore((c) => c + 1);
      count = 0;
      flipCard(i);
    } else if (count === 0 && !isFlipped[i]) {
      flipCard(i);
      if (score > 0) {
        setScore((c) => c - 1);
      }
    }
  }
  function flipCard(index) {
    if (!isFlipped[index]) {
      const newFlippedCards = [...isFlipped];
      newFlippedCards[index] = !newFlippedCards[index];
      setIsFlipped(newFlippedCards);
    }
  }

  return (
    <section>
      {cardsData.map((card, index) => (
        <div
          key={card.code}
          className={`main-card-container`}
          onClick={() => {
            chooseCard(card, index);
          }}>
          <div
            className={`card-wrapper-${index} ${
              isFlipped[index] ? "flipped" : ""
            }`}
            onClick={() => {
              flipCard(index);
            }}>
            <div className={`playing-card-${index}`}>
              <div className="card-value-suit">
                <div className="number">{handleCardsIcons(card.value)}</div>
                <div>
                  <img
                    className="card-icon"
                    src={seedsIcon[handleCardsImages(card.suit)]}
                    alt="spades icon"
                  />
                </div>
              </div>
              <div>
                <img
                  className="card-image"
                  src={seedsImage[handleCardsImages(card.suit)]}
                  alt="spades card image"
                />
              </div>
              <div className="card-value-suit-inverted">
                <div className="number">{handleCardsIcons(card.value)}</div>
                <div>
                  <img
                    className="card-icon"
                    src={seedsIcon[handleCardsImages(card.suit)]}
                    alt="spades icon"
                  />
                </div>
              </div>
            </div>

            <div className={`back-${card.code}`}></div>
          </div>
        </div>
      ))}
      <span className="countdown-number">{score}</span>
      <span className="remaining-cards">Carte rimaste: {remainingCards}</span>
    </section>
  );
}

export default PlayGame;
