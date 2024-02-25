import React, { useState, useRef, useEffect, createContext } from "react";
import axios from "axios";
import Cards from "./Cards";
import PlayGame from "./PlayGame";

export const DeckId = createContext();

function FetchCards() {
  const renderOnce1 = useRef(true);
  const [deckId, setDeckId] = useState("");
  const URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`; 

  useEffect(() => {
    if (renderOnce1.current) {
      const fetchData = async () => {
        try {
          const deck = await axios.get(URL).then((res) => {
            setDeckId((d) => (d = res.data.deck_id));
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      renderOnce1.current = false;
    }
  }, []);

  return (
    <>
      <DeckId.Provider value={deckId}>
        <PlayGame value1={value1} setValue1={setValue1}></PlayGame>
        <Cards value1={value1} value2={value2}></Cards>
      </DeckId.Provider>
    </>
  );
}

export default FetchCards;
