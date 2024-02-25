import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { DeckId } from "./FetchCards";
import "./styles/cards.css";
import spades from "./assets/spades.svg";
import hearts from "./assets/hearts.svg";
import clovers from "./assets/clovers.svg";
import diamonds from "./assets/diamonds.svg";
import spadesIcon from "./assets/spadesIcon.svg";
import heartsIcon from "./assets/heartsIcon.svg";
import cloversIcon from "./assets/cloversIcon.svg";
import diamondsIcon from "./assets/diamondsIcon.svg";

function Cards(deckId) {
  
  const deck_id = useContext(DeckId);
  const renderOnce2 = useRef(true);
  const renderOnce3 = useRef(true);
  const [suit, setSuit] = useState();
  const [newCard, setNewCard] = useState(false);
  const seedsImage = [spades, hearts, clovers, diamonds];
  const seedsIcon = [spadesIcon, heartsIcon, cloversIcon, diamondsIcon];
  const [cardsList, setCardsList] = useState([]);
  const [checkIfClicked, setCheckIfClicked] = useState(true);
  const [checkIfReadyToAnimate, setCheckIfReadyToAnimate] = useState(false);

  

  useEffect(() => {
    if (deck_id) {
      if (renderOnce2.current) {
        const fetchData = async () => {
          try {
            const card = await axios
              .get(
                `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=4`
              )

              .then((res) => {
                res.data.cards.map((card) => {
                  setCardsList((c) => [...c, card]);
                });
              });
          } catch (error) {
            console.error(error);
          } finally {
          }
        };
        fetchData();
        renderOnce2.current = false;
      }
    }
  }, [deck_id, newCard]);

  const time = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("timeout"));
      }, ms);
    });
  };

  useEffect(() => {
    if (renderOnce3.current) {
      async function changeCardClasses() {
        try {
          await time(2500);
          setCheckIfReadyToAnimate((c) => (c = true));
          let i = 0;
          while (i <= 3) {
            const changedClass = document.querySelector(`.card${i}`);
            changedClass.classList.remove(`card${i}JS`);
            changedClass.classList.add("skip-card-animation");
            i++;
          }
          await time(600);
          removeFirstAnimation();
        } catch (error) {
          console.log(error);
        }
      }

      changeCardClasses();
    }
    renderOnce3.current = false;
  }, []);

  function removeFirstAnimation() {
    let i = 0;
    while (i <= 3) {
      const changedClass = document.querySelector(`.card${i}`);
      changedClass.classList.remove("skip-card-animation");
      i++;
    }
  }

  function seeCards() {
    if (checkIfReadyToAnimate) {
      if (checkIfClicked) {
        cardsList.map((card, index) => {
          document
            .querySelector(`.get-card-${index}`)
            .classList.remove(`card${index}-animation`);
          document
            .querySelector(`.get-card-${index}`)
            .classList.add(`see-cards${index}`);
        });
        setCheckIfClicked((c) => (c = false));
      } else {
        cardsList.map((card, index) => {
          document
            .querySelector(`.get-card-${index}`)
            .classList.remove(`see-cards${index}`);
          document
            .querySelector(`.get-card-${index}`)
            .classList.add(`card${index}-animation`);
        });
        setCheckIfClicked((c) => (c = true));
      }
    }
  }

  function callApi() {
    setNewCard((nc) => !nc);
  }

  const displayCards = cardsList.map((card, index) => (
    <div
      key={index}
      className={` get-card-${index} card${index}JS card${index}`}
      onClick={() => {
        seeCards();
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
  ));

  function handleCardsIcons(card) {
    const namedCards = ["QUEEN", "KING", "JACK", "ACE"];
    if (namedCards.includes(card)) {
      const newValue = card.charAt(0);
      return newValue;
    } else {
      return card;
    }
  }
  function handleCardsImages(card) {
    if (card === "SPADES") {
      return 0;
    } else if (card === "HEARTS") {
      return 1;
    } else if (card === "CLUBS") {
      return 2;
    } else {
      return 3;
    }
  }

  return (
    <>
      <div className="main-div">
        <div className="cards">
          <div className="invisible-card"></div>
          {displayCards}
        </div>
      </div>
    </>
  );
}

export default Cards;
