import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./styles/cards.css";

function Cards() {
  const URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

  const renderOnce = useRef(true);
  const [deck_id, setDeck_id] = useState("");
  const [Cards, setCards] = useState("");
  const [values, setValues] = useState();
  const [suit, setSuit] = useState();
  const [newCard, setNewCard] = useState(false);
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
                  setValues(v => v = newValue);
                }
                else {
                  setValues(v => v = value);
                }
                setSuit(s => s = res.data.cards[0].suit)
              })
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
    setNewCard(nc => !nc)
  }

  return (
    <>
      <div>
        <h1>{deck_id}</h1>
        {/* <img src={Cards} alt="card" /> */}
        <p>{values}</p>
        <p>{suit}</p>
        <button onClick={callApi}>Change Card</button>
      </div>
    </>
  );
}

export default Cards;
