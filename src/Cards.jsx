import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';

function Cards() {
  const URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

  const renderOnce = useRef(true);
  const [deck_id, setDeck_id] = useState("");
  const [Cards, setCards] = useState("");

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
          const deck = await axios.get(URL)
          .then(res => {
            setDeck_id(d => d = res.data.deck_id)
          });
          const card = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
          .then(res => {
            console.log(res.cards);
            setCards(c => c = res.data.cards[0].image)
          }
          )
        }
        catch (error) {
          console.error(error);
        }
      }
      fetchData();
      renderOnce.current = false;
      console.log(deck_id);
    }
  }, [])

  return (
    <>
      <div>
        <h1>{deck_id}</h1>
        <img src={Cards} alt="card" />
      </div>
    </>
  );
}

export default Cards;
