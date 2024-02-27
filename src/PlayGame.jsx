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
import _, { add, random } from "lodash";

function PlayGame({ handCards }) {
  const renderOnce = useRef(true);
  let renderOnceValue = renderOnce.current;
  const renderOnce1 = useRef(true);
  let renderOnceValue1 = renderOnce1.current;
  const addOnce = useRef(true);
  let addOnceValue = addOnce.current;
  const deck_id = useContext(DeckId);
  const seedsIcon = [spadesIcon, heartsIcon, cloversIcon, diamondsIcon];
  const seedsImage = [spades, hearts, clovers, diamonds];
  const [randomCard, setRandomCard] = useState(4);
  const [cardsData, setCardsData] = useState([]);
  const [score, setScore] = useState(0);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${randomCard}`
      );
      const getCardsData = response.data.cards;
      if (addOnceValue) {
        setCardsData(getCardsData);
      } else {
        let newValuesNumber = getCardsData.length;
        const newData = [...cardsData];
        while (newValuesNumber > 0) {
          newData[newValuesNumber - 1] = getCardsData[newValuesNumber - 1];
          newValuesNumber--;
        }
        setCardsData(newData);
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
  }, [deck_id, randomCard]);

  useEffect(() => {
    if (renderOnceValue1) {
      setInterval(() => {
        const randomNumber = _.random(1, 4);
        setRandomCard((r) => (r = randomNumber));
        renderOnce.current = true;
      }, 3000);
    }
    renderOnce1.current = false;
  }, [renderOnceValue1]);

  function chooseCard(card) {
    let count = 0;
    for (let index = 0; index < handCards.length; index++) {
      const handCard = handCards[index];
      if (card.value === handCard.value) {
        count++;
      }
    }
    if (count > 0) {
      setScore((c) => c + 1);
      count = 0;
    } else {
      if (score > 0) {
        setScore((c) => c - 1);
      }
    }
  }

  return (
    <>
      <section>
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`playing-card-${index}`}
            onClick={() => {
              chooseCard(card);
            }}>
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
        ))}
        <span className="countdown-number">{score}</span>
      </section>
    </>
  );
}

export default PlayGame;
