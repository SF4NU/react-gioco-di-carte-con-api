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

  const renderOnce = useRef(true);
  const [deck_id, setDeck_id] = useState("");
  const [Cards, setCards] = useState("");
  const [values, setValues] = useState();
  const [suit, setSuit] = useState();
  const [newCard, setNewCard] = useState(false);
  // const [seed, setSeed] = useState([spades, hearts, clovers, diamonds])
  const seedsImage = [spades, hearts, clovers, diamonds];
  const seedsIcon = [spadesIcon, heartsIcon, cloversIcon, diamondsIcon];
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
    if (renderOnce.current) {
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
      renderOnce.current = false;
      console.log(deck_id);
    }
  }, []);

  useEffect(() => {
    if (deck_id) {
      if (!renderOnce.current) {
        const fetchData = async () => {
          try {
            const card = await axios
              .get(
                `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
              )
              // .then((res) => {
              //   setCards((c) => (c = res.data.cards[0].image));
              //   console.log(res.data.cards[0].image)
              // });
              .then((res) => {
                let value = res.data.cards[0].value;
                const namedCards = ["QUEEN", "KING", "JACK", "ACE"];
                if (namedCards.includes(value)) {
                  const newValue = value.charAt(0);
                  console.log(newValue);
                  setValues((v) => (v = newValue));
                } else {
                  setValues((v) => (v = value));
                }
                let suit = res.data.cards[0].suit;
                if (suit === "SPADES") {
                  setSuit((s) => (s = 0));
                } else if (suit === "HEARTS") {
                  setSuit((s) => (s = 1));
                } else if (suit === "CLUBS") {
                  setSuit((s) => (s = 2));
                } else {
                  setSuit((s) => (s = 3));
                }
              });
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
        renderOnce.current = false;
      }
    }
  }, [deck_id, newCard]);

  function callApi() {
    setNewCard((nc) => !nc);
  }

  return (
    <>
      <div>
        <h1>{deck_id}</h1>
        {/* <img src={Cards} alt="card" /> */}
        {/* <p>{values}</p>
        <p>{suit}</p> */}
        <div className="cards">
          <div className="card">
            <div className="card-value-suit">
              <div className="number">{values}</div>
              <div>
                <img className="card-icon" src={seedsIcon[suit]} alt="spades icon" />
              </div>
            </div>
            <div>
              <img className="card-image" src={seedsImage[suit]} alt="spades card image" />
            </div>
            <div className="card-value-suit-inverted">
              <div className="number">{values}</div>
              <div>
                <img className="card-icon" src={seedsIcon[suit]} alt="spades icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={callApi}>Change Card</button>
    </>
  );
}

export default Cards;
