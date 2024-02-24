import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./styles/cards.css";
import spades from "./assets/spades.svg";
import hearts from "./assets/hearts.svg";
import clovers from "./assets/clovers.svg";
import diamonds from "./assets/diamonds.svg";
import spadesIcon from "./assets/spadesIcon.svg";
import heartsIcon from "./assets/heartsIcon.svg";
import cloversIcon from "./assets/cloversIcon.svg";
import diamondsIcon from "./assets/diamondsIcon.svg";

function Cards() {
  const URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

  const renderOnce1 = useRef(true);
  const renderOnce2 = useRef(true);
  const [deck_id, setDeck_id] = useState("");
  const [Cards, setCards] = useState("");
  const [values, setValues] = useState();
  const [suit, setSuit] = useState();
  const [newCard, setNewCard] = useState(false);
  // const [seed, setSeed] = useState([spades, hearts, clovers, diamonds])
  const seedsImage = [spades, hearts, clovers, diamonds];
  const seedsIcon = [spadesIcon, heartsIcon, cloversIcon, diamondsIcon];
  const [cardsList, setCardsList] = useState([]);
  // useEffect(() => {
  //   if (renderOnce.current) {
  //     const fetchData = async () => {
  //       const deck = await fetch(URL);
  //       deck.json().then((json) => {
  //         console.log(json);
  //         setDeck_id((d) => (d = json.deck_id));
  //       });
  //       const oneCard = await fetch(
  //         `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
  //       );
  //       oneCard.json().then((json) => {
  //         setCards((c) => (c = json.cards[0].images.svg));
  //       });
  //     };
  //     fetchData();
  //     renderOnce.current = false;
  //   }
  // }, []);

  useEffect(() => {
    if (renderOnce1.current) {
      const fetchData = async () => {
        try {
          const deck = await axios.get(URL).then((res) => {
            setDeck_id((d) => (d = res.data.deck_id));
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      renderOnce1.current = false;
      console.log(deck_id);
    }
  }, []);

  useEffect(() => {
    if (deck_id) {
      if (renderOnce2.current) {
        const fetchData = async () => {
          try {
            const card = await axios
              .get(
                `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=4`
              )
              // .then((res) => {
              //   setCards((c) => (c = res.data.cards[0].image));
              //   console.log(res.data.cards[0].image)
              // });
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

  useEffect(() => {
    console.log("rendered");
  });

  function callApi() {
    setNewCard((nc) => !nc);
  }

  const displayCards = cardsList.map((card, index) => (
    <div key={index} className={`card${index}`}>
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

  // function check() {
  //   console.log(cardsList);
  //   cardsList.map((card, index) => {
  //     console.log(card.value);
  //   });
  // }

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
    } else if (suit === "HEARTS") {
      return 1;
    } else if (suit === "CLUBS") {
      return 2;
    } else {
      return 3;
    }
  }

  return (
    <>
      {/* <h1>{deck_id}</h1> */}
      <div className="main-div">
        <div className="cards">
          <div className="invisible-card"></div>
          {displayCards}
        </div>
      </div>
      {/* <button onClick={callApi}>Change Card</button>
      <button onClick={check}>Check</button> */}
    </>
  );
}

export default Cards;
