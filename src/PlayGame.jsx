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

function PlayGame() {
  const renderOnce = useRef(true);
  const deck_id = useContext(DeckId);
  const URL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=4`;
  const seedsIcon = [spadesIcon, heartsIcon, cloversIcon, diamondsIcon];
  const seedsImage = [spades, hearts, clovers, diamonds];
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    if (deck_id) {
      if (renderOnce.current) {
        const fetchCards = async () => {
          try {
            const getCards = await axios.get(URL).then((res) => {
              res.data.cards.map((card) => {
                setCardsList((c) => [...c, card]);
              });
            });
          } catch (error) {
            console.error(error);
          }
        };
        fetchCards();
        renderOnce.current = false;
      }
    }
  }, [deck_id]);

  const displayPlayCards = cardsList.map((card, index) => (
    <>
      <div key={index} className={`playing-card-${index}`}>
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
    </>
  ))

  return (
    <>
      <section>
        {displayPlayCards}
      </section>
    </>
  );
}

export default PlayGame;
